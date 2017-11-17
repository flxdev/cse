import $ from 'jquery';
import debounce from './debounce';
import 'slick-carousel/slick/slick.min';

export default function Sliders() {
  function PromoBlocksSmallSlider() {
    $('.js-block-about-slider').each(function() {
      var _this = $(this),
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
}
