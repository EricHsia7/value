export type HomePage = 'home';
export type SettingsPage = 'settings';
export type EditorPage = 'editor';
export type Page = HomePage | SettingsPage | EditorPage;

export function getSwitchFunction(page: Page): Function {
  switch (page) {
    case 'home':
      
      break;
    case 'settings':
      break;
    case 'editor':
      break;
    default:
      break;
  }
}
