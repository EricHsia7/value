import { documentQuerySelector } from '../../../lib/selector/index';
import { Symbol } from '../../../lib/symbol/index';

const editSymbolPage = documentQuerySelector('.css_edit_variable_page');

export function showEditVariablePage(SymbolID: Symbol['id']): void {
  editSymbolPage.setAttribute('displayed', 'true');
}

export function hideEditVariablePage(): void {
  editSymbolPage.setAttribute('displayed', 'false');
}
