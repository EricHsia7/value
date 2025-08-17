import { documentQuerySelector } from '../../../lib/selector/index';

const settingsPage = documentQuerySelector('.css_settings_page');

export function showSettingsPage(): void {
  settingsPage.setAttribute('displayed', 'true');
}

export function hideSettingsPage(): void {
  settingsPage.setAttribute('displayed', 'false');
}
