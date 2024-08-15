import User from '../model/user.model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import Session from '../model/session.model.js'
import { isAlpha, isValidEmail, isValidMobile, isValidPassword } from '../util/validation.js'

export  const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'either email or password id incorrect' , success:false})
    }
  
    const token = jwt.sign({ id: user.id,fname: user.firstName, lname:user.lastName, mobile:user.mobile  }, process.env.JWT_SECRET, { expiresIn: '24h' })
  
    
    await Session.destroy({ where: { userId: user.id } })
  
    
    await Session.create({ userId: user.id, token })

  
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ message: 'log in success', success:true })
  }
  
export  const logout = async (req, res) => {
    const userId = req.user.id;
    await Session.destroy({ where: { userId } });
    res.clearCookie('token')

    res.status(200).json({ message: 'user log out' })
  }

 export const updateUser = async (req, res) => {
    const { firstName, lastName, email, password, mobile } = req.body;
  
    if (!isAlpha(firstName) || !isAlpha(lastName)) {
      return res.status(400).json({ message: 'invalid first name or last name' });
    }
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'invalid email format' });
    }
  
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'invalid password' });
    }
  
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ message: 'invalid mobile number' });
    }
  
    try {
      const user = await User.findOne({
        where:{
            id:req.user.id
        }
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.firstName = firstName
      user.lastName = lastName
      user.email = email
      user.mobile = mobile
  
 
      user.password = await bcrypt.hash(password, 10)
  
      await user.save();
      res.status(200).json({ message: 'Uuer updated successfully' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

export  const createUser = async (req, res) => {
    const { firstName, lastName, email, password, mobile } = req.body;
  
    // Validate input
    if (!isAlpha(firstName) || !isAlpha(lastName)) {
      return res.status(400).json({ message: 'Invalid first name or last name. Only letters are allowed.' });
    }
  
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }
  
    if (!isValidPassword(password)) {
      return res.status(400).json({ message: 'Password must be 8-12 characters long and include at least one number and one special character.' });
    }
  
    if (!isValidMobile(mobile)) {
      return res.status(400).json({ message: 'Mobile number must be 10 digits long and not start with 0, 1, 2, 3, 4, or 5.' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists.' });
      }
  
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobile,
      });
  
      res.status(201).json({ message: 'User created successfully.', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

 