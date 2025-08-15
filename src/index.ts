import { initializeSymbols } from './lib/symbol/index';
import { initializeVariables } from './lib/variable/index';
import { checkAppVersion } from './lib/version/index';

import './interface/theme.css';

import './interface/index.css';

import './interface/icons/index.css';

import './interface/editor/field.css';
import './interface/editor/head.css';
import './interface/editor/body.css';

window.value = {
  initialize: function () {
    checkAppVersion().then((status) => {
      if (status === 'ok') {
        initializeVariables().then(function () {
          initializeSymbols();
        });
      }
    });
  },
  secondlyInitialize: function () {
    
  }
};

export default window.value;
