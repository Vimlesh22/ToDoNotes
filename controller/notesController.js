const notesService = require('../service/notesService');

function NotesController()
{

};



NotesController.prototype.createNote = (req,res,next) => {
  var title = req.body.title;
  var description = req.body.description;
  var email = req.body.email;
  var password = req.body.password;
  notesService.createNotesService(title,description,(err,result) => {
    if(err) {
      res.status(500).json({
        error : err
      });
    }else{
      res.status(200).json({
        Note : result
      });
    }
  });
};

NotesController.prototype.getNote = (req,res,next) => {
  notesService.getNotesService((err,result) => {
    if(err){
      res.status(500).json({
        error : err
      });
    }else {
      res.status(200).json({
        Notes : result
      });
    }
  });
};

NotesController.prototype.updateNote = (req,res,next) => {
  var id = req.body._id;
  var title = req.body.title;
  notesService.updateNoteService(id,title,(result,err) => {
    if(result){
      res.status(200).json({
        result : result
      });
    }else {
      res.status(500).json({
        error : err
      });
    }
  });
};

NotesController.prototype.deleteNote = (req,res,next) => {
  var id = req.body.noteId;
  notesService.deleteNoteService(id,(result,err) => {
    if(result){
      res.status(200).json({
        result : result
      })
    }else {
      res.status(500).json({
        error : err
      })
    };
  });
};




module.exports = new NotesController();
