export interface BaseComponentProps {
  id?: string;
  className?: string;
}

export type Field =
  | string
  | {
      name: string;
      type: string;
      relationship?: { many: boolean; modelName: string };
    };

export type ModelData = Record<string, any>;
