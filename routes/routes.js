const express = require('express');
const notesController = require('../controller/notesController');
const userController = require('../controller/userController');
const passport = require('../passport/passport-facebook');
const app = express();
const router = express.Router();
const authController = require("../controller/authController");

router.get('/auth/facebook',passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/api/signup' }),
  function(req, res) {
    res.json({ message : 'Successfully loggedin through facebook'});
   }
  );

router.post('/login' , userController.login);
router.post('/signup' , userController.signup);
router.post('/forgetpassword',userController.forget);

router.use(authController.jwt_token_filter);

router.post('/createNote',notesController.createNote);
router.patch('/updateNote',notesController.updateNote);
router.get('/getNote',notesController.getNote);
router.delete('/deleteNote',notesController.deleteNote);

module.exports = router;
