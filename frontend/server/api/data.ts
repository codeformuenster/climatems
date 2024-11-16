import measures from '@/data/measures.json';
import implementations from '@/data/implementations.json';
import additionalData from '@/data/additional_data.json';
import categoryData from '@/data/categories.json';

export default defineEventHandler((event: any) => {
  const query = getQuery(event)
  const dataType = query["type"];

  switch (dataType) {
    case 'measures':
      return measures;
    case 'implementations':
      return implementations;
    case 'additionalData':
      return additionalData;
    case 'categories':
      return categoryData;
    default:
      return { error: 'Invalid data type' };
  }
});
