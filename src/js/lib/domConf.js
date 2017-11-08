import $ from 'jquery/dist/jquery';

window.DOM = {
  body: $('body'),
  html: $('html'),
  docLang: $('html').data('lang'),
  header: $('.page__header--wrap'),
};
