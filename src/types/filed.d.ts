import {
  ListAttributeType,
  ListDisplayedRule,
  ListPrimitiveType,
} from "./list";

export type ListFieldTest = {
  id: string;
  label: string;
  require: boolean;
  span: number;
  placeholder: string;
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
};
