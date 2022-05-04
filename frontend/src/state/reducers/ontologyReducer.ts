import { CorrelationFilter, KpiFilter, Node } from '../../types/ontologyTypes';
import {
  CLEAR_SELECTED_NODE,
  OntologyState,
  OntologyStateAction,
  SELECT_NODE,
  SetCorrelationFilterAction,
  SetCorrelationFilterPayload,
  SetKpiFilterAction,
  SetKpiFilterPayload,
  SET_CORRELATION_FILTER,
  SET_KPI_FILTER,
} from '../../types/redux/ontologyTypes';

const createNewCorrelationFilter = (
  current: CorrelationFilter,
  payload: SetCorrelationFilterPayload,
) => {
  const newFilter = current;
  if (payload.isPositive && payload.index === 0) newFilter.pLow = !current.pLow;
  else if (payload.isPositive && payload.index === 1) newFilter.pMedium = !current.pMedium;
  else if (payload.isPositive && payload.index === 2) newFilter.pHigh = !current.pHigh;
  else if (!payload.isPositive && payload.index === 0) newFilter.nLow = !current.nLow;
  else if (!payload.isPositive && payload.index === 1) newFilter.nMedium = !current.nMedium;
  else if (!payload.isPositive && payload.index === 2) newFilter.nHigh = !current.nHigh;
  return newFilter;
};

// add new 'else if' condition when implementing new kpi set
const createNewKpiFilter = (current: KpiFilter, payload: SetKpiFilterPayload) => {
  const newFilter = current;
  if (payload.index === '1') {
    newFilter.u4ssc = true;
    newFilter.oecd = false;
    newFilter.unIndicator = false;
  } else if (payload.index === '2') {
    newFilter.u4ssc = false;
    newFilter.oecd = true;
    newFilter.unIndicator = false;
  } else if (payload.index === '3') {
    newFilter.u4ssc = false;
    newFilter.oecd = false;
    newFilter.unIndicator = true;
  }
  return newFilter;
};

const defaultState: OntologyState = {
  selectedNode: undefined,
  correlationFilter: {
    pLow: true,
    pMedium: true,
    pHigh: true,
    nLow: true,
    nMedium: true,
    nHigh: true,
  },
  kpiFilter: {
    u4ssc: true,
    oecd: false,
    unIndicator: false,
  },
};

const ontologyReducer = (
  state: OntologyState = defaultState,
  action: OntologyStateAction,
): OntologyState => {
  switch (action.type) {
    case SELECT_NODE:
      return {
        ...state,
        selectedNode: action.payload,
      };
    case CLEAR_SELECTED_NODE:
      return defaultState;
    case SET_CORRELATION_FILTER:
      return {
        ...state,
        correlationFilter: createNewCorrelationFilter(state.correlationFilter, action.payload),
      };
    case SET_KPI_FILTER:
      return {
        ...state,
        kpiFilter: createNewKpiFilter(state.kpiFilter, action.payload),
      };
    default:
      return state;
  }
};

export const selectNode = (node: Node): OntologyStateAction => ({
  type: 'SELECT_NODE',
  payload: node,
});

export const setCorrelationFilter = (
  isPositive: boolean,
  index: number,
): SetCorrelationFilterAction => ({
  type: 'SET_CORRELATION_FILTER',
  payload: { isPositive, index },
});

export const setKpiFilter = (index: string): SetKpiFilterAction => ({
  type: 'SET_KPI_FILTER',
  payload: { index },
});

export const clearSelectedNode = (): OntologyStateAction => ({ type: 'CLEAR_SELECTED_NODE' });

export default ontologyReducer;
