const model = require('../model/notesModel');
function NotesService(){

}

NotesService.prototype.createNotesService = (title,description,email,password,callback) => {
  model.createNotesModel(title,description,email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

NotesService.prototype.getNotesService = (callback) => {
  model.getNotesModel((err,result) => {
    if(err){
       callback(err);
   }else {
     callback(null,result);
   }
 });
};

NotesService.prototype.deleteNoteService = (id,callback) => {
  model.deleteNoteModel(id,(err,result) => {
    if(err){
       callback(err);
   }else {
     callback(null,result);
   }
 });
}

NotesService.prototype.updateNoteService = (id,title,callback) => {
  model.updateNoteModel(id,title,(err,result) =>  {
    if(err){
       callback(err);
   }else {
     callback(null,result);
   }
 });
}

module.exports = new NotesService();
