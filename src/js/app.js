// import hello from './lib/sayHello';
// import $ from 'jquery';
// import $ from 'jquery/dist/jquery.min';
import './lib/domConf';
import datepick from './lib/datepicker';
import validateForms from './lib/jqValidator';
import validateLength from './lib/lengthValidation';
import select from './lib/selects';
import header from './lib/headerMenus';

// replacement for domcontentloaded event
function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(() => {
  datepick();
  validateLength();
  select();
  validateForms();
  header();
});



