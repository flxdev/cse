// import hello from './lib/sayHello';
import $ from 'jquery/dist/jquery';
// import $ from 'jquery/dist/jquery.min';
import './lib/domConf';
import datepick from './lib/datepicker';
import validateForms from './lib/jqValidator';
import validateLength from './lib/lengthValidation';
import select from './lib/selects';
import header from './lib/headerMenus';
import CitySelect from './lib/CitySelect';
import SearchModal from './lib/SearchModal';
import Modals from './lib/Modals';
import Menu from './lib/MobileMenus';
import Video from './lib/Video';
import lazyImage from './lib/lazyImage';
import Promise from './lib/Promise';
import Sliders from './lib/Sliders';
import YandMap from './lib/YandMap';
import Accord from './lib/Accord';
import Stick from './lib/Stick';
import CalcForm from './lib/CalcForm';
import Accordeon from './lib/Accordeon';
import CalcFormNavigation from './lib/CalcFormNavigation';



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
 			_.addClass('toltip-shown');
 		}).on('input blur',() => {
 			_.removeClass('toltip-shown');
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
  if (!window.Promise) {
    window.Promise = Promise;
  }
  if (!Array.from) {
    Array.from = (function() {
      var toStr = Object.prototype.toString;
      var isCallable = function(fn) {
        return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
      };
      var toInteger = function(value) {
        var number = Number(value);
        if (isNaN(number)) { return 0; }
        if (number === 0 || !isFinite(number)) { return number; }
        return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
      };
      var maxSafeInteger = Math.pow(2, 53) - 1;
      var toLength = function(value) {
        var len = toInteger(value);
        return Math.min(Math.max(len, 0), maxSafeInteger);
      };

      // Свойство length метода from равно 1.
      return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Положим C равным значению this.
        var C = this;

        // 2. Положим items равным ToObject(arrayLike).
        var items = Object(arrayLike);

        // 3. ReturnIfAbrupt(items).
        if (arrayLike == null) {
          throw new TypeError('Array.from requires an array-like object - not null or undefined');
        }

        // 4. Если mapfn равен undefined, положим mapping равным false.
        var mapFn = arguments[1];
        if (typeof mapFn !== 'undefined') {
          mapFn = arguments.length > 1 ? arguments[1] : void undefined;
          // 5. иначе
          // 5. a. Если вызов IsCallable(mapfn) равен false, выкидываем исключение TypeError.
          if (!isCallable(mapFn)) {
            throw new TypeError('Array.from: when provided, the second argument must be a function');
          }

          // 5. b. Если thisArg присутствует, положим T равным thisArg; иначе положим T равным undefined.
          if (arguments.length > 2) {
            T = arguments[2];
          }
        }

        // 10. Положим lenValue равным Get(items, "length").
        // 11. Положим len равным ToLength(lenValue).
        var len = toLength(items.length);

        // 13. Если IsConstructor(C) равен true, то
        // 13. a. Положим A равным результату вызова внутреннего метода [[Construct]]
        //     объекта C со списком аргументов, содержащим единственный элемент len.
        // 14. a. Иначе, положим A равным ArrayCreate(len).
        var A = isCallable(C) ? Object(new C(len)) : new Array(len);

        // 16. Положим k равным 0.
        var k = 0;
        // 17. Пока k < len, будем повторять... (шаги с a по h)
        var kValue;
        while (k < len) {
          kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
          k += 1;
        }
        // 18. Положим putStatus равным Put(A, "length", len, true).
        A.length = len;
        // 20. Вернём A.
        return A;
      };
    }());
  }
  jQuery.fn.toggleText = function() {
    var altText = this.data('alt-text');
    if (altText) {
      this.data('alt-text', this.text());
      this.text(altText);
    }
  };
  datepick();
  validateLength();
  select();
  validateForms();
  header();
  Tooltipshow();
  mouseHover();
  growSerch();
  var City = new CitySelect();
  SearchModal();
  Modals();
  Menu();
  Video();
  lazyImage();
  Sliders();
  var Maps = new YandMap();
  Accord();
  Stick();
  var PackageType = new CalcForm();
  window.CalcNav = new CalcFormNavigation();
  Accordeon();

});



