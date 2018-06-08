const express = require('express');
const notesController = require('../controller/notesController');
const userController = require('../controller/userController');
const app = express();
const router = express.Router();
const authController = require("../controller/authController");


router.use(authController.jwt_token_filter);
router.post('/signup' , userController.signup);
router.post('/login' , userController.login);
router.get('/getNote',notesController.getNote);
router.post('/forgetpassword',userController.forget);
router.post('/createNote',notesController.createNote);
router.patch('/updateNote',notesController.updateNote);
router.delete('/deleteNote',notesController.deleteNote);

module.exports = router;
