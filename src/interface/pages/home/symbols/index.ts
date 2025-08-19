import { documentQuerySelector, elementQuerySelector, elementQuerySelectorAll } from '../../../../lib/selector/index';
import { EvaluatedSymbol, listEvaluatedSymbols } from '../../../../lib/symbol/index';
import { getIconHTML } from '../../../icons/index';
import { openTab, registerTab } from '../../../tabs-bar/tabs';

const HomePage = documentQuerySelector('.css_home_page');
const HomePageBodyElement = elementQuerySelector(HomePage, '.css_home_page_body');
const HomePageSymbolsElement = elementQuerySelector(HomePageBodyElement, '.css_home_page_symbols');

let previousEvaluatedSymbolsList: Array<EvaluatedSymbol> = [];

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
  function updateHomePageSymbol(thisSymbolElement: HTMLElement, currentEvaluatedSymbol: EvaluatedSymbol, previousEvaluatedSymbol: EvaluatedSymbol | undefined): void {
    function updateIcon(thisSymbolElement: HTMLElement, currentEvaluatedSymbol: EvaluatedSymbol) {
      const iconElement = elementQuerySelector(thisSymbolElement, '.css_home_page_symbol_icon');
      iconElement.innerHTML = getIconHTML(currentEvaluatedSymbol.icon);
    }

    function updateName(thisSymbolElement: HTMLElement, currentEvaluatedSymbol: EvaluatedSymbol) {
      const nameElement = elementQuerySelector(thisSymbolElement, '.css_home_page_symbol_name');
      nameElement.innerText = currentEvaluatedSymbol.name;
    }

    function updateValue(thisSymbolElement: HTMLElement, currentEvaluatedSymbol: EvaluatedSymbol) {
      const valueElement = elementQuerySelector(thisSymbolElement, '.css_home_page_symbol_value');
      valueElement.innerText = currentEvaluatedSymbol.value;
    }

    function updateOpen(thisSymbolElement: HTMLElement, currentEvaluatedSymbol: EvaluatedSymbol) {
      thisSymbolElement.onclick = function () {
        const TabID = registerTab('editSymbol', currentEvaluatedSymbol.name, 'edit', true, true, [currentEvaluatedSymbol.id]);
        openTab(TabID);
      };
    }

    if (previousEvaluatedSymbol !== undefined) {
      if (currentEvaluatedSymbol.icon !== previousEvaluatedSymbol.icon) {
        updateIcon(thisSymbolElement, currentEvaluatedSymbol);
      }
      if (currentEvaluatedSymbol.name !== previousEvaluatedSymbol.name) {
        updateName(thisSymbolElement, currentEvaluatedSymbol);
      }
      if (currentEvaluatedSymbol.value !== previousEvaluatedSymbol.value) {
        updateValue(thisSymbolElement, currentEvaluatedSymbol);
      }
      if (currentEvaluatedSymbol.id !== previousEvaluatedSymbol.id || currentEvaluatedSymbol.name !== previousEvaluatedSymbol.name) {
        updateOpen(thisSymbolElement, currentEvaluatedSymbol);
      }
    } else {
      updateIcon(thisSymbolElement, currentEvaluatedSymbol);
      updateName(thisSymbolElement, currentEvaluatedSymbol);
      updateValue(thisSymbolElement, currentEvaluatedSymbol);
      updateOpen(thisSymbolElement, currentEvaluatedSymbol);
    }
  }

  const symbolElements = Array.from(elementQuerySelectorAll(HomePageSymbolsElement, '.css_home_page_symbol'));
  const symbolElementsLength = symbolElements.length;
  const evaluatedSymbolsList = listEvaluatedSymbols();
  const evaluatedSymbolsListLength = evaluatedSymbolsList.length;
  if (evaluatedSymbolsListLength >= symbolElementsLength) {
    const fragment = new DocumentFragment();
    for (let i = symbolElementsLength; i < evaluatedSymbolsListLength; i++) {
      const newSymbolElement = generateSymbolElement();
      fragment.appendChild(newSymbolElement);
      symbolElements.push(newSymbolElement);
    }
    HomePageSymbolsElement.append(fragment);
  } else {
    for (let j = symbolElementsLength - 1; j >= evaluatedSymbolsListLength; j--) {
      symbolElements[j].remove();
    }
  }

  for (let k = 0; k < evaluatedSymbolsListLength; k++) {
    const previousEvaluatedSymbol = previousEvaluatedSymbolsList[k];
    const currentEvaluatedSymbol = evaluatedSymbolsList[k];
    const thisSymbolElement = symbolElements[k];
    updateHomePageSymbol(thisSymbolElement, currentEvaluatedSymbol, previousEvaluatedSymbol);
  }

  previousEvaluatedSymbolsList = evaluatedSymbolsList;
}
