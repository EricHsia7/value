import { initializeSymbols } from './lib/symbol/index';
import { initializeVariables } from './lib/variable/index';
import { checkAppVersion } from './lib/version/index';
import { initializeTabs } from './interface/tabs/index';

import './interface/theme.css';

import './interface/index.css';

import './interface/icons/index.css';

import './interface/tabs/tabs.css';
import './interface/tabs/tab.css';

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
