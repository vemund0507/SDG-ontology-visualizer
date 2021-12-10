import { Router, Request, Response } from 'express';
import multer from 'multer';

import getGDCDataSeries from '../database/getGDCDataSeries';
import getGDCDataSeriesUpto from '../database/getGDCDataSeriesUpto';
import getGDCGoals from '../database/getGDCGoals';
import setGDCGoal from '../database/setGDCGoal';
import deleteGDCGoal from '../database/deleteGDCGoal';
import getCorrelatedKPIs from '../database/getCorrelatedKPIs';
import bulkDeleteGDCGoals from '../database/bulkDeleteGDCGoals';
import bulkInsertGDCGoals from '../database/bulkInsertGDCGoals';
import CheckMunicipalityByCode from '../database/CheckMunicipalityByCode';

import { Goal, Dataseries, GDCGoal, GDCOutput } from '../types/gdcTypes';
import { computeGDC } from '../gdc/gdc';
import { gdc2json } from '../utils/gdcUtils';
import { parseCSV, detectSeparator } from '../utils/csv';

import { u4sscKpiMap, u4sscKpiDataseries, TKTransform } from '../database/u4sscKpiMap';
import { ApiError } from '../types/errorTypes';

import onError from './middleware/onError';
import verifyDatabaseAccess from './middleware/verifyDatabaseAccess';
import verifyToken from './middleware/verifyToken';

const router = Router();

const getGoalDistance = async (req: Request, res: Response) => {
  try {
    const goalMunicipality =
      req.params.goalOverride !== undefined ? req.params.goalOverride : req.params.municipality;

    const overrideMode =
      req.params.overrideMode !== undefined ? req.params.overrideMode : 'absolute';

    const year = parseInt(req.params.year, 10);
    if (Number.isNaN(year)) throw new ApiError(400, 'Non-integer year');

    const dataseriesPromise = getGDCDataSeries(req.params.municipality, year);
    const goalPromise = getGDCGoals(goalMunicipality, req.params.municipality, overrideMode);
    const historicalPromise = getGDCDataSeriesUpto(req.params.municipality, year);

    // It should be more efficient to wait on all promises at the same time.
    const data = await Promise.all([dataseriesPromise, goalPromise, historicalPromise]);
    const dataseries: Dataseries[] = data[0];
    const goals: Goal[] = data[1];
    const historicalData: Dataseries[] = data[2];

    if (!dataseries || !goals || !historicalData)
      throw new ApiError(400, 'Missing goals, data, or historical data for municipality.');

    const gdcOutput: GDCOutput = computeGDC(dataseries, goals, historicalData);

    res.json(gdc2json(gdcOutput));
  } catch (e: any) {
    onError(e, req, res);
  }
};

const areGoalsAttained = async (req: Request, res: Response) => {
  try {
    const year = parseInt(req.params.year, 10);

    const dataseriesPromise = getGDCDataSeries(req.params.municipality, year);
    const goalPromise = getGDCGoals(req.params.municipality, req.params.municipality, 'absolute');
    const historicalPromise = getGDCDataSeriesUpto(req.params.municipality, year);

    // It should be more efficient to wait on all promises at the same time.
    const data = await Promise.all([dataseriesPromise, goalPromise, historicalPromise]);
    const dataseries: Dataseries[] = data[0];
    const goals: Goal[] = data[1];
    const historicalData: Dataseries[] = data[2];

    if (!dataseries || !goals || !historicalData) {
      throw new ApiError(400, 'Missing goals, data or historical data for municipality.');
    }

    const gdcOutput: GDCOutput = computeGDC(dataseries, goals, historicalData);

    const attainalMap = new Map<string, boolean>();
    gdcOutput.indicators.forEach((v) => {
      let val = v.willCompleteBeforeDeadline;
      // reduce dataseries to kpis
      const existing = attainalMap.get(v.kpi);
      if (existing !== undefined) {
        val = val && existing;
      }
      attainalMap.set(v.kpi, val);
    });
    res.json([...attainalMap]);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const setGoal = async (req: Request, res: Response) => {
  try {
    const isDummy = req.body.isDummy !== undefined && JSON.parse(req.body.isDummy);
    const dataseries =
      req.body.dataseries === undefined || req.body.dataseries === null
        ? 'main'
        : req.body.dataseries;

    const indicatorName = u4sscKpiMap.get(req.body.indicator);
    if (indicatorName === undefined) throw new ApiError(400, '!');

    // TODO: figure out how to do this properly, as a DELETE/INSERT query instead...
    await deleteGDCGoal(req.body.municipality, req.body.indicator, dataseries, isDummy);
    await setGDCGoal(
      req.body.municipality,
      req.body.indicator,
      indicatorName,
      dataseries,
      req.body.target,
      req.body.deadline,
      req.body.baseline,
      req.body.baselineYear,
      req.body.startRange,
      isDummy,
    );
    res.json({});
  } catch (e: any) {
    onError(e, req, res);
  }
};

const setBulkGoals = async (req: Request, res: Response) => {
  try {
    const isDummy = req.body.isDummy !== undefined && JSON.parse(req.body.isDummy);
    const { municipality } = req.body;

    const validMunicipality = await CheckMunicipalityByCode(municipality);
    if (validMunicipality === 0) throw new ApiError(400, 'Invalid municipality id');

    const goals: GDCGoal[] = [];

    req.body.goals.forEach((goal) => {
      const dataseries =
        goal.dataseries === undefined || goal.dataseries === null ? 'main' : goal.dataseries;

      const indicatorName = u4sscKpiMap.get(goal.indicator);
      if (indicatorName === undefined) throw new ApiError(400, '!');

      const newGoal: GDCGoal = {
        municipality,
        indicatorId: goal.indicator,
        indicatorName,
        dataseries,

        target: goal.target,
        deadline: goal.deadline,
        baseline: goal.baseline,
        baselineYear: goal.baselineYear,
        startRange: goal.startRange,
        isDummy,
      };

      goals.push(newGoal);
    });

    await bulkDeleteGDCGoals(goals);
    await bulkInsertGDCGoals(municipality, goals);

    res.json({});
  } catch (e: any) {
    onError(e, req, res);
  }
};

const getGoals = async (req: Request, res: Response) => {
  try {
    const goalsData = await getGDCGoals(
      req.params.municipality,
      req.params.municipality,
      'absolute',
    );
    const goals: Map<string, Goal> = new Map<string, Goal>();

    goalsData.forEach((goal) => {
      const isVariant = goal.dataseries !== undefined;
      const displayKPI = goal.kpi + (isVariant ? ` - ${goal.dataseries}` : '');
      goals.set(displayKPI, goal);
    });

    res.json({
      goals: [...goals],
    });
  } catch (e: any) {
    onError(e, req, res);
  }
};

const correlatedKPIs = async (req: Request, res: Response) => {
  try {
    // NOTE: we currently have correlation data for south korea and japan loaded,
    // which were the "most" developed countries we could get data for.
    // A SDG target correlation mapping for Norway should be extant, but we did not have access to it,
    // and this could be a good use case for publishing these.
    //
    // Further, as the correlations are approximated through the SDG targets, they will be somewhat
    // crude, but should be useful enough to distinguish rough categories of synergies / tradeoffs.
    // Someone might want to investigate the correlations between U4SSC KPIs in order to map this more
    // accurately.

    const resp = await getCorrelatedKPIs('kr', req.params.indicator);
    res.json(resp);
  } catch (e: any) {
    onError(e, req, res);
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

type CSVErrorMessage = {
  data: any;
  message: string;
};

const goalUploadCSV = async (req: Request, res: Response) => {
  try {
    const { municipality } = req.body;
    if (!municipality) throw new ApiError(401, 'Missing municipality');

    const validMunicipality = await CheckMunicipalityByCode(municipality);
    if (validMunicipality === 0) throw new ApiError(400, 'Invalid municipality id');

    const isDummy = req.body.isDummy !== undefined && JSON.parse(req.body.isDummy);

    const { buffer } = (req as any).file;
    const str = buffer.toString();

    const header = str.split('\n')[0].trim();
    const separator = detectSeparator(header);

    // validate that headers are correct
    const fields = header.split(separator);
    const requiredFields = new Set([
      'indicator',
      'dataseries',
      'baseline',
      'baselineYear',
      'target',
      'deadline',
      'startRange',
    ]);
    fields.forEach((field) => {
      if (!requiredFields.has(field)) throw new ApiError(401, `Unrecognized CSV field: '${field}'`);
      else requiredFields.delete(field);
    });

    if (requiredFields.size !== 0)
      throw new ApiError(
        401,
        `Missing required CSV fields: ${Array.from(requiredFields).map((f) => `${f}, `)}`,
      );

    const data = await parseCSV(buffer, { separator });

    // Validate goals
    const goals: GDCGoal[] = [];
    const errors: CSVErrorMessage[] = [];
    data.forEach((dp) => {
      let { indicator } = dp;
      const tkTransform = TKTransform.get(indicator);
      if (tkTransform) indicator = tkTransform;

      const indicatorName = u4sscKpiMap.get(indicator);
      if (!indicatorName) errors.push({ data: dp, message: 'Unrecognized KPI' });
      else {
        const dataseries = u4sscKpiDataseries.get(indicator);
        if (dataseries && !dataseries.has(dp.dataseries)) {
          errors.push({ data: dp, message: 'Missing / unrecognized required data series' });
        } else if (!dataseries && dp.dataseries !== '') {
          errors.push({ data: dp, message: 'Dataseries present in indicator not having one' });
        } else {
          const baseline = JSON.parse(dp.baseline);
          const baselineAsNumber = Number(baseline);
          const baselineYear = JSON.parse(dp.baselineYear);
          const baselineYearAsNumber = Number(baselineYear);
          const target = JSON.parse(dp.target);
          const targetAsNumber = Number(target);
          const deadline = JSON.parse(dp.deadline);
          const deadlineAsNumber = Number(deadline);
          const startRange = JSON.parse(dp.startRange);
          const startRangeAsNumber = Number(startRange);

          if (Number.isNaN(baselineAsNumber))
            errors.push({
              data: dp,
              message: `Baseline is in an incompatible format: '${typeof baseline}'`,
            });

          if (Number.isNaN(baselineYearAsNumber))
            errors.push({
              data: dp,
              message: `Baseline year is in an incompatible format: '${typeof baselineYear}'`,
            });

          if (Number.isNaN(targetAsNumber))
            errors.push({
              data: dp,
              message: `Target is in an incompatible format: '${typeof target}'`,
            });

          if (Number.isNaN(deadlineAsNumber))
            errors.push({
              data: dp,
              message: `Deadline is in an incompatible format: '${typeof deadline}'`,
            });

          if (Number.isNaN(startRangeAsNumber))
            errors.push({
              data: dp,
              message: `Start range is in an incompatible format: '${typeof startRange}'`,
            });

          if (Math.abs(startRangeAsNumber - targetAsNumber) < 0.0001)
            errors.push({
              data: dp,
              message: `Start range too similar to target: startRange is '${startRangeAsNumber}', target is '${targetAsNumber}'`,
            });

          const goal: GDCGoal = {
            municipality,
            indicatorId: indicator,
            indicatorName,
            isDummy,
            dataseries: dp.dataseries === '' ? 'main' : dp.dataseries,
            target: targetAsNumber,
            deadline: deadlineAsNumber,
            baseline: baselineAsNumber,
            baselineYear: baselineYearAsNumber,
            startRange: startRangeAsNumber,
          };

          goals.push(goal);
        }
      }
    });

    if (errors.length > 0) {
      throw new ApiError(401, `Data errors: ${JSON.stringify(errors)}`);
    }

    await bulkDeleteGDCGoals(goals);
    await bulkInsertGDCGoals(municipality, goals);

    res.json({});
  } catch (e: any) {
    onError(e, req, res);
  }
};

router.get(
  '/compute/:municipality/:year/:goalOverride?/:overrideMode?',
  verifyDatabaseAccess,
  getGoalDistance,
);
router.post('/set-goal', verifyDatabaseAccess, verifyToken, setGoal);
router.post('/set-bulk-goals', verifyDatabaseAccess, verifyToken, setBulkGoals);
router.get('/goals/:municipality', verifyDatabaseAccess, getGoals);
router.get('/correlated-kpis/:indicator', verifyDatabaseAccess, correlatedKPIs);
router.get('/get-attained-goals/:municipality/:year', verifyDatabaseAccess, areGoalsAttained);
router.post('/upload', verifyToken, verifyDatabaseAccess, upload.single('csv'), goalUploadCSV);

export default router;
