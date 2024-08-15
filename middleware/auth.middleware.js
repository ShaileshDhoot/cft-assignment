
import jwt from 'jsonwebtoken';
import User from '../model/user.model.js'

const authenticateUser = async (req,res) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({message:"token missing in request", success:falselse});

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findone({
        where:{
            id:decodeToken.id
        }
    });
    if (!user) return res.sendStatus(403).json({
        message: "user not found",
        success:false
    });
    req.user = user;
    next();
  } catch (err) {
    res.sendStatus(403);
  }
};

export default authenticateUser;
