import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../lib/selector/index';
import { booleanToString } from '../../lib/tools/boolean-to-string';
import { generateIdentifier } from '../../lib/tools/generate-identifier';
import { removeFromArray } from '../../lib/tools/remove-from-array';
import { getIconHTML } from '../icons/index';
import { MaterialSymbols } from '../icons/material-symbols-type';
import { Page } from '../pages/index';

export interface Tab {
  page: Page;
  name: string;
  icon: MaterialSymbols;
  closable: boolean;
  open: boolean;
  parameters: Array<any>;
  time: number;
  id: string;
}

const tabsElement = documentQuerySelector('.css_tabs');

const currentTabs: { [TabID: Tab['id']]: Tab } = {};

let previousTabsList: Array<Tab> = [];
let tabHistory: Array<Tab['id']> = [];

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
  newCloseElement.innerHTML = getIconHTML('close_small');
  newTabElement.appendChild(newCloseElement);

  return newTabElement;
}

function updateTabs(): void {
  function updateTab(thisTabElement: HTMLElement, currentTab: Tab, previousTab: Tab | undefined): void {
    function updateTabID(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.setAttribute('tab-id', currentTab.id);
    }

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

    function updateOpen(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.setAttribute('open', booleanToString(currentTab.open));
    }

    function updateOnclick(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.onclick = function () {
        // TODO: switch pages
      };
    }

    if (previousTab !== undefined) {
      if (currentTab.id !== previousTab.id) {
        updateTabID(thisTabElement, currentTab);
      }
      if (currentTab.icon !== previousTab.icon) {
        updateIcon(thisTabElement, currentTab);
      }
      if (currentTab.name !== previousTab.name) {
        updateName(thisTabElement, currentTab);
      }
      if (currentTab.closable !== previousTab.closable) {
        updateClosable(thisTabElement, currentTab);
      }
      if (currentTab.open !== previousTab.open) {
        updateOpen(thisTabElement, currentTab);
      }
      if (currentTab.page !== previousTab.page) {
        updateOnclick(thisTabElement, currentTab);
      }
    } else {
      updateTabID(thisTabElement, currentTab);
      updateIcon(thisTabElement, currentTab);
      updateName(thisTabElement, currentTab);
      updateClosable(thisTabElement, currentTab);
      updateOpen(thisTabElement, currentTab);
      updateOnclick(thisTabElement, currentTab);
    }
  }
  const tabElements = Array.from(elementQuerySelectorAll(tabsElement, '.css_tab'));
  const tabElementsLength = tabElements.length;
  const TabsList = listTabs();
  const TabsListLength = TabsList.length;
  const fragment = new DocumentFragment();
  if (TabsListLength >= tabElementsLength) {
    for (let i = tabElementsLength; i < TabsListLength; i++) {
      const newTabElement = generateTabElement();
      fragment.appendChild(newTabElement);
      tabElements.push(newTabElement);
    }
    tabsElement.append(fragment);
  } else {
    for (let j = tabElementsLength - 1; j >= TabsListLength; j--) {
      tabElements[j].remove();
    }
  }

  for (let k = 0; k < TabsListLength; k++) {
    const previousTab = previousTabsList[k];
    const currentTab = TabsList[k];
    const thisTabElement = tabElements[k];
    updateTab(thisTabElement, currentTab, previousTab);
  }

  previousTabsList = TabsList;
}

export function registerTab(page: Tab['page'], name: Tab['name'], icon: Tab['icon'], closable: Tab['closable'], parameters: Tab['parameters']): Tab['id'] {
  const TabID = generateIdentifier();
  const object: Tab = {
    page: page,
    name: name,
    icon: icon,
    closable: closable,
    open: false,
    parameters: parameters,
    time: new Date().getTime(),
    id: TabID
  };
  currentTabs[TabID] = object;
  return TabID;
}

export function listTabs(): Array<Tab> {
  let result: Array<Tab> = [];
  for (const key in currentTabs) {
    const thisTab = currentTabs[key];
    result.push(thisTab);
  }
  result.sort(function (a, b) {
    return a.time - b.time;
  });
  return result;
}

export function getTab(TabID: Tab['id']): Tab | undefined {
  return currentTabs[TabID];
}

export function openTab(TabID: Tab['id']): boolean {
  const nextTab = getTab(TabID);
  if (nextTab !== undefined) {
    // hide the current
    const tabHistoryLength = tabHistory.length;
    if (tabHistoryLength > 0) {
      const lastTabID = tabHistory[tabHistoryLength - 1];
      const currentTab = getTab(lastTabID);
      if (currentTab !== undefined) {
        if (currentTab.id !== nextTab.id) {
          currentTab.open = false;
          nextTab.open = true;
          if (lastTabID !== TabID) {
            tabHistory.push(TabID);
          }
        }
      }
    } else {
      // show the next
      nextTab.open = true;
      tabHistory.push(TabID);
    }

    // update tabs
    updateTabs();
  }
}

export function closeTab(TabID: Tab['id']): boolean {
  if (tabHistory.length <= 1) return false;
  const thisTab = getTab(TabID);
  if (thisTab === undefined) return false;
  if (!thisTab.closable) return false;
  removeFromArray(tabHistory, TabID);
  delete currentTabs[TabID];
  if (tabHistory.length > 0) {
    const lastTabID = tabHistory[tabHistory.length - 1];
    const lastTab = getTab(lastTabID);
    if (lastTab !== undefined) {
      lastTab.open = true;
    }
  }
  updateTabs();
  return true;
}

export function initializeTabs(): void {
  const homeTab = registerTab('home', 'Home', 'home', false, []);
  const settingsTab = registerTab('settings', 'Settings', 'settings', false, []);
  openTab(homeTab);
  updateTabs();
}
