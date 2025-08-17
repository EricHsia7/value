import { documentQuerySelector, elementQuerySelector } from '../../../lib/selector/index';
import { getSymbol, Symbol } from '../../lib/symbol/index';

const editorPage = documentQuerySelector('.css_editor_page');
const editorHeadElement = elementQuerySelector(editorPage, '.css_editor_head');
const editorHeadButtonLeftElement = elementQuerySelector(editorHeadElement, '.css_editor_head_button_left');

let currentSymbolID: Symbol['id'] = '';

export function showEditorPage(SymbolID: Symbol['id']): void {
  editorPage.setAttribute('displayed', 'true');
}

export function hideEditorPage(): void {
  editorPage.setAttribute('displayed', 'false');
}

async function updateEditorPage(SymbolID: Symbol['id']) {
  const thisSymbolObject = getSymbol(SymbolID);
  if (thisSymbolObject !== undefined) {
  }
}
