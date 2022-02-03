const textArea = document.getElementById('textarea')
const editor = SUNEDITOR.create((textArea),{
  lang: SUNEDITOR_LANG['en'],
  buttonList: [
    ['undo', 'redo'],
    ['font', 'fontSize', 'formatBlock'],
    ['paragraphStyle', 'blockquote'],
    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
    ['fontColor', 'hiliteColor', 'textStyle'],
    ['removeFormat'],
    '/', // Line break
    ['outdent', 'indent'],
    ['align', 'horizontalRule', 'list', 'lineHeight'],
    ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
    ['fullScreen', 'showBlocks', 'codeView'],
  ],
  imageFileInput  : false,

});


console.log('contents', editor.getContents())

const saveBtn = document.getElementById('task-save');

saveBtn.addEventListener('click', ()=>{
  textArea.value = editor.getContents()
})
