let editData = document.getElementById('editData').value
let editDueData = document.getElementById('editDueData').value
const saveBtn = document.getElementById('task-save');

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;   
}


document.getElementById("task-datetime").value = convertUTCDateToLocalDate(new Date()).toISOString().slice(0,16);


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
  value : editData,

});

saveBtn.addEventListener('click', ()=>{
  textArea.value = editor.getContents()
})
