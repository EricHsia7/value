import { documentQuerySelector } from '../../../lib/selector/index';

const homePage = documentQuerySelector('.css_home_page');

export function showHomePage(): void {
  homePage.setAttribute('displayed', 'true');
}

export function hideHomePage(): void {
  homePage.setAttribute('displayed', 'false');
}
