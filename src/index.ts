import { initializeSymbols } from './lib/symbol/index';
import { initializeVariables } from './lib/variable/index';
import { checkAppVersion } from './lib/version/index';
import { initializeTabs } from './interface/tabs-bar/tabs';

import './interface/theme.css';

import './interface/index.css';

import './interface/icons/index.css';

import './interface/tabs-bar/separator.css';
import './interface/tabs-bar/tabs.css';
import './interface/tabs-bar/tab.css';
import './interface/tabs-bar/menu.css';

import './interface/pages/home/page.css';
import './interface/pages/home/body.css';
import './interface/pages/home/symbols/index.css';

import './interface/pages/search/page.css';

import './interface/pages/settings/page.css';

import './interface/pages/editor/page.css';

window.value = {
  initialize: async function () {
    const status = await checkAppVersion();
    if (status === 'ok') {
      initializeTabs();
      await initializeVariables();
      await initializeSymbols();
    }
  },
  secondlyInitialize: function () {}
};

export default window.value;
