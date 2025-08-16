import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../lib/selector/index';
import { booleanToString } from '../../lib/tools/boolean-to-string';
import { generateIdentifier } from '../../lib/tools/generate-identifier';
import { getIconHTML } from '../icons/index';
import { MaterialSymbols } from '../icons/material-symbols-type';
import { Page } from '../pages/index';

export interface Tab {
  page: Page;
  name: string;
  icon: MaterialSymbols;
  closable: boolean;
  parameters: Array<any>;
  id: string;
}

const tabsElement = documentQuerySelector('.css_tabs');

const currentTabs: Array<Tab> = [];
let previousTabs: Array<Tab> = [];

function generateTabElement(): HTMLElement {
  const newTabElement = document.createElement('div');
  newTabElement.classList.add('css_tab');

  const newIconElement = document.createElement('div');
  newIconElement.classList.add('css_tab_icon');
  newTabElement.appendChild(newIconElement);

  const newNameElement = document.createElement('div');
  newNameElement.classList.add('css_tab_name');
  newTabElement.appendChild(newNameElement);

  const newCloseElement = document.createElement('div');
  newCloseElement.classList.add('css_tab_close');
  newCloseElement.innerHTML = getIconHTML('close');
  newTabElement.appendChild(newCloseElement);

  return newTabElement;
}

function updateTabs(): void {
  function updateTab(thisTabElement: HTMLElement, currentTab: Tab, previousTab: Tab | undefined): void {
    function updateIcon(thisTabElement: HTMLElement, currentTab: Tab) {
      const iconElement = elementQuerySelector(thisTabElement, '.css_tab_icon');
      iconElement.innerHTML = getIconHTML(currentTab.icon);
    }

    function updateName(thisTabElement: HTMLElement, currentTab: Tab) {
      const nameElement = elementQuerySelector(thisTabElement, '.css_tab_name');
      nameElement.innerText = currentTab.name;
    }

    function updateClosable(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.setAttribute('closable', booleanToString(currentTab.closable));
      if (currentTab.closable) {
        // TODO: add closeTab
      } else {
        // TODO: remove closeTab
      }
    }

    function updateOnclick(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.onclick = function () {
        // TODO: switch pages
      };
    }

    if (previousTab !== undefined) {
      if (currentTab.icon !== previousTab.icon) {
        updateIcon(thisTabElement, currentTab);
      }
      if (currentTab.name !== previousTab.name) {
        updateName(thisTabElement, currentTab);
      }
      if (currentTab.closable !== previousTab.closable) {
        updateClosable(thisTabElement, currentTab);
      }
      if (currentTab.page !== previousTab.page) {
        updateOnclick(thisTabElement, currentTab);
      }
    } else {
      updateIcon(thisTabElement, currentTab);
      updateName(thisTabElement, currentTab);
      updateClosable(thisTabElement, currentTab);
      updateOnclick(thisTabElement, currentTab);
    }
  }
  const tabElements = Array.from(elementQuerySelectorAll(tabsElement, '.css_tab'));
  const tabElementsLength = tabElements.length;

  const TabsLength = currentTabs.length;
  const fragment = new DocumentFragment();
  if (TabsLength >= tabElementsLength) {
    for (let i = tabElementsLength; i < TabsLength; i++) {
      const newTabElement = generateTabElement();
      fragment.appendChild(newTabElement);
      tabElements.push(newTabElement);
    }
    tabsElement.append(fragment);
  } else {
    for (let j = tabElementsLength - 1; j >= TabsLength; j--) {
      tabElements[j].remove();
    }
  }

  for (let k = 0; k < TabsLength; k++) {
    const previousTab = previousTabs[k];
    const currentTab = currentTabs[k];
    const thisTabElement = tabElements[k];
    updateTab(thisTabElement, currentTab, previousTab);
  }

  previousTabs = currentTabs
}

export function registerTab(page: Tab['page'], name: Tab['name'], icon: Tab['icon'], closable: Tab['closable'], parameters: Tab['parameters']): void {
  const TabID = generateIdentifier();
  const object: Tab = {
    page: page,
    name: name,
    icon: icon,
    closable: closable,
    parameters: parameters,
    id: TabID
  };
  currentTabs.push(object);
}

export function initializeTabs(): void {
  registerTab('home', 'Home', 'home', false, []);
  registerTab('settings', 'Settings', 'settings', false, []);
  updateTabs();
}
