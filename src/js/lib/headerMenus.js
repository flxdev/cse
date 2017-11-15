import $ from 'jquery/dist/jquery';
import debounce from './debounce';
import isMobile from './ismobile';

export default function header() {
  function headerMenu() {
    let mainCont = $('.header-inner-menu-mainnav'),
      items = mainCont.find('.js-mainnav'),
      targetWrap = $('.js-mainnav-cont'),
      menuWrapper = $('.header-inner-menu'),
      manuTrigger = $('.js-menu[data-menu="mainmenu"]'),
      bg = window.DOM.header,
      momileCloser = $('.js-menucloseback'),
      shown = 'is-shown',
      current = 'is-current';

    items.each(function() {
      let _ = $(this),
        id = parseInt(_.data('block'));

      !isMobile() ? _.on('mouseenter touchmove',debounce(activeBlock)) : _.on('click',activeBlock);

      function activeBlock() {

      	let filteredBlock = targetWrap.find('[data-block='+ id +']');

        if(filteredBlock.length) {
          bg.addClass('visible');
          _.addClass('hovered').siblings().removeClass('hovered');
          targetWrap.addClass(shown);
          filteredBlock.addClass(current).siblings().removeClass(current);

          if(filteredBlock.find('.header-subnav-content').children().length < 2) {

          	targetWrap.addClass('block-small');

          }else{

          	targetWrap.removeClass('block-small');

          }

        }else{

          targetWrap.removeClass(shown);
          items.removeClass('hovered');
          bg.removeClass('visible');

        }
        targetWrap.trigger('menu_updated');
      }
    });
    function MobileButtonTrigger() {
    	targetWrap.on('menu_updated',() => {
    		if(targetWrap.hasClass('is-shown')) {
    			momileCloser.addClass('back');
    		}else{
          		momileCloser.removeClass('back');
    		}
    	});
    }
    	momileCloser.on('click',() => {
    		if(momileCloser.hasClass('back')) {
          
    			targetWrap.removeClass(shown);
    			momileCloser.removeClass('back');
    			items.removeClass('hovered');
    			
    		}else{
    			menuWrapper.add(manuTrigger).removeClass('active');
    			bg.removeClass('visible');
    			window.DOM.showScroll();
    		}
    	});
    !isMobile() ? mainCont.add(targetWrap).on('mouseleave touchstart',CheckMenuHover) : MobileButtonTrigger(); 

    function CheckMenuHover() {
      setTimeout(function() {
        if ($('.js-mainnav-cont:hover').length !== 1 && !$('.header-inner-menu-mainnav:hover').length !== 0 ) {
          targetWrap.removeClass(shown);
          items.removeClass('hovered');
          bg.removeClass('visible');
        }
      },1);
    };
  }
  headerMenu();
  function scrollHeader() {

    let mainHeader = window.DOM.header;
		
    let scrolling = false,
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
