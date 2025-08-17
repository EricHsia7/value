import { documentQuerySelector } from '../../lib/selector/index';
import { MaterialSymbols } from '../icons/material-symbols-type';

export interface TabsBarMenuItem {
  icon: MaterialSymbols;
  name: string;
  action: Function;
}

export type TabsBarMenuItemArray = Array<TabsBarMenuItem>;

const menuButtonElement = documentQuerySelector('.css_tabs_bar_menu_button');

export function updateMenuButton(items: TabsBarMenuItemArray): void {
  menuButtonElement.onclick = function () {
    openTabsBarMenu(items);
  };
}

export function openTabsBarMenu(items: TabsBarMenuItemArray): void {
  for (const item of items) {
  }
}
