import measures from '@/data/measures.json';

import implementations20210101 from '@/data/implementations/2021-01-01.json';
import implementations20210401 from '@/data/implementations/2021-04-01.json';
import implementations20210701 from '@/data/implementations/2021-07-01.json';
import implementations20211001 from '@/data/implementations/2021-10-01.json';
import implementations20220101 from '@/data/implementations/2022-01-01.json';
import implementations20220401 from '@/data/implementations/2022-04-01.json';
import implementations20220701 from '@/data/implementations/2022-07-01.json';
import implementations20221001 from '@/data/implementations/2022-10-01.json';
import implementations20230101 from '@/data/implementations/2023-01-01.json';
import implementations20230401 from '@/data/implementations/2023-04-01.json';
import implementations20230701 from '@/data/implementations/2023-07-01.json';
import implementations20231001 from '@/data/implementations/2023-10-01.json';
import implementations20240101 from '@/data/implementations/2024-01-01.json';
import implementations20240401 from '@/data/implementations/2024-04-01.json';
import implementations20240701 from '@/data/implementations/2024-07-01.json';
import implementations20241001 from '@/data/implementations/2024-10-01.json';

import additionalData from '@/data/additional_data.json';


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
  "Removed/substituted energy, volume, or fuel type": string;
  "GHG emissions reduction estimate (total)"?: string;
  "GHG emissions reduction estimate (total) per emission source sector"?: string;
  "Total costs and costs by CO2e unit": string;
}

export interface Measure {
  id: string;
  category: string;
  categoryId: string;
  "Action outline": ActionOutline;
  "Reference to impact pathway": ReferenceToImpactPathway;
  "Implementation": Implemetation;
  "Impact & cost": ImpageAndCost;
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
}

export type MeasureStatus = 'in_progress' | 'unknuwn' | 'completed';
type BaseMeasureProgress = {
  id: string;
  status: MeasureStatus;
}

export type MeasureProgress = BaseMeasureProgress & {
  measure: 'percent';
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

const getMeasure = async (measureId: string): Promise<Measure | undefined> => {
  return measures.find(({ id }) => id === measureId);
}

const getMeasureProgress = async (): Promise<MeasureProgress[]> => {
  return implementations20231001 as MeasureProgress[];
}

const getAllMeasureProgresses = async (): Promise<{ [key: string]: MeasureProgress[]; }> => {
  const implementations = [
    ...implementations20210101,
    ...implementations20210401,
    ...implementations20210701,
    ...implementations20211001,
    ...implementations20220101,
    ...implementations20220401,
    ...implementations20220701,
    ...implementations20221001,
    ...implementations20230101,
    ...implementations20230401,
    ...implementations20230701,
    ...implementations20231001,
    ...implementations20240101,
    ...implementations20240401,
    ...implementations20240701,
    ...implementations20241001,
  ] as MeasureProgress[];

  const groupedResult = implementations.reduce((acc: { [key: string]: MeasureProgress[] }, item) => {
    if (!acc[item.id]) {
      acc[item.id] = [item];
    }
    acc[item.id].push(item);
    return acc;
  }, {});

  return groupedResult;
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
  return measures.filter(measure => measure.categoryId === categoryId);
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

const getAdditionalData = async () => additionalData as AdditionalMeasureData[];

const getAdditionalMeasureData = async (measureId: string): Promise<AdditionalMeasureData | undefined> => {
  return (await getAdditionalData()).find(({ id }) => id === measureId);
}

export {
  getMeasures,
  getMeasuresForCategory,
  getCategory,
  getCategories,
  getMeasureProgress,
  getAllMeasureProgresses,
  getProgressForMeasure,
  getProgressListForMeasure,
  getMeasure,
  getAdditionalData,
  getAdditionalMeasureData,
}
