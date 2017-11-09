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
function Tooltipshow() {
 	let inputWrap = $('.js-tooltip');
 	inputWrap.each(function() {
 		let _ = $(this),
 			trigger = _.find('.js-tooltip-trigger');
 		trigger.focus( () => {
 			_.addClass('active');
 		}).on('input blur',() => {
 			_.removeClass('active');
 		});
 	});

}
function growSerch() {
 	let inputWrap = $('.js-growSearch');
 	inputWrap.each(function() {
 		let _ = $(this);
 		let parent = _.closest('.header-inner-top-search');
 		_.focus( () => {
 			parent.addClass('search-focus');
 		}).on('blur',() => {
 			parent.removeClass('search-focus');
 		});
 	});

}
function mouseHover() {
  let triggers = $('.js-mousehover');
  triggers.each(function() {
    let _ = $(this);
    _.on('mouseenter touchstart',() => {
      _.addClass('hovered');
    }).on('mouseleave blur',() => {
      _.removeClass('hovered');
    });
  });
  $(window).on('scroll', () => {
    triggers.removeClass('hovered');
  });
}
ready(() => {
  datepick();
  validateLength();
  select();
  validateForms();
  header();
  Tooltipshow();
  mouseHover();
  growSerch();
});



