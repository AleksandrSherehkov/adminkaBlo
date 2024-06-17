import { IconType } from "react-icons";

export type NavLinkProps = {
    links: Array<NavLinkItem>;
  };
  
  export class NavLinkItem {
    text: string;
    href: string;
    accessRules: Array<string>;
    children: Array<NavLinkItem>;
    icon?: IconType | null;
  
    constructor(
      text: string,
      href: string,
      accessRules: Array<string>,
      children: Array<NavLinkItem>,
      icon?: IconType | null
    ) {
      this.text = text;
      this.href = href;
      this.accessRules = accessRules;
      this.children = children;
      this.icon = icon;
    }
  }