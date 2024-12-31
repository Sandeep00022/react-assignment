import express from 'express';
import {body} from 'express-validator'
const router = express.Router();

// local modules
import { loginUser, logOut, registerUser } from "../controllers/user.controller.js";
import { authUser } from '../middlewares/userAuth.js';


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('name').isLength({min: 3}).withMessage('name  be at Least 3 character long'),
], registerUser);


router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], loginUser)

router.get('/logout',authUser, logOut)

export default router;