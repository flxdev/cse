import $ from 'jquery/dist/jquery';
import 'sumoselect';

export default function select() {
  window.DOM.SimpleSelects = () => {
    let simpleSelect = $('.js-select');
    simpleSelect.each(function() {
      let _ = $(this);
      if(_.hasClass('SumoUnder') && _[0].sumo === undefined) {
        _.nextAll('.CaptionCont').remove();
        _.nextAll('.optWrapper').remove();
        // _.unwrap();
        initSelect(_);
        // return;
      }else{
        initSelect(_);
      }
      function initSelect(item) {
        item.SumoSelect({
          triggerChangeCombined : false,
        });
        // item.off('change').on('change',() => {
        //   setTimeout(() => {
        //     item.validate();
        //     return;   
        //   },500);

        // });
        item.off('sumo:opened').on('sumo:opened',() => {
          item.closest('.input-wrapper').addClass('is-open');
        });
        item.off('sumo:closed').on('sumo:closed',() => {
          item.closest('.input-wrapper').removeClass('is-open');
        }); 
      }
    });
  };
  window.DOM.SimpleSelects();
  // simpleSelects();

  function filterSelect() {
    let select = $('.js-filter');
    select.each(function() {
      let _ = $(this);
      _.SumoSelect({
        search: _.hasClass('has-search') ? true : false,
        locale: window.DOM.docLang === 'ru' ? ['Применить','Отмена','Выбрать все'] : ['OK', 'Cancel', 'Select All'],
        noMatch: window.DOM.docLang === 'ru' ? 'Ничего не найдено' : 'No matches for "{0}"',
        okCancelInMulti: true,
        placeholder: _.attr('plceholder'),
        searchText: window.DOM.docLang === 'ru' ? 'Поиск' : 'Search',
        captionFormat: window.DOM.docLang === 'ru' ? '{0} Выбрано' : '{0} Selected', 
        captionFormatAllSelected: window.DOM.docLang === 'ru' ? '{0} Выбрано' : '{0} Selected',
      });
      let opts = _.find('option');
      opts.each(function() {
      	let option = $(this);
      	let text = option.data('text');
      	let ind = option.index();
      	let item = _.parent().find('.opt').eq(ind);
      	item.attr('data-text',text);
      });
    });
    select.on('sumo:opened',() => {
      select.closest('.input-wrapper').addClass('is-open');

    });
    select.on('sumo:closed',() => {
      select.closest('.input-wrapper').removeClass('is-open');
    });
  }
  filterSelect();

  //   function ajaxSelect() {
  //     let select = $('.js-ajaxselect');
  //     select.each(function() {
  //       let _ = $(this);
  //       let sourse = _.data('url');
  //       _.select2({
  //         ajax: {
  //           url: sourse,
  //           dataType: 'json'
  //         }
  //       });
  //     });
  //   }
  //   ajaxSelect();
  function dropDownInput() {
    const inp = $('.js-input-dropdown');
    inp.each(function() {
      let _ = $(this);
      let target = _.parent().find('.js-input-dropdown-target');
      _.on('input',() => {
        let val = _[0].value.length;
        if(val > 2) {
          _.addClass('active');
          
        }else{
          _.removeClass('active');
        }
      });
      target.on('click','.option',(e) => {
        var text = $(e.target).find('span').text();
        $(e.target).addClass('active').siblings().removeClass('active');
        _.val(text).removeClass('active');

      });
    });
  }
  dropDownInput();

  function swapValues() {
    const swapTrigger = $('.js-swap');
    swapTrigger.each(function() {
      let _ = $(this);

      if(!_.hasClass('swap-multi')) {
        let parent = _.closest('.input-row');
        let targets = parent.find('.js-swap-item');
        if(targets.length === 2) {
          _.on('click',() => {
            let val1 = targets[0].value;
            let val2 = targets[1].value;
            targets[0].value = val2;
            targets[1].value = val1;
            targets.validate();
          }); 
        }
      }else{
        let parent = _.closest('.border-block');
        let targets = parent.find('.js-swap-item');
        if(targets.length === 4) {
          _.on('click',() => {
            let val1 = targets[0].value;
            let val2 = targets[1].value;
            let val3 = targets[2].value;
            let val4 = targets[3].value;
            targets[0].value = val3;
            targets[1].value = val4;
            targets[2].value = val1;
            targets[3].value = val2; 
            targets.validate();  
          });
        }
      }
    });
  }
  swapValues();
}
