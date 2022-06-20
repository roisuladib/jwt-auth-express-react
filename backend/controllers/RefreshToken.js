import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';


export const refreshToken = async (req, res) => {
   try {
      const {
         ACCESS_TOKEN_SECRET,
         REFRESH_TOKEN_SECRET,
         ACCESS_TOKEN_EXPIRED_SECRET
      } = process.env;
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) return res.sendStatus(401);
      const user = await Users.findAll({
         where: { refresh_token: refreshToken }
      });
      if (!user[0]) return res.sendStatus(403);
      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
         if (err) return res.sendStatus(403);
         const userId = user[0].id;
         const name = user[0].name;
         const email = user[0].email;
         const accessToken = jwt.sign({ userId, name, email }, ACCESS_TOKEN_SECRET, {
            expiresIn: ACCESS_TOKEN_EXPIRED_SECRET
         });
         res.json({ accessToken })
      })
   } catch (error) {
      console.log(error);
   }
}