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

const Tabs: { [TabID: Tab['id']]: Tab } = {};

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
    function updateIcon(thisTabElement: HTMLElement, currentTab: Tab) {
      const iconElement = elementQuerySelector(thisTabElement, '.css_tab_icon');
      iconElement.innerHTML = getIconHTML(currentTab.icon);
    }

    function updateName(thisTabElement: HTMLElement, currentTab: Tab) {
      const nameElement = elementQuerySelector(thisTabElement, '.css_tab_name');
      nameElement.innerText = currentTab.name;
    }

    function updateClose(thisTabElement: HTMLElement, currentTab: Tab) {
      const closeElement = elementQuerySelector(thisTabElement, '.css_tab_close');
      closeElement.onclick = currentTab.closable
        ? function (event) {
            event.stopPropagation();
            closeTab(currentTab.id);
          }
        : function () {};
      thisTabElement.setAttribute('closable', booleanToString(currentTab.closable));
    }

    function updateOpen(thisTabElement: HTMLElement, currentTab: Tab) {
      thisTabElement.setAttribute('open', booleanToString(currentTab.open));
      thisTabElement.onclick = function () {
        openTab(currentTab.id);
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
        updateClose(thisTabElement, currentTab);
      }
      if (currentTab.open !== previousTab.open || currentTab.id !== previousTab.id) {
        updateOpen(thisTabElement, currentTab);
      }
    } else {
      updateIcon(thisTabElement, currentTab);
      updateName(thisTabElement, currentTab);
      updateClose(thisTabElement, currentTab);
      updateOpen(thisTabElement, currentTab);
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
  Tabs[TabID] = object;
  return TabID;
}

export function listTabs(): Array<Tab> {
  let result: Array<Tab> = [];
  for (const key in Tabs) {
    const thisTab = Tabs[key];
    result.push(thisTab);
  }
  result.sort(function (a, b) {
    return a.time - b.time;
  });
  return result;
}

export function openTab(TabID: Tab['id']): boolean {
  console.log(0, TabID);
  const nextTab = Tabs[TabID];
  console.log(1, nextTab);
  if (nextTab) {
    console.log(2);
    // hide the current
    const tabHistoryLength = tabHistory.length;
    console.log(3, tabHistory, tabHistoryLength);
    if (tabHistoryLength > 0) {
      console.log(4);
      const lastTabID = tabHistory[tabHistoryLength - 1];
      const currentTab = Tabs[lastTabID];
      console.log(5, currentTab);
      if (currentTab && lastTabID !== TabID) {
        console.log(6, JSON.stringify(Tabs, null, 2));
        currentTab.open = false;
        nextTab.open = true;
        tabHistory.push(TabID);
        console.log(7, JSON.stringify(Tabs, null, 2));
      }
    } else {
      // show the next
      nextTab.open = true;
      tabHistory.push(TabID);
    }

    // update tabs
    updateTabs();
    return true;
  }
  return false;
}

export function closeTab(TabID: Tab['id']): boolean {
  if (tabHistory.length <= 1) return false;
  const thisTab = Tabs[TabID];
  if (!thisTab) return false;
  if (!thisTab?.closable) return false;
  removeFromArray(tabHistory, TabID);
  delete Tabs[TabID];
  if (tabHistory.length > 0) {
    const lastTabID = tabHistory[tabHistory.length - 1];
    const lastTab = Tabs[lastTabID];
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
