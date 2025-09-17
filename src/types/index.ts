export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: 'new' | 'contacted' | 'qualified' | 'converted';
}

export interface Opportunity {
  id: number;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
}

export interface FilterState {
  search: string;
  status: string;
  sortBy: 'score' | 'name' | 'company';
  sortOrder: 'asc' | 'desc';
}
