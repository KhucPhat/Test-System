import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export type INavLink = {
  id: string;
  label: string;
  icon: IconDefinition;
  link: string;
};

export type ListRows = {
  id: number;
  label: string;
  type: string;
  key: string;
  search?: boolean;
  button?: boolean;
  action?: () => void;
  style: React.CSSProperties;
};

export type ListCellItems = {
  id: number;
  name: string;
  description: string;
  attribute: string;
  [key: string]: string | number;
};

export type ListCellItems1 = {
  id: number;
  name: string;
  description: string;
};

export type ListButtonOptions = {
  id: string;
  icon: IconDefinition;
  action: () => void;
};

export type ListActionPagination = {
  id: string;
  icon?: IconDefinition;
  number?: string;
  action?: () => void;
};

export type ListAttributeType = {
  id: string;
  label: string;
};

export type ListPrimitiveType = {
  id: string;
  label: string;
};

export type ListDisplayedRule = {
  id: string;
  label: string;
};
