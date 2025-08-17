import { documentQuerySelector, elementQuerySelector } from '../../../lib/selector/index';
import { updateHomePageSymbols } from './symbols/index';

const HomePage = documentQuerySelector('.css_home_page');
const HomePageBodyElement = elementQuerySelector(HomePage, '.css_home_page_body');

function updateHomePage(): void {
  updateHomePageSymbols();
}

export function showHomePage(): void {
  HomePage.setAttribute('displayed', 'true');
  updateHomePage();
}

export function hideHomePage(): void {
  HomePage.setAttribute('displayed', 'false');
}
