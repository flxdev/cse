import $ from 'jquery/dist/jquery';
import Accordeon from './Accordeon';

export default function CalcForm() {
  this.submitBtn =$('.js-CalcForm-submit');
  this.form = $('.js-CalcForm');
  this.componentsContainer = $('.js-CalcForm-components');
  this.subwrapper = this.form.find('.form-block-subwrapper');
  this.targetElems = this.componentsContainer.find('[data-display-target]');
  this.resultObject={};
  this.triggers;
  if(this.form.length) {
    this.initState();
  }
}
CalcForm.prototype ={
  initState: function() {
    this.triggers = this.form.find('[data-display-if-trigger]');
    this.initTypeChange();
  },
  // updateTriggers: function() {
  // 	this.newTriggers = this.form.find('[data-display-if-trigger]');
  // 	console.log(this.newTriggers);
  // },
  initTypeChange() {
  	const self = this;
  	setTimeout(() => {


	  	this.triggers.each(function() {
	  		let _ = $(this);
	  		
		  		let name = _.attr('name');
		  		let type = _.attr('type') || _[0].nodeName.toLowerCase();
		  		let statement = _.data('display-if-trigger');
		  		self.InitTriggerChange(_,name,type,statement);

	  	});
  	},100);
  },
  InitTriggerChange(item,name,type,statement) {
  	switch (type) {
      case 'radio':
	  	item.off('change').on('change',() => {

	  		let targetItems = this.targetElems.filter(`[data-display-target="${name}"]`);
	  		let targetItem = targetItems.filter(`[data-display-if="${statement}"]`);

	  		if(targetItem.length) {
	  			this.subwrapper.empty();
	  			this.ChangeBlockState(targetItem,name);
	  		}
	  	});
        break;
      case 'select' :

  		item.off('change').on('change',() => {
          this.getSelectVal(item,name,type,statement);
        });
        if(!item.hasClass('handled')) {
      		item.trigger('change');
      		item.addClass('handled');
      	}
        break;
      case 'number':
      	if(item.hasClass('placesChanger')) {
      		this.getMultiplePkgs(item,name,type,statement);
      	}
      	break;
    }

  },
  // калькуляторы размеров для блоков

  initSmallCalcEvents() {
  	const self = this;
  	let calcCont = this.form.find('.js-calculation-reset-cont');
  	calcCont.each(function() {
  		let _ = $(this);
  		let reset = _.find('.js-calculation-reset');
  		let formula = _.data('formula');

  		let inputs = _.find('input');
  		let result = _.find('.js-CalcForm-result');
  		self.DoCalculation(_,reset,window.formArray[formula],inputs,result);

  	});
  },
  DoCalculation(_,reset,formula,inputs,result) {
  	let resultSize = 0;
  	console.log(formula);
  	inputs.each(function() {
  		let _ = $(this);
  		let name = _.attr('name');
  	});

  },
  getSelectVal(item,name,type,statement) {
 	let val = item.val();
 	let targetItems = this.targetElems.filter(`[data-display-target="${name}"]`);
    let targetItem = targetItems.filter(`[data-display-if="${val}"]`);
    if(targetItem.length) {
      this.ChangeBlockState(targetItem,name);
      this.CheckVolumetricSize(item);
    }
  },

  getMultiplePkgs(item,name,type,statement) {
  	item.on('blur',() => {
  		let val = item.val();
  		// if(val)
  	});
  },
  ChangeBlockState(targetItem,name) {
  	let targetBlock = this.form.find(`[data-display-if-container="${name}"]`);
  	targetBlock.empty();
  	targetItem.clone().appendTo(targetBlock);
  	this.initSmallCalcEvents();
  	this.updateEvents();
  },
  updateEvents() {
  	setTimeout(() => {
  		Accordeon();
  	  	window.DOM.SimpleSelects();
  		window.DOM.MaxLength();	
  	},10);
  	this.initState();
  }
};
