export type ListFieldTest = {
  id: string;
  label: string;
  require: boolean;
  span: number;
  placeholder: string;
  defaultValue: string | number;
  style: React.CSSProperties;
};

export type ListRowTest = {
  id: string;
  label: string;
  type: string;
  key: string;
};

export type ListCellTest = {
  id: string;
  attribute_name: string;
  attribute_type: ListAttributeType[];
  primitive_type: ListPrimitiveType[];
  object_type: string;
  suggest_body: string;
  displayed_rule: ListDisplayedRule[];
  action_delete: boolean;
  selected: boolean;
  [key: string]: string | number;
} & {
  [key in keyof Omit<
    ListCellTest,
    | "id"
    | "attribute_name"
    | "attribute_type"
    | "primitive_type"
    | "object_type"
    | "suggest_body"
    | "displayed_rule"
    | "action_delete"
    | "selected"
  >]?: string | number;
};
