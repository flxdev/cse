import $ from 'jquery/dist/jquery';
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/selectmenu';

export default function datepick() {
  let dtepick = $('.date');

  dtepick.each(function() {
    let _ = $(this),
      curdate = new Date(),
      hours = curdate.getHours(),
      offset;
    if(hours >= parseInt(window.DOM.html.data('datepickstart-hour'))) {
      offset = 1;
    } else {
      offset = 0;
    }
    _.datepicker({
      changeMonth: true,
      changeYear: true,
      minDate: offset,
      firstDay: 1,
      yearRange: '0:+3',
      dateFormat: 'dd.mm.yy',
      beforeShow: () => {
        setTimeout(function() {
          updateToSelectMenu();
        },0);
      },
      onChangeMonthYear: () => {
        setTimeout(() => {
          updateToSelectMenu();
        },0);
	   },
      onSelect: () => {
      }
    });
    _.datepicker('refresh');
    
  });
  $.datepicker.regional['ru'] = {
    closeText: 'Закрыть',
    prevText: '&#x3c;Пред',
    nextText: 'След&#x3e;',
    currentText: 'Сегодня',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
      'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
    dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
    dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    weekHeader: 'Нед',
    dateFormat: 'dd.mm.yy',
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };

  $.datepicker.regional['en'] = {
    closeText: 'Done',
    prevText: 'Prev',
    nextText: 'Next',
    currentText: 'Today',
    monthNames: ['January','February','March','April','May','June',
      'July','August','September','October','November','December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
    weekHeader: 'Wk',
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  // const lang = window.DomConf.html.data('lang');

  window.DOM.docLang === 'ru' ? $.datepicker.setDefaults($.datepicker.regional['ru']) : $.datepicker.setDefaults($.datepicker.regional['en']);
  
  function updateToSelectMenu() {
    $('.ui-datepicker-title select').selectmenu({
      select: function() {
        $(this).trigger('change');
        updateToSelectMenu();
      }
    });
    $('.ui-datepicker-title').append($('.ui-selectmenu-menu'));
  }  
}





