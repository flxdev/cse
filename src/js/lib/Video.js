import $ from 'jquery/dist/jquery';
import debounce from './debounce';
import isMobile from './ismobile';

export default function Video() {
  let vieoCont = $('.video-bg');
  if(vieoCont.length) {
    let homepage = $('.homepage-hero-module'),
      videoinner = homepage.find('.video-container'),
      video = videoinner.find('video'),
      parent  = $('.page__wrapper'),
      animatedEl = homepage.find('.video-cover'),
      scrollbtn = $('.full-height-scroller'),
      src = video.data('src');
    if(!isMobile()) {
      video[0].src = src;
      video[0].load = function() {
        video.addClass('fadeIn animated');
      };
      video[0].load();
      // $(window).on('resize', debounce(initsize));
    }
    
    parent.addClass('has-fullvideo');
    animateBg();

    function animateBg() {
      let wh = $(window).height();
      let area = wh;
      let scrollTop;
      let calc;
      let calcReverse;

      scrollbtn.on('click',() => {
        $('html:not(:animated), body:not(:animated), .out:not(:animated)').animate({scrollTop: wh}, 500);
      });
      $(window).on('resize',debounce(function() {
        wh = $(window).height();
        area = wh;
      }));
      $(window).on('scroll',() => {
        scrollTop = window.pageYOffset || window.scrollTop;
        calc = (scrollTop * 100) / (area / 2) * 0.01;
        calcReverse = 1 - ((scrollTop * 100) / (area / 3) * 0.01);
        animatedEl.css('background-color',`rgba(47, 36, 37, ${calc})`);
        scrollbtn.css('opacity',calcReverse);
      });

    }
  }
}
