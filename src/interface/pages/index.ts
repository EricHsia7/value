import { TabsBarMenuItemArray } from '../tabs-bar/menu';
import { hideEditorPage, showEditorPage } from './editor/index';
import { hideHomePage, showHomePage } from './home/index';
import { hideSearchPage, showSearchPage } from './search/index';
import { hideSettingsPage, showSettingsPage } from './settings/index';

export type HomePage = 'home';
export type SearchPage = 'search';
export type SettingsPage = 'settings';
export type EditorPage = 'editor';
export type Page = HomePage | SearchPage | SettingsPage | EditorPage;

export const showPage: { [page: Page]: Function } = {
  home: showHomePage,
  search: showSearchPage,
  settings: showSettingsPage,
  editor: showEditorPage
};

export const hidePage: { [page: Page]: Function } = {
  home: hideHomePage,
  search: hideSearchPage,
  settings: hideSettingsPage,
  editor: hideEditorPage
};

export const tabsBarMenuItems: { [page: Page]: TabsBarMenuItemArray } = {
  home: [
    {
      key: 'home--new-symbol',
      name: 'New Symbol',
      icon: 'add',
      action: function () {
        console.log('new symbol');
      }
    }
  ],
  search: [],
  settings: [],
  editor: []
};
