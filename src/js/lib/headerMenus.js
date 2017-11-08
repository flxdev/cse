import $ from 'jquery/dist/jquery';
import debounce from './debounce';

export default function header() {
  function headerMenu() {
    var mainCont = $('.header-inner-menu-mainnav'),
      items = mainCont.find('.js-mainnav'),
      targetWrap = $('.js-mainnav-cont'),
      bg = $('.header-bg'),
      shown = 'is-shown',
      current = 'is-current';

    items.each(function() {
      var _ = $(this),
        id = parseInt(_.data('block'));

      _.on('mouseenter touchstart',debounce(activeBlock));

      function activeBlock() {
      	// window.DOM.html.addClass('menu-open')
        if(targetWrap.find('[data-block='+ id +']').length) {
          bg.addClass('visible');
          _.addClass('hovered').siblings().removeClass('hovered');
          targetWrap.addClass(shown);
          targetWrap.find('[data-block='+ id +']').addClass(current).siblings().removeClass(current);
        }else{
          targetWrap.removeClass(shown);
          items.removeClass('hovered');
          bg.removeClass('visible');
        }
      }

    });
    mainCont.add(targetWrap).on('mouseleave',function() {
      setTimeout(function() {
        if ($('.js-mainnav-cont:hover').length !== 1 && !$('.header-inner-menu-mainnav:hover').length !== 0 ) {
          targetWrap.removeClass(shown);
          items.removeClass('hovered');
          bg.removeClass('visible');
        }
      },1);

    });
  }
  headerMenu();
  function scrollHeader() {

    var mainHeader = window.DOM.header;
		
    var scrolling = false,
      previousTop = 0,
      currentTop = 0,
      scrollDelta = 10,
      scrollOffset = 250;

    $(window).on('scroll', function() {
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
      }
    });

    function autoHideHeader() {
      currentTop = $(window).scrollTop();

      checkSimpleNavigation(currentTop);

      previousTop = currentTop;
      scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
      if (previousTop - currentTop > scrollDelta) {
        mainHeader.removeClass('is-hidden');
      } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
        mainHeader.addClass('is-hidden');
      }
    }
  }
  scrollHeader();
}
