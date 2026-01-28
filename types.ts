export interface FileLink {
  name: string;
  url: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  files: FileLink[];
}

export interface Rule {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface GeneralFile {
  id: string;
  name: string;
  category: string;
  date: string;
  url: string;
}

export type Section = 'club' | 'rules' | 'files';