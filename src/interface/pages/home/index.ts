import { documentQuerySelector, elementQuerySelector } from '../../../lib/selector/index';

export const HomePage = documentQuerySelector('.css_home_page');
export const HomePageBodyElement = elementQuerySelector(HomePage, '.css_home_page_body');

function updateHomePage(): void {}

export function showHomePage(): void {
  HomePage.setAttribute('displayed', 'true');
  updateHomePage();
}

export function hideHomePage(): void {
  HomePage.setAttribute('displayed', 'false');
}
