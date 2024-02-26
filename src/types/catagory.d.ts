export type SubMenu4 = {
  label: string;
  submenu?: { label: string }[];
};

export type SubMenu3 = {
  label: string;
  submenu?: SubMenu4;
};

export type SubMenu2 = {
  label: string;
  submenu?: SubMenu3;
};

export type SubMenu1 = {
  label: string;
  submenu?: SubMenu2[];
};

export type SubMenu = {
  label: string;
  submenu?: SubMenu1[];
};

export type MenuCatagory = {
  label: string;
  submenu?: SubMenu[];
};
