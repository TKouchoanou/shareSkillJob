export interface Job {
  id?: number;
  title: string;
  salary: number;
  devise: string;
  skills: Array<string>;
  field: string;
  level: string;
  type: string;
  company: string;
  adresse: string;
  town: string;
  contacts: any;
  descriptionJob: string;
  descriptionProfil: string;
  pubDate?: any ;
}
