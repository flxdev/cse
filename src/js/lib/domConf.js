import $ from 'jquery/dist/jquery';

window.DOM = {
  body: $('body'),
  html: $('html'),
  docLang: $('html').data('lang'),
  header: $('.page__header--wrap'),
  __prevScrollTop: 0,
  hideScroll: function() {
    // let top = $(window).scrollTop();
    this.__prevScrollTop = $(window).scrollTop();
    this.body[0].style.top = -this.__prevScrollTop + 'px';
    window.scroll(0, this.__prevScrollTop);
    this.body.addClass('modal_open');
    $('.js-stick').trigger('sticky_kit:recalc');
  },
  showScroll: function() {
  	this.body.removeClass('modal_open');
    this.__prevScrollTop && (window.scroll(0, this.__prevScrollTop));
    this.__prevScrollTop = null;
    $('.js-stick').trigger('sticky_kit:recalc');
  },
  addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
  },
  arnextcontent: '<button type="button" class="slick-next slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#arrow_gallery" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
  arnprevcontent: '<button type="button" class="slick-prev slick-arrow"><div class="icon"><svg class="icon icon-drop"><use xlink:href="#arrow_gallery" xmlns:xlink="http://www.w3.org/1999/xlink"></use></svg></div></button>',
};
