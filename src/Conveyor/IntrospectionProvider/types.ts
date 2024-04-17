export type ModelField = Record<string, string>;

export interface MQLType {
  kind: string;
  name: string | null;
  ofType: MQLType;
}
