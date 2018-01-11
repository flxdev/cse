import * as Dropzone from 'dropzone'; 

export default function FileInput() {
  $('.js-file').each(function() {
    const _ = $(this);
    _.dropzone({ 
		    url: '/file/post',
		    previewTemplate: '<div class="dz-preview dz-file-preview"><div class="dz-success-mark"><span><svg class="icon-resume"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#attach"></use></svg></span></div><div class="dz-details"><div class="dz-filename"><span data-dz-name></span><div class="dz-size" data-dz-size></div></div></div><div class="dz-error-message"><span data-dz-errormessage></span></div></div>',
		    dictDefaultMessage: 'Прикрепить резюме',
		    dictFileTooBig : 'Вы превысили допустимый размер файла. Загрузите файл с меньшим размером.',
		    dictResponseError : 'Сервер ответил с ошибкой',
		    dictInvalidFileType: 'Неверный тип файла',
		    maxFilesize: '10',
		    maxFiles: '1',
		    acceptedFiles: _.hasClass('image')? '.jpg,.png,.webp' : '.doc,.docx,.pdf',
		    autoDiscover:false,
		    addRemoveLinks :true
		  });
  });
};
