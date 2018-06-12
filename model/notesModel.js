/***************************************************************************************
 *  Purpose         : Defines a Model for NotesApp .
 *
 *  @description
 *
 *  @file           : notesModel.js
 *  @overview       : Creates a Schema for storing details of Notes.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 *****************************************************************************************/
 /**
 * @description Dependencies require to be installed before the execution of this file.
 * @var {Class} mongoose class instance of the mongoose.
 * @var {Class} config class instance
 */
const mongoose = require('mongoose');
const config = require ('../secret/config');

/**
* @description creating noteSchema for notes
*/
var noteSchema = mongoose.Schema({
  title : { type : String,required : true,unique : true },
  description : { type : String,required : true }
});

var Note = mongoose.model('Notes',noteSchema);

function NoteModel() {

}

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method createNotesModel() - Create a note object and stores notes description in database.
 */
NoteModel.prototype.createNotesModel = function (title,description,callback) {
  var note = new Note({
    title : title,
    description : description,
  });
  note.save()
  .then((result,err) => {
    if(err){
        callback(err);
    }else {
      callback(null,result);
    }
  });
};

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method getNotesModel() - gets all the notes for particular user from database.
 */
NoteModel.prototype.getNotesModel = function (callback) {
  Note.find()
  .then((result,err) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method deleteNoteModel() - delete the note for particular user using id from the database.
 */
NoteModel.prototype.deleteNoteModel = (id,callback) => {
  Note.deleteOne(id).then((result,err) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

/**
 * @description Prototype property adding the property functions for NoteModel Calss.
 * @method updateNoteModel() - update the note for particular user using id and setting the fields to be updated from the database.
 */
NoteModel.prototype.updateNoteModel = (id,title,callback) => {
  Note.update({id : id},{ $set : { title : title } })
  .then((result,err) => {
    if(err){
      callback(err)
    }else {
      callback(null,result)
    }
  });
};

module.exports = new NoteModel() ;
