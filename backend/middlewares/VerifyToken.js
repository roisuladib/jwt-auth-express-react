import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
   const authHeader = req.headers['authorization'];
   const token = authHeader && authHeader.split(' ')[1]; //Jika user tidak mengirim tokennya, maka variable tokennya juga akan kosong && jika user mengirim tokennya maka akan kita split dan ambil tokennya
   if (token === 0) return res.sendStatus(401);
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.email = decoded.email;
      next();
   });
}