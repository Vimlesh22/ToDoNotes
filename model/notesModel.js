const mongoose = require('mongoose');
const config = require ('../secret/config');


var noteSchema = mongoose.Schema({
  title : { type : String,required : true,unique : true },
  description : { type : String,required : true }
});

var Note = mongoose.model('Notes',noteSchema);

function NoteModel() {

}

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


NoteModel.prototype.deleteNoteModel = (id,callback) => {
  Note.deleteOne(id).then((result,err) => {
    if(err){
      callback(err);
    }else {
      callback(null,result);
    }
  });
};

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
