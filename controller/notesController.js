/******************************************************************************
 *  Purpose         : Defines ths controller for the ToDo Notes Application.
 * 
 *  @description    
 * 
 *  @file           : notesController.js
 *  @overview       : NotesController class handles all the requests coming from client for various operations delegating controls to specific methods.
 *  @author         : Vimlesh Kumar <kumarvimlesh007@gmail.com>
 *  @version        : 1.0
 *  @since          : 17-05-2018
 *
 ******************************************************************************/
/**
 * @description Dependencies require to be installed before the execution of this file.
 * @const {Class} notesService class instance of the notesService
 */
const notesService = require('../service/notesService');

function NotesController()
{

};


/**
 * @description Prototype property adding the property functions.
 * 
 * @method createNote() - Creates a note for particular user ,adding all the details about the notes
 */
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

/**
 * @description Prototype property adding the property functions.
 * 
 * @method getNote() - Getting the details of all the available notes to the user.
 */
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

/**
 * @description Prototype property adding the property functions.
 * 
 * @method updateNote() - Update the notes.
 */
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

/**
 * @description Prototype property adding the property functions.
 * 
 * @method deleteNote() - Deletes a note of particular user.
 */
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
