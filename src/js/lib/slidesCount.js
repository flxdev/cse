
export default function slidesCount(elem) {
  const container = elem.parent().find('.slider-counter'),
    curSlideCont = container.find('.slider-curr'),
    totatSlideCont= container.find('.slider-total');

  elem.on('init reInit breakpoint beforeChange', function(event, slick, currentSlide, nextSlide) {
    let slidesShown = parseInt(slick.slickGetOption('slidesToShow')),
      slidesScroll = parseInt(slick.slickGetOption('slidesToScroll')),
      slidesNext = parseInt(nextSlide),
      totalSlides = parseInt(slick.slideCount),
      totalPages = Math.ceil(totalSlides / slidesShown),
      curPage = event.type === 'init' || event.type === 'reInit' || event.type === 'breakpoint'? 0 : parseInt(slidesNext/slidesScroll);
    totatSlideCont.text(slidesShown === 1 ? totalSlides : totalPages);
    curSlideCont.text(curPage + 1);
  });
}
