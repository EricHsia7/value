import { documentQuerySelector, elementQuerySelector } from '../../lib/selector/index';
import { getSymbol, Symbol } from '../../lib/symbol/index';

const editorField = documentQuerySelector('.css_editor_field');
const editorHeadElement = elementQuerySelector(editorField, '.css_editor_head');
const editorHeadButtonLeftElement = elementQuerySelector(editorHeadElement, '.css_editor_head_button_left');

let currentSymbolID: Symbol['id'] = '';

export function openEditorField(SymbolID: Symbol['id']): void {
  editorField.setAttribute('displayed', 'true');
}

export function closeEditorField(): void {
  editorField.setAttribute('displayed', 'false');
}

async function updateEditorField(SymbolID: Symbol['id']) {
  const thisSymbolObject = getSymbol(SymbolID);
  if (thisSymbolObject !== undefined) {
  }
}
