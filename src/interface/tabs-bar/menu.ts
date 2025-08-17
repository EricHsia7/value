import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../lib/selector/index';
import { getIconHTML } from '../icons/index';
import { MaterialSymbols } from '../icons/material-symbols-type';

export interface TabsBarMenuItem {
  key: string;
  icon: MaterialSymbols;
  name: string;
  action: Function;
}

export type TabsBarMenuItemArray = Array<TabsBarMenuItem>;

const menuButtonElement = documentQuerySelector('.css_tabs_bar_menu_button');
const menuElement = documentQuerySelector('.css_tabs_bar_menu');

let previousMenuItems = [];

function generateMenuItemElement(): HTMLElement {
  const newMenuItemElement = document.createElement('div');
  newMenuItemElement.classList.add('css_tabs_bar_menu_item');

  const newIconElement = document.createElement('div');
  newIconElement.classList.add('css_tabs_bar_menu_item_icon');
  newMenuItemElement.appendChild(newIconElement);

  const newNameElement = document.createElement('div');
  newNameElement.classList.add('css_tabs_bar_menu_item_name');
  newMenuItemElement.appendChild(newNameElement);

  return newMenuItemElement;
}

export function updateTabsBarMenu(menuItems: TabsBarMenuItemArray): void {
  function updateTabsBarMenuItem(thisMenuItemElement: HTMLElement, currentMenuItem: TabsBarMenuItem, previousMenuItem: TabsBarMenuItem | undefined): void {
    function updateIcon(thisMenuItemElement: HTMLElement, currentMenuItem: TabsBarMenuItem): void {
      const iconElement = elementQuerySelector(thisMenuItemElement, '.css_tabs_bar_menu_item_icon');
      iconElement.innerHTML = getIconHTML(currentMenuItem.icon);
    }

    function updateName(thisMenuItemElement: HTMLElement, currentMenuItem: TabsBarMenuItem): void {
      const iconElement = elementQuerySelector(thisMenuItemElement, '.css_tabs_bar_menu_item_name');
      iconElement.innerText = currentMenuItem.name;
    }

    function updateAction(thisMenuItemElement: HTMLElement, currentMenuItem: TabsBarMenuItem): void {
      thisMenuItemElement.onclick = currentMenuItem.action;
    }

    if (previousMenuItem !== undefined) {
      if (currentMenuItem.key !== previousMenuItem.key) {
        updateIcon(thisMenuItemElement, currentMenuItem);
        updateName(thisMenuItemElement, currentMenuItem);
        updateAction(thisMenuItemElement, currentMenuItem);
      }
    } else {
      updateIcon(thisMenuItemElement, currentMenuItem);
      updateName(thisMenuItemElement, currentMenuItem);
      updateAction(thisMenuItemElement, currentMenuItem);
    }
  }

  const menuItemElements = Array.from(elementQuerySelectorAll(menuElement, '.css_tabs_bar_menu_item'));
  const menuItemElementsLength = menuItemElements.length;
  const menuItemsLength = menuItems.length;
  if (menuItemsLength >= menuItemElementsLength) {
    const fragment = new DocumentFragment();
    for (let i = menuItemElementsLength; i < menuItemsLength; i++) {
      const newMenuItemElement = generateMenuItemElement();
      fragment.appendChild(newMenuItemElement);
      menuItemElements.push(newMenuItemElement);
    }
    menuElement.append(fragment);
  } else {
    for (let j = menuItemElementsLength - 1; j >= menuItemsLength; j--) {
      menuItemElements[j].remove();
    }
  }

  for (let k = 0; k < menuItemsLength; k++) {
    const previousMenuItem = previousMenuItems[k];
    const currentMenuItem = menuItems[k];
    const thisMenuItemElement = menuItemElements[k];
    updateTabsBarMenuItem(thisMenuItemElement, currentMenuItem, previousMenuItem);
  }

  menuButtonElement.onclick = function () {
    openTabsBarMenu();
  };

  previousMenuItems = menuItems;
}

export function openTabsBarMenu() {
  menuElement.setAttribute('displayed', 'true');
}
