import { generateIdentifier } from '../../lib/tools/generate-identifier';
import { Page } from '../pages/index';

export interface Tab {
  page: Page;
  name: string;
  closable: boolean;
  parameters: Array<any>;
  id: string;
}

const Tabs: { [TabID: Tab['id']]: Tab } = {};
const TabsIndex: Array<Tab['id']> = [];

export function registerTab(page: Tab['page'], name: Tab['name'], closable: Tab['closable'], parameters: Tab['parameters']): void {
  const TabID = generateIdentifier();
  const object: Tab = {
    page: page,
    name: name,
    closable: closable,
    parameters: parameters,
    id: TabID
  };

  Tabs[TabID] = object;
  TabsIndex.push(TabID);
}

export function initializeTabs(): void {
  registerTab('home', 'Home', false, []);
  registerTab('settings', 'Settings', false, []);
}
