import DB from './index';
import { SustainabilityGoal } from '../types/ontologyTypes';
import getSustainabilityGoals from './queries/getSustainabilityGoals';

export default async (): Promise<Array<SustainabilityGoal>> => {
  const query = getSustainabilityGoals();
  return DB.query(query, { transform: 'toJSON' }).then((resp) => resp.records);
};
