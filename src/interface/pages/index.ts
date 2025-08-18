import { createSymbol } from '../../lib/symbol/index';
import { TabsBarMenuItemArray } from '../tabs-bar/menu';
import { openTab, registerTab } from '../tabs-bar/tabs';
import { hideEditSymbolPage, showEditSymbolPage } from './edit-symbol/index';
import { hideEditVariablePage, showEditVariablePage } from './edit-variable/index';
import { hideHomePage, showHomePage } from './home/index';
import { hideSearchPage, showSearchPage } from './search/index';
import { hideSettingsPage, showSettingsPage } from './settings/index';

export type HomePage = 'home';
export type SearchPage = 'search';
export type SettingsPage = 'settings';
export type EditSymbolPage = 'editSymbol';
export type EditVariablePage = 'editVariable';
export type Page = HomePage | SearchPage | SettingsPage | EditSymbolPage | EditVariablePage;

export const showPage: { [page: Page]: Function } = {
  home: showHomePage,
  search: showSearchPage,
  settings: showSettingsPage,
  editSymbol: showEditSymbolPage,
  editVariable: showEditVariablePage
};

export const hidePage: { [page: Page]: Function } = {
  home: hideHomePage,
  search: hideSearchPage,
  settings: hideSettingsPage,
  editSymbol: hideEditSymbolPage,
  editVariable: hideEditVariablePage
};

export const tabsBarMenuItems: { [page: Page]: TabsBarMenuItemArray } = {
  home: [
    {
      key: 'home--new-symbol',
      name: 'New Symbol',
      icon: 'add',
      action: async function () {
        const SymbolID = await createSymbol();
        const TabID = registerTab('editSymbol', 'Edit Symbol', 'edit', false, true, [SymbolID]);
        openTab(TabID);
      }
    },
    {
      key: 'home--search',
      name: 'Search',
      icon: 'search',
      action: function () {
        const TabID = registerTab('search', 'Search', 'search', false, true, []);
        openTab(TabID);
      }
    },
    {
      key: 'home--settings',
      name: 'Settings',
      icon: 'settings',
      action: function () {
        const TabID = registerTab('settings', 'Settings', 'settings', false, true, []);
        openTab(TabID);
      }
    }
  ],
  search: [],
  settings: [],
  editSymbol: [],
  editVariable: []
};
