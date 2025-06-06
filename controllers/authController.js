const User=require('../models/User');
const jwt=require('jsonwebtoken');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'30d'
    });
}

// ####################### User Signup ###############################
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ####################### User Login ###############################
    exports.login=async(req,res)=>{
        try{
     const{email,password}=req.body;
     const user=await User.findOne({email});
     if(!user || !(await user.comparePassword(password)))
        return res.status(401).json({
    message:'Invalid email or password'
        });
        const token=generateToken(user._id);
        res.status(200).json({token});
        }catch(err){
  res.status(500).json({ message: err.message });
        }
    }