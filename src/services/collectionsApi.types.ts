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

export interface PaginatedResponse<T> {
  data: T[];
  limit: number;
  page: number;
  total: number;
}

export interface QueryParams {
  page: string;
  limit: number;
  selectedSpecialization: string;
  selectedAccess: string;
}