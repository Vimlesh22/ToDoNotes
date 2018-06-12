/***************************************************************************************
 *  Purpose         : Defines all the Services required for notes application.
 *
 *  @description
 *
 *  @file           : notesService.js
 *  @overview       : Creating services for notes application.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} model class instance of the notesModel.
 */
const model = require('../model/notesModel');
function NotesService(){

}

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method createNotesService() - Create a service for creation of notes.
 */
NotesService.prototype.createNotesService = (title,description,email,password,callback) => {
  model.createNotesModel(title,description,email,password,(err,result) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};
/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method getNotesService() - service method for getting a note.
 */
NotesService.prototype.getNotesService = (callback) => {
  model.getNotesModel((err,result) => {
    if(err){
       callback(err);
   }else {
     callback(null,result);
   }
 });
};
/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method deleteNoteService() - service for deleting a note for particular user.
 */
NotesService.prototype.deleteNoteService = (id,callback) => {
  model.deleteNoteModel(id,(err,result) => {
    if(err){
       callback(err);
   }else {
     callback(null,result);
   }
 });
}
/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method updateNoteService() - service for udpating a note.
 */
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
