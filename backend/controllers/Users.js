import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';


export const getUsers = async (req, res) => {
   try {
      const users = await Users.findAll({
         attributes: ['id', 'name', 'email', 'gender', 'address', 'avatar' ],
      });
      res.json({
         status: 'success',
         message: users.length !== 0 ? 'List users' : 'Users null',
         data: users
      });
   } catch (error) {
      console.error(error);
   }
}

export const register = async (req, res) => {
   const { name, email, password, confirm_password } = req.body;
   if (password !== confirm_password) {
      return res.status(400).json({
         status: 'error',
         message: 'Confirm password tidak cocok dengan password'
      });
   }
   const salt = await bcrypt.genSalt();
   const hashPassword = await bcrypt.hash(password, salt);
   try {
      await Users.create({ name, email, password: hashPassword });
      res.json({
         status: 'success',
         message: 'Register'
      });
   } catch (error) {
      console.log(error);
   }
}

export const login = async (req, res) => {
   try {
      const user = await Users.findAll({
         where: {
            email: req.body.email
         }
      });
      const match = await bcrypt.compare(req.body.password, user[0].password);
      if (!match) {
         return res.status(400).json({
            status: 'error',
            message: 'Wrong password'
         });
      }
      const userId = user[0].id;
      const name = user[0].name;
      const email = user[0].email;
      const {
         ACCESS_TOKEN_SECRET,
         REFRESH_TOKEN_SECRET,
         ACCESS_TOKEN_EXPIRED_SECRET,
         REFRESH_TOKEN_EXPIRED_SECRET
      } = process.env;
      const accessToken = jwt.sign({ userId, name, email }, ACCESS_TOKEN_SECRET, {
         expiresIn: ACCESS_TOKEN_EXPIRED_SECRET
      });
      const refreshToken = jwt.sign({ userId, name, email }, REFRESH_TOKEN_SECRET, {
         expiresIn: REFRESH_TOKEN_EXPIRED_SECRET
      });
      await Users.update({ refresh_token: refreshToken }, {
         where: { id: userId }
      });
      res.cookie('refreshToken', refreshToken, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000
      });
      res.json({ accessToken });
   } catch (error) {
      res.status(404).json({
         status: 'error',
         message: 'Email not found'
      })
   }
}

export const logout = async (req, res) => {
   try {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(204);
      const user = await Users.findAll({
         where: { refresh_token: refreshToken }
      });
      if (!user[0]) return res.sendStatus(204);
      const userId = user[0].id;
      await Users.update({ refresh_token: null }, {
         where: { id: userId }
      });
      res.clearCookie('refreshToken');
      return res.sendStatus(200);
   } catch (error) {
      console.log(error);
   }
}

