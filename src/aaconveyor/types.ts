export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export type ModelField = string | { name: string; type: string };

export type ModelData = Record<string, any>;
