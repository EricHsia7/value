import { elementQuerySelector } from '../../../../lib/selector/index';
import { HomePageBodyElement } from '../index';

const HomePageSymbolsElement = elementQuerySelector(HomePageBodyElement, '.css_home_page_symbols');

function generateSymbolElement(): HTMLElement {
  const newSymbolElement = document.createElement('div');
  newSymbolElement.classList.add('css_home_page_symbol');

  const newIconElement = document.createElement('div');
  newIconElement.classList.add('css_home_page_symbol_icon');
  newSymbolElement.appendChild(newIconElement);

  const newNameElement = document.createElement('div');
  newNameElement.classList.add('css_home_page_symbol_name');
  newSymbolElement.appendChild(newNameElement);

  const newValueElement = document.createElement('div');
  newValueElement.classList.add('css_home_page_symbol_value');
  newSymbolElement.appendChild(newValueElement);

  return newSymbolElement;
}

export function updateHomePageSymbols(): void {
function updateHomePageSymbol(thisSymbolElement: HTMLElement, thisSymbol) {

}

    const tabElements = Array.from(elementQuerySelectorAll(tabsElement, '.css_tab'));
    const tabElementsLength = tabElements.length;
    const TabsList = listTabs();
    const TabsListLength = TabsList.length;
    if (TabsListLength >= tabElementsLength) {
      const fragment = new DocumentFragment();
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
