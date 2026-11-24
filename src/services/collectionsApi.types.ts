export interface Specialization {
  id: number;
  title: string;
}

interface CollectionCompany {
  id: string;
  title: string;
  imageSrc: string;
}

interface CollectionAuthor {
  id: string;
  username: string;
}

export interface Collection {
  id: number;
  imageSrc?: string;
  specializations: Specialization[];
  title: string;
  description: string;
  isFree: boolean;
  questionsCount: number;
  keywords: string[];
  company: CollectionCompany;
  createdBy: CollectionAuthor;
}

interface Skill {
  id: number;
  title: string;
  imageSrc: string | null;
}

export interface QuestionItem {
  id: number;
  complexity: number;
  title: string;
  rate: number;
  shortAnswer: string;
}

export interface Question extends QuestionItem {
  description: string;
  imageSrc: string | null;
  longAnswer: string;
  questionSkills: Skill[];
}

export interface PaginatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}

export interface CollectionQueryParams {
  page: string;
  limit: number;
  selectedSpecialization?: string;
  selectedAccess?: string;
  searchQuery: string
}

export interface QuestionQueryParams {
  page: string;
  limit: number;
  collection: string;
}