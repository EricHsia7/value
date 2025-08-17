import { documentQuerySelector } from '../../../lib/selector/index';

const searchPage = documentQuerySelector('.css_search_page');

export function showSearchPage(): void {
  searchPage.setAttribute('displayed', 'true');
}

export function hideSearchPage(): void {
  searchPage.setAttribute('displayed', 'false');
}
