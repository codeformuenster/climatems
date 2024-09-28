import { AcademicCapIcon, BeakerIcon, BoltIcon, HomeIcon, PaperAirplaneIcon, SunIcon, TagIcon } from '@heroicons/vue/24/outline';

export const getCategoryIcon = (categoryId: string)=> {
  if (categoryId === "Energieerzeugung") {
    return BoltIcon;
  }
  if (categoryId === "Bauen und Sanieren") {
    return HomeIcon;
  }
  if (categoryId === "Mobilität") {
    return PaperAirplaneIcon;
  }
  if (categoryId === "Klimahaushalt") {
    return SunIcon;
  }
  if (categoryId === "Bildung und Ernährung") {
    return AcademicCapIcon;
  }
  if (categoryId === "Wirtschaft und Wissenschaft") {
    return BeakerIcon;
  }
  return TagIcon;
};