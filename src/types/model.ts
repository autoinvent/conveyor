export interface Field {
  name: string;
  type: string;
  many?: boolean;
  required?: boolean;
  sortable?: boolean;
  editable?: boolean;
}
