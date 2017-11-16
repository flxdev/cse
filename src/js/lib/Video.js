import $ from 'jquery/dist/jquery';
import debounce from './debounce';
import isMobile from './ismobile';

export default function Video() {
  let vieoCont = $('.video-bg');
  if(vieoCont.length) {
    let homepage = $('.homepage-hero-module'),
      videoinner = homepage.find('.video-container'),
      img = videoinner.find('.poster img'),
      video = videoinner.find('video'),
      parent  = $('.page__wrapper'),
      animatedEl = homepage.find('.video-cover'),
      scrollbtn = $('.full-height-scroller'),
      src = video.data('src');

    function scaleVideoContainer() {

      let height = $(window).height() + 5;
      let unitHeight = parseInt(height) + 'px';
      homepage.css('height',unitHeight);
    }

    function initBannerVideoSize(element) {
      element.data('height', element.height());
      element.data('width', element.width());

      scaleBannerVideoSize(element);

    }

    function scaleBannerVideoSize(element) {

      let windowWidth = $(window).width(),
        windowHeight = $(window).height() + 5,
        videoWidth,
        videoHeight;
        
      let videoAspectRatio = element.data('height')/element.data('width');

      element.width(windowWidth);
      if(windowWidth < 1280) {
        videoHeight = windowHeight;
        videoWidth = videoHeight / videoAspectRatio;
        element.css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
        element.width(videoWidth).height(videoHeight);
      }
    }

    function initsize() {
      scaleVideoContainer();
      initBannerVideoSize(img);
      initBannerVideoSize(video);
    }initsize();
   
    if(!isMobile()) {
      
      video[0].src = src;
      video[0].load = function() {
        video.addClass('fadeIn animated');
        
      };
      video[0].load();
      $(window).on('resize', debounce(initsize));
    }else{
      animatedEl.hide();
    }
    parent.addClass('has-fullvideo');
    animateBg();

    function animateBg() {
      let wh = $(window).height();

      let area = wh;
      let scrollTop;
      let calc;
      let calcReverse;
      $(window).on('resize',debounce(function() {
        wh = $(window).height();
        area = wh;
      }));
      $(window).on('scroll',() => {
        scrollTop = window.pageYOffset || window.scrollTop;
        calc = (scrollTop * 100) / (area / 2) * 0.01;
        calcReverse = 1 - ((scrollTop * 100) / (area / 3) * 0.01);
        animatedEl.css('background-color',`rgba(86, 74, 72, ${calc})`);
        scrollbtn.css('opacity',calcReverse);
      });

    }
  }
}
