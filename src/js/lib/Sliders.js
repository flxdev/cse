import $ from 'jquery';
import debounce from './debounce';
import slidesCount from './slidesCount';
import 'slick-carousel/slick/slick.min';

export default function Sliders() {

  function PromoBlocksSmallSlider() {
    $('.js-block-about-slider').each(function() {
      let _this = $(this),
        parent = _this.parent();
      _this.slick({
        accessibility: false,
        arrows: false,
        dots: true,
        fade: false,
        touchMove: false,
        dragable: false,
        infinite: false,
        appendDots: parent.find('.slider-dots'),
        // slidesToShow: 4,
        // slidesToScroll: 1,
        speed: 500,
        rows: 2,
        slidesPerRow:2,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              rows : 2,
              slidesPerRow : 1,
              dots: true,
            },
          },
          {
            breakpoint: 996,
            settings: {
              rows : 2,
              slidesPerRow : 2,
            }
          },
          {
            breakpoint: 640,
            settings: {
              slidesPerRow : 1,
            }
          }
        ]
      }).on('breakpoint', debounce(function(slick) {
        _this.slick('setPosition');
      })
      );
    });
  }PromoBlocksSmallSlider();
  
  function ContentSlider() {
    $('.content-slider-inner').each(function() {
      let _this = $(this),
        parent = _this.parent();
      slidesCount(_this);
      _this.slick({
        accessibility: false,
        arrows: true,
        dots: false,
        fade: false,
        touchMove: false,
        dragable: false,
        infinite: false,
        appendArrows: parent.find('.slider-nav'),
        speed: 600,
        adaptiveHeight: true,
        prevArrow: window.DOM.arnprevcontent,
        nextArrow: window.DOM.arnextcontent,
      });
    });
  }
  ContentSlider();
  function AddSlider() {
    $('.block-constructor-slider-slider').each(function() {
      let _this = $(this),
        parent = _this.parent(),
        w3 = _this.hasClass('w3') ? true : false;

      _this.slick({
        accessibility: false,
        arrows: true,
        dots: false,
        fade: false,
        touchMove: false,
        dragable: false,
        infinite: false,
        slidesToShow:  w3 ? 3 : 2,
        slidesToScroll:  w3 ? 3 : 2,
        appendArrows: parent.find('.slider-nav'),
        speed: 500,
        easing: 'ease-out',
        prevArrow: window.DOM.arnprevcontent,
        nextArrow: window.DOM.arnextcontent,
        responsive: [
          {
            breakpoint: 1040,
            settings: {
              slidesToShow:  2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 740,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]
      });
    });
  }
  AddSlider();
  function ClientSlider() {
    $('.js-clients-clider').each(function() {
      let _this = $(this),
        parent = _this.parent();

      _this.slick({
        accessibility: false,
        arrows: true,
        dots: false,
        fade: false,
        touchMove: false,
        dragable: false,
        infinite: false,
        slidesToShow:  7,
        slidesToScroll:  1,
        appendArrows: parent.find('.slider-nav'),
        speed: 500,
        easing: 'ease-out',
        prevArrow: window.DOM.arnprevcontent,
        nextArrow: window.DOM.arnextcontent,
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow:  6,
            },
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 5,
            },
          },
          {
            breakpoint: 800,
            settings: {
              slidesToShow: 4,
            },
          },
          {
            breakpoint: 640,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 400,
            settings: {
              slidesToShow: 2,
            },
          },
        ]
      });
    });
  }
  ClientSlider();
}
