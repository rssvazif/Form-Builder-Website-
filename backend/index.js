const exprees = require('express')
const cors = require('cors')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const connectDB = require('./DataBase/configDB')
const {User,Label,Form,InformationUser} = require('./DataBase/schema')
const { isValidObjectId } = require('mongoose')
require('dotenv').config()

const saltRounds = 10;
const app = exprees()
app.use(cors())
app.use(exprees.json())
const port = 3000;

app.use(exprees.static(path.join(__dirname,'../vite_jot/dist')))

connectDB();


// Get method

app.get('/api/get_label', async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const total_label = await Label.find({user_id: decoded.id}).select('name color')
    if(!total_label || total_label.length === 0){
      return res.status(200).json({
        message:'not exist labels',
        labels: []
      })
    }
    res.status(200).json({
      message:'get labels done',
      labels: total_label
    })
    
  }catch(error){
    console.log(error);
    res.status(500).json({message:'error to get labels'})
  }
})
app.get('/api/getAllForms',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const total_form = await Form.find({user_id:user_id}).select('title createdAt')
    if(!total_form || total_form.length === 0){
      return res.status(404).json({
        message: 'فرمی وجود ندارد',
        Name_Forms : []
      })
    }
    res.status(200).json({
      message: 'لیست فرم ها جمع آوری شد',
      Name_Forms: total_form
    })
  }catch(error){
    res.status(500).json({message:'error to get Name Forms from db'})
  }
})

app.get('/api/getSpecialForms/:id',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const { id } = req.params;
    const forms = await Form.find({label_id:id,user_id:user_id}).select('title createdAt')
    res.status(200).json({
      message: 'forms for one label',
      Name_Forms : forms
    })
  }catch(error){
    res.status(500).json({
      message: 'error to get Name Forms from db one label'
    })
  }
})
app.get('/api/editForm/:id',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const { id } = req.params;
    const form = await Form.findOne({_id: id,user_id: user_id})
    if(!form){
      return res.status(404).json({
        message: 'no form found !!'
      })
    }
    res.status(200).json({
      message: 'get form to edit done',
      form: form
    })
  }catch(error){
    res.status(500).json({
      message: 'error to get form to edit'
    })
  }
})
app.get('/api/getUserName',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET)
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const user_name = await User.findOne({_id: user_id}).select('username')
    if(!user_name){
      return res.status(404).json({message:'error to find user'})
    }
    res.status(200).json({
      message:'user name got',
      User_Name: user_name.username
    })
  }catch(error){
    res.status(500).json({message:'error to get user name'})
  }
})

//

app.get('/api/test', (req, res) => {
  res.json({ status: 'API works!' });
});


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../vite_jot/dist/index.html'))
})

//post methods

app.post('/api/User', async(req,res)=>{
  try{
    const {username,email,password} = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const check_signendUp = await User.findOne({email:email})
    if(check_signendUp){
      return res.status(404).json({message:'کاربر قبلا ثبت نام کرده است.'})
    }
    const new_user = new User({
      username,
      email,
      password:hashedPassword
    })
    await new_user.save()
    const token = jwt.sign(
      {id: new_user._id},
      process.env.JWT_SECRET,
      {expiresIn: '1d'}
    )    

    res.status(201).json({
      message:'user created',
      token
    })
    console.log('user signed up.');
  }catch(error){
    console.log(error);
    res.status(500).json({message:'user not created'})
  }
})

app.post('/api/Label', async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user is not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const {name,color} = req.body
    const new_label = new Label({
      name,
      color,
      user_id
    })
    await new_label.save()
    let label_id = new_label._id
    res.status(201).json({
      message: 'label added',
      label_id,
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message:'error to add label'
    })
  }
})

app.post('/api/login', async(req,res)=>{
  try{
    const {email_username,password} = req.body
    const user = await User.findOne({
      $or:[
        {email:email_username},
        {username:email_username}
      ]
    })
    if(!user){
      return res.status(404).json({
        message:'user is not found.'
      })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(401).json({
        message:'password is incorrect.'
      })
    }
    const token = jwt.sign(
      {id:user._id},
      process.env.JWT_SECRET,
      {expiresIn:'1d'}
    )
    res.status(200).json({
      message:'user login done.',
      token
    })
  }catch(error){
    console.log(error.message);
    res.status(500).json({
      message:'error to login.'
    })
  }
})

app.post('/api/save-form',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    if(!user_id){
      return res.status(403).json({message:'invalid user id'})
    }
    const {title,fields,label_id} = req.body
    let data_save ;
    if(label_id && isValidObjectId(label_id)){
      data_save = {
        title,
        label_id,
        fields,
        user_id
      }
    }else{
      data_save = {
        title,
        fields,
        user_id 
      }
    }
    const form = await Form(data_save)
    await form.save()

    res.status(201).json({
      message:'form saved',
      form_id : form._id,
      createdAt : form.createdAt
    })

  }catch(error){
    console.log(error);
    res.status(500).json({
      message: 'error to save form'
    })
  }  
})

app.put('/api/newNameLabel',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const {id,name} = req.body
    const editedLabel = await Label.updateOne(
      {
        _id : id,
        user_id: user_id
      },
      {
        $set: {name: name}
      }
    )
    if(editedLabel.matchedCount === 0){
      return res.status(404).json({message:'label is not available!'})
    }

    res.status(200).json({message:'label name updated'})
  }catch(error){
    res.status(500).json({
      message:'error to edit label name'
    })
  }
})
app.put('/api/newColorLabel',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const {id,color} = req.body
    const editedLabel = await Label.updateOne(
      {
        _id: id,
        user_id: user_id
      },
      {
        $set: {color: color}
      }
    )
    if(editedLabel.matchedCount === 0){
      return res.status(404).json({message:'label is not available!'})
    }
    res.status(200).json({message:'label name updated'})

  }catch(error){
    res.status(500).json({message:'error to edit label color'})
  }
})
app.put('/api/save-form',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const user_id = decoded.id
    const {title,fields,label_id,form_id} = req.body
    
    const existingForm = await Form.findOne({_id: form_id})
    if(!existingForm){
      return res.status(404).json({
        message:'form not found!'
      })
    }
    const updateForm = await Form.findByIdAndUpdate(
      form_id,
      {
        $set: {
          title,
          ...(label_id && { label_id }),
          fields,
          updatedAt: new Date(),
        }
      },
      {new : true}
    )
    res.status(200).json({
      message:'form updated',
      form_id: form_id,
      updatedAt: updateForm.updatedAt
    })
  }catch(error){
    res.status(500).json({
      message:'error to update form'
    })
  }
})
// delete method

app.delete('/api/deleteForm/:id',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const form_id = req.params.id
    const delete_item = await Form.deleteOne({_id: form_id})
    if(!delete_item){
      return res.status(204).json({
        message:'error to find form and delete'
      })
    }
    res.status(200).json({
      message:'form deleted'
    })
  }catch(error){
    res.status(500).json({
      message: 'error to delete form'
    })
  }
})

app.delete('/api/deleteLabel/:id',async(req,res)=>{
  try{
    const authHeader = req.headers['authorization']
    if (!authHeader) {
      return res.status(401).json({ message: 'توکن وجود ندارد!' });
    }
    const token = authHeader.split(' ')[1]
    if(!token){
      return res.status(401).json({message:'user not exist!'})
    }
    let decoded;
    try{
      decoded = jwt.verify(token,process.env.JWT_SECRET) 
    }catch(error){
      console.log(error);
      return res.status(403).json({message:'invalid token'})
    }
    const label_id = req.params.id
    const label = await Label.findOne({_id: label_id})
    await label.deleteOne()
    res.status(200).json({
      message:'form deleted'
    })
  }catch(error){
    res.status(500).json({message:'error to delete label'})
  }
})
//

app.listen(port,()=>{
    console.log('The server is running on port 3000 ...');
})