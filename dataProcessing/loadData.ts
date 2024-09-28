import measures from '@/data/measures.json';
import implementations from '@/data/implementations.json';

import additionalData from '@/data/additional_data.json';

import categoryData from '@/data/categories.json';


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

interface ImpactAndCost {
  "Generated renewable energy"?: string;
  "Removed/substituted energy, volume, or fuel type": string;
  "GHG emissions reduction estimate (total)"?: string;
  "GHG emissions reduction estimate (total) per emission source sector"?: string;
  "Total costs and costs by CO2e unit": string;
}

interface OriginalMeasure {
  "Action outline": ActionOutline;
  "Reference to impact pathway": ReferenceToImpactPathway;
  "Implementation": Implemetation;
  "Impact & cost": ImpactAndCost;
}

export interface Cost{
  until_in_years?: number;
  value?: number;
  quantity?: number;
}

export interface AdditionalMeasureData {
  id: string;
  user_action?: {
    label: string;
    href: string;
    description: string;
  };
  short_title?: string;
  summary: string;
  cost: Cost;
}

export type MeasureStatus = 'in_progress' | 'unknown' | 'completed';
type BaseMeasureProgress = {
  id: string;
}

export type MeasureProgress = BaseMeasureProgress & {
    type: 'percent';
    values: {
        value: number,
        date: Date,
    } []
} |
    BaseMeasureProgress & {
    type: 'count';
    unit: string;
    start: number;
    goal: number;
    yMin: number;
    yMax: number;
    values: {
        value: number,
        date: Date,
    } []
} | BaseMeasureProgress & {
    type: 'binary';
    values: {
        value: MeasureStatus,
        date: Date,
    } []
}

export interface Category {
  id: string;
  name: string;
  description: string;
  measures: Measure[];
}


export interface Measure {
  id: string;
  category: string;
  categoryId: string;
  original: OriginalMeasure;
  additionalData?: AdditionalMeasureData
  progress: MeasureProgress;
}


const getMeasures = async (): Promise<Measure[]> => {
  const progresses = await getAllMeasureProgresses();
  const additionalData = await getAdditionalData();

  return measures.map((measure) => ({
    id: measure.id,
    category: measure.category,
    categoryId: measure.categoryId,
    original: measure,
    additionalData: additionalData.find(({ id }) => id === measure.id),
    progress: progresses[measure.id] || undefined,
  }));
}

const getMeasure = async (measureId: string): Promise<Measure | undefined> => {
  const measures = await getMeasures();

  return measures.find(({ id }) => id === measureId);
}

const getMeasureProgress = async (): Promise<MeasureProgress[]> => {
  console.log('alte Implementation muss rausfliegen');
  return [];
  // return implementations20231001 as MeasureProgress[];
}


const getAdditionalData = async () => additionalData as AdditionalMeasureData[];


const getAllMeasureProgresses = async (): Promise<{ [key: string]: MeasureProgress; }> => {

  return implementations.reduce((acc, progress) => {
    acc[progress.id] = {...progress, values: progress.values.map(({ value, date }) => ({ value, date: new Date(date) }))};
    return acc;
  }, {});
}

const getRawCategories = async () => {
  const rawCategories = measures.map(measure => ({
    name: measure.category,
    id: measure.categoryId,
  }));

  return rawCategories.filter((item, pos) => {
    return rawCategories.findIndex(({ id }) => id === item.id) == pos;
  })
}

const getMeasuresForCategory = async (categoryId: string) => {
  const measures = await getMeasures();

  return measures.filter(measure => measure.categoryId === categoryId);
}

const getCategories = async (): Promise<Category[]> => {
  const categories = await getRawCategories();

  const withMetaInformation = await Promise.all(categories.map(async category => {
    const measures = await getMeasuresForCategory(category.id);
    const description = categoryData.find(({ id }) => id === category.id)?.description || '';

    return {
      ...category,
      measures,
      description
    };
  }))

  return withMetaInformation;
}

const getProgressListForMeasure = async (measureId: string) => {
  const progress = await getAllMeasureProgresses();
  return progress[measureId] || [];
}

const getProgressForMeasure = async (measureId: string) => {
  const progress = await getMeasureProgress();
  return progress.find(({ id }) => id === measureId);
}

const getCategory = async (categoryId: string) => {
  const categories = await getCategories();
  return categories.find(({ id }) => id === categoryId);
}


export {
  getMeasures,
  getMeasuresForCategory,
  getCategory,
  getCategories,
  getMeasureProgress,
  getProgressForMeasure,
  getProgressListForMeasure,
  getMeasure,
}
