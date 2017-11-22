import $ from 'jquery/dist/jquery';

export default function CalcForm() {
  this.submitBtn =$('.js-CalcForm-submit');
  this.form = $('.js-CalcForm');
  this.componentsContainer = $('.js-CalcForm-components');
  this.resultObject={};
  if(this.form.length) {
    this.initState();
  }
}
CalcForm.prototype ={
  initState: function() {
    console.log('formInited');
  }
};
