import { documentQuerySelector, elementQuerySelector } from '../../../lib/selector/index';
import { getSymbol, setSymbolDescription, setSymbolName, Symbol } from '../../../lib/symbol/index';

const EditSymbolPage = documentQuerySelector('.css_edit_symbol_page');
const EditSymbolBodyElement = elementQuerySelector(EditSymbolPage, '.css_edit_symbol_body');
const NamePropertyElement = elementQuerySelector(EditSymbolBodyElement, '.css_edit_symbol_property[property="name"]');
const NamePropertyInputElement = elementQuerySelector(NamePropertyElement, '.css_edit_symbol_property_content input[type="text"]') as HTMLInputElement;
const DescriptionPropertyElement = elementQuerySelector(EditSymbolBodyElement, '.css_edit_symbol_property[property="description"]');
const DescriptionPropertyTextareaElement = elementQuerySelector(DescriptionPropertyElement, '.css_edit_symbol_property_content textarea') as HTMLTextAreaElement;

function updateEditSymbol(SymbolID: Symbol['id']): void {
  const thisSymbol = getSymbol(SymbolID);
  NamePropertyInputElement.value = thisSymbol.name;
  DescriptionPropertyTextareaElement.value = thisSymbol.description;
}

export function showEditSymbolPage(SymbolID: Symbol['id']): void {
  EditSymbolPage.setAttribute('displayed', 'true');
  updateEditSymbol(SymbolID);
}

export async function hideEditSymbolPage(SymbolID: Symbol['id']) {
  EditSymbolPage.setAttribute('displayed', 'false');
  await setSymbolName(SymbolID, NamePropertyInputElement.value);
  await setSymbolDescription(SymbolID, DescriptionPropertyTextareaElement.value);
}
