import { documentQuerySelector } from '../../../lib/selector/index';
import { Symbol } from '../../../lib/symbol/index';

const editSymbolPage = documentQuerySelector('.css_edit_symbol_page');

export function showEditSymbolPage(SymbolID: Symbol['id']): void {
  editSymbolPage.setAttribute('displayed', 'true');
}

export function hideEditSymbolPage(): void {
  editSymbolPage.setAttribute('displayed', 'false');
}
