import { CorrelationFilter, KpiFilter, Node } from '../ontologyTypes';

export type SetCorrelationFilterPayload = {
  isPositive: boolean;
  index: number;
};

export type SetKpiFilterPayload = {
  index: string;
};

export type OntologyState = {
  selectedNode?: Node;
  correlationFilter: CorrelationFilter;
  kpiFilter: KpiFilter;
};

export type SelectNodeAction = {
  type: typeof SELECT_NODE;
  payload: Node;
};

export type ClearSelectedNodeAction = {
  type: typeof CLEAR_SELECTED_NODE;
};

export type SetCorrelationFilterAction = {
  type: typeof SET_CORRELATION_FILTER;
  payload: SetCorrelationFilterPayload;
};

export type SetKpiFilterAction = {
  type: typeof SET_KPI_FILTER;
  payload: SetKpiFilterPayload;
};

export type OntologyStateAction =
  | SelectNodeAction
  | ClearSelectedNodeAction
  | SetCorrelationFilterAction
  | SetKpiFilterAction;

export const SELECT_NODE = 'SELECT_NODE';
export const CLEAR_SELECTED_NODE = 'CLEAR_SELECTED_NODE';
export const SET_CORRELATION_FILTER = 'SET_CORRELATION_FILTER';
export const SET_KPI_FILTER = 'SET_KPI_FILTER';
