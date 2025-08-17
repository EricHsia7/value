import { documentQuerySelector } from '../../../lib/selector/index';
import { Symbol } from '../../../lib/symbol/index';

const editorPage = documentQuerySelector('.css_editor_page');

export function showEditorPage(SymbolID: Symbol['id']): void {
  editorPage.setAttribute('displayed', 'true');
}

export function hideEditorPage(): void {
  editorPage.setAttribute('displayed', 'false');
}
