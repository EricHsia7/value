import { TabsBarMenuItemArray } from '../tabs-bar/menu';
import { hideEditorPage, showEditorPage } from './editor/index';
import { hideHomePage, showHomePage } from './home/index';
import { hideSettingsPage, showSettingsPage } from './settings/index';

export type HomePage = 'home';
export type SettingsPage = 'settings';
export type EditorPage = 'editor';
export type Page = HomePage | SettingsPage | EditorPage;

export const showPage: { [page: Page]: Function } = {
  home: showHomePage,
  settings: showSettingsPage,
  editor: showEditorPage
};

export const hidePage: { [page: Page]: Function } = {
  home: hideHomePage,
  settings: hideSettingsPage,
  editor: hideEditorPage
};

export const tabsBarMenuItems: { [page: Page]: TabsBarMenuItemArray } = {
  home: [
    {
      name: 'New Symbol',
      icon: 'add',
      action: function () {
        console.log('new symbol');
      }
    }
  ],
  settings: [],
  editor: []
};
