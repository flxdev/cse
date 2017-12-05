import $ from 'jquery/dist/jquery';
import ChangeElementName from './ChangeElementName';

export default function RepeatTels() {
  let trigger = $('.js-repeatBlock-trigger');
  if(trigger.length) {
    const closeBtn = '<div class="small-link"><svg class="icon-closemodal"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#closemodal"></use></svg></div>';
    trigger.each(function() {
  	let _ = $(this);
  	let target = _.parent().find('.js-repeatBlock');
      let hasDateSel = target.hasClass('repeatSelect') ? true : false;
      let repeatLimit = parseInt(target.data('repeatlimit'));
      let count = 1;
    
      target.addClass('handled');
      _.off('click.repeat').on('click.repeat',() => {
    	if(repeatLimit > count -1) {
    		let clonedTarget = target.clone();
		  	let inputs = clonedTarget[0].querySelectorAll('input');
          let label = clonedTarget[0].querySelectorAll('label');  
          let select = clonedTarget[0].querySelectorAll('select');  
		  	let toggle = clonedTarget[0].querySelectorAll('.js-toggleText');	 
		  	inputs.forEach((item) => {
		  		item.value = '';
		  		item.classList.remove('valid');
		  		item.classList.remove('error');
		  	});
          $(toggle).toggleText();
          ChangeElementName(inputs,'name',count);
          ChangeElementName(inputs,'id',count);
		  	
          ChangeElementName(label,'for',count);
	  		   ChangeElementName(select,'name',count);
          ChangeElementName(select,'id',count);
	  		clonedTarget.removeClass('handled').append(closeBtn);
	  		target.nextAll('.js-repeatBlock').find('.small-link').remove();
	  		target.parent().find('.js-repeatBlock').last().after(clonedTarget);
	  		window.DOM.MaxLength();
          if(hasDateSel) {
            console.log();
            window.DOM.SimpleSelects();
            window.DOM.datepick();
          }
	  		clonedTarget.validate();
	  		++count;
    	}
    	checkForLimit();
  	});

  	function checkForLimit() {
  		if(repeatLimit > count -1) {
        	_.show();
  		}else{
        	_.hide();
  		}
  	}

  	let targetParent =target.parent();

  	targetParent.on('click','.icon-closemodal',function() {
  		let trgt = $(this).closest('.js-repeatBlock');
  		trgt.prev().not('.handled').append(closeBtn);
  		trgt.remove();
  		--count;
  		checkForLimit();
  	});
    });
  }
}
// RepeatTels.prototype ={
//   init(item) {
//     let target = item.parent().find('.js-repeatBlock');
//     let repeatLimit = parseInt(target.data('repeatlimit'));
//     let count = 0;
//     target.first().removeClass('handled').addClass('handled');
//     this.initEvents(item,target,repeatLimit);
//   },
//   initEvents(item,target,repeatLimit){
//   	item.off('click.repeat').on('click.repeat',()=>){
//   		this.addNewBlock(item,target,repeatLimit);
//   	}
//   },
//   addNewBlock(item,target,repeatLimit){
//   	let clonedTarget = target.clone();
//   	let inputs = clonedTarget[0].querySelectorAll('input');
//   	let label = clonedTarget[0].querySelectorAll('label');

//   },
//   checkForLimit(item,target,repeatLimit){
//   	if(item.parent().find('.js-repeatBlock:not(.handled)').length >= repeatLimit){
//   		item.hide();
//   	}else{
//   		item.show();
//   	}
//   }
// };
