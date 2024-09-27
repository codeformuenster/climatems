import measures from '@/data/measures.json';
import implementations from '@/data/implementations.json';

interface ActionOutline {
  "Action name": string;
  "Action type": string;
  "Action description": string;
}

interface ReferenceToImpactPathway {
  "Field of action": string;
  "Systemic lever": string;
  "Governance and policy"?: string;
  "Outcome (according to module B-1.1)"?: string;
}

interface Implemetation {
  "Responsible bodies/person for implementation": string;
  "Action scale & addressed entities": string;
  "Involved stakeholders": string;
  "Comments on implementation": string;
  "Next steps"?: string[];
}

interface ImpageAndCost {
  "Generated renewable energy"?: string;
  "Removed/substituted energy": string;
  "GHG emissions reduction estimate (total)": string;
  "Total costs and costs by CO2e unit": string;
}

export interface Measure {
  id: string;
  category: string;
  // categoryId: string; coming soon
  "Action outline": ActionOutline;
  "Reference to impact pathway": ReferenceToImpactPathway;
  "Implementation": Implemetation;
  "Impact & cost": ImpageAndCost;
}

export type MeasureStatus = 'in_progress' | 'unknuwn' | 'completed';
type BaseMeasureProgress = {
  id: string;
  status: MeasureStatus;
}

export type MeasureProgress = BaseMeasureProgress & {
  measure: 'percentile';
  progress: number;
} | BaseMeasureProgress & {
  measure: 'binary';
}

export interface Category {
  id: string;
  name: string;
  measures: Measure[];
}

const getMeasures = async (): Promise<Measure[]> => measures;
const getMeasureProgress = async (): Promise<MeasureProgress[]> => {
  return implementations as MeasureProgress[];
}

const getRawCategories = async () => {
  const rawCategories = measures.map(measure => ({
    name: measure.category,
    // TODO once avaialble
    id: measure.category,
  }));

  console.log(rawCategories)
  return rawCategories.filter((item, pos) => {
    return rawCategories.findIndex(({ id }) => id === item.id) == pos;
  })
}

const getMeasuresForCategory = async (categoryId: string) => {
  // todo Anpassen, sobald categoryId in measures
  return measures.filter(measure => measure.category === categoryId);
}

const getCategories = async (): Promise<Category[]> => {
  const categories = await getRawCategories();

  const withMetaInformation = await Promise.all(categories.map(async category => {
    const measures = await getMeasuresForCategory(category.id);

    return {
      ...category,
      measures,
    };
  }))

  return withMetaInformation;
}

const getProgressForMeasure = async (measureId: string) => {
  const progress = await getMeasureProgress();
  return progress.find(({ id }) => id === measureId);
}

export {
  getMeasures,
  getMeasuresForCategory,
  getCategories,
  getMeasureProgress,
  getProgressForMeasure,
}