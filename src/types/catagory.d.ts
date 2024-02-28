import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type MenuCatagory = {
  icon: IconDefinition;
  label: string;
  submenu?: MenuCatagory[];
};
