import './interface/theme.css';

import './interface/index.css';

import './interface/icons/index.css';

import './interface/editor/field.css';
import './interface/editor/head.css';
import './interface/editor/body.css';

window.value = {
  initialize: function () {
    console.log('test');
  },
  secondlyInitialize: function () {
    console.log('test2');
  }
};

export default window.value;
