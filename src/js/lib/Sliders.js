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
        speed: 300,
        adaptiveHeight: true,
        prevArrow: window.DOM.arnprevcontent,
        nextArrow: window.DOM.arnextcontent,
      });
    });
  }
  ContentSlider();
}
