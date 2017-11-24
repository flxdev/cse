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
    this.submitBtn.off('click').on('click',() => {
    	this.checkForNextStep();
    });
  },
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
  InitTriggerChange: function(item,name,type,statement) {
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

        // чтобы не получить луп евента и не переполнить стэк вызовов
        if(!item.hasClass('handled')) {
      		item.trigger('change');
      		item.addClass('handled');
      	}

        break;
      case 'number':

      	// инпут количества мест
      	if(item.hasClass('placesChanger')) {
      		this.getMultiplePkgs(item,name,type,statement);
      	}

      	break;
    }

  },
  // методы клаькуляторов
  // в html лежит var formObj, в котором представлены варианты формул. и инпуты к ним
  // порядок инпутов важен. как они оеждат в html так и будут подставляться в формулу
  initSmallCalcEvents: function() {
  	const self = this;
  	let calcCont = this.form.find('.js-calculation-reset-cont');

  	calcCont.filter(function() {
  		let _ = $(this);
  		let reset = _.find('.js-calculation-reset');
  		let formula = _.data('formula');
  		let inputs = _.find('input');
  		let result = _.find('.js-CalcForm-result');
  		self.DoCalculation(_,reset,formula,inputs,result);
  		self.InitSmallCalcFormReset(_,reset,inputs,result);

  	});
  },
  // обработка кнопки сброса расчета
  InitSmallCalcFormReset(_,reset,inputs,result) {
  	reset.off('click').on('click',() => {;
  		inputs.val('').removeClass('valid').parent().removeClass('has-success');
  		result.text('0');
  		this.VolumeWeight.val('').parent().removeClass('disabled');
  		reset.closest('.accordeon-wrapper:not(.block-yellow)').find('.js-accordeon-trigger').trigger('click');
  	});
  },

  // расчет значений на основании data-formula блока
  DoCalculation(_,reset,formula,inputs,result) {
  	const self = this;
  	this.VolumeWeight = this.form.find('#GruzVolumetrikWeight');
  	inputs.each(function() {
  		let _ = $(this);
  		let index = _.attr('name');
  		_.on('input',() => {
  			self.VolumeWeight.parent().addClass('disabled');
  		});
  		_.on('blur',() => {
  			let val = _.val();
  			_.validate();

  			if(!isNaN(parseInt(val)) && !_.hasClass('error') && inputs.val().length) {
  				// находим нужную формлу и нужный инпут для вставки
  				formObj[formula].inputs[index] = parseInt(val);
  				//считаем по этой формуле
  				let resultFormula = formObj[formula].formula;
  				//добаляем значения в нужные контейнеры
  				result.text(resultFormula);
  				self.VolumeWeight.val(resultFormula);
  			}else{
  				//если фиаско
  				result.text('0');
  				self.VolumeWeight.val('');
  			}
  		});
  	});
  },
  // обработчки изменения селектов
  getSelectVal(item,name,type,statement) {
 	let val = item.val();
 	let targetItems = this.targetElems.filter(`[data-display-target="${name}"]`);
    let targetItem = targetItems.filter(`[data-display-if="${val}"]`);
    if(targetItem.length) {
      this.ChangeBlockState(targetItem,name);
    }
  },
  // проверяем инпут с количеством мест 
  getMultiplePkgs: function(item,name,type,statement) {
  	let generatedContainer =  this.targetElems.filter('#Accordeon-multiple');
  	if(!item.hasClass('changed')) {
	  	item.on('blur',() => {
	  		let val = item.val();
	  		if(parseInt(val) > 1) {
	  			this.generateMultiBlocks(val,generatedContainer,name);
	  			item.addClass('changed');
	  		}
	  	});
  	}else{
  		item.on('blur',() => {
  			let val = item.val();
  			if(parseInt(val) === '' || parseInt(val) === 1 ) {
  				this.returnSingeType(item,val,generatedContainer,name);
  				item.removeClass('changed');
  			}
  		});
  	}
  },

  generateMultiBlocks: function(val,generatedContainer,name) {
  	// очищаем субконтейреры и клонируем селект
  	// к остальным копонентам, чтобы потмо его забрать
  	this.subwrapper.empty();
  	this.mainTypeSelect = this.form.find('.form-block-mainwrapper').find('.js-select').closest('.input-item');
  	this.mainTypeSelect.detach().appendTo(this.componentsContainer);

  	this.VolumeWeight = this.form.find('#GruzVolumetrikWeight');
  	this.TotalWeight = this.form.find('#GruzTotalWeight');

  	this.VolumeWeight.closest('.input-wrapper').addClass('disabled');
  	this.TotalWeight.closest('.input-wrapper').addClass('disabled');

  	// заменить на сгенерированные блоки
  	this.ChangeBlockState(generatedContainer,name);
  },
  returnSingeType: function(item,val,generatedContainer,name) {
  	 this.subwrapper.empty();
  	let parent = item.closest('.input-item');
  	let select = this.componentsContainer.children('.input-item').detach();
    parent.after(select);
    this.componentsContainer.children('.input-item').remove();
    this.VolumeWeight.closest('.input-wrapper').removeClass('disabled');
  	this.TotalWeight.closest('.input-wrapper').removeClass('disabled');
  	parent.parent().find('select').trigger('change');
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
  },
};
