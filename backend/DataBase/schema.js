const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username:{type: String, required: true,trim: true},
    email:{type: String,required: true, unique: true,match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'لطفا ایمیل معتبر وارد کنید.']},
    password:{type: String, required: true , minlength: [6,'حداقل 6 کاراکتر نیاز است.']},
    createdAt: {type: Date, default: Date.now}
})

const moreInformationUser = new mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true , unique: true},
    name:{type: String , trim: true},
    phoneNumber: {type: Number},
    jobTitle: {type: String},
    createdAt: {type:Date, default:Date.now}
})

const labelSchema = new mongoose.Schema({
    name: {type: String, required: true , trim: true},
    color: {type: String, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
    createdAt: {type: Date, default: Date.now}
})


const formSchema = new mongoose.Schema({
    title:{type:String, required: true ,trim:true},
    label_id:{type:mongoose.Schema.Types.ObjectId, ref: 'Label'},
    fields: {type: Array, required: true},
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true},
    createdAt: {type: Date, default: Date.now}
},{ autoIndex: true })

userSchema.pre('deleteOne',{document:true, query:false},async function (next){
    try{
        await InformationUser.deleteOne({user_id: this._id})
        const labels = await Label.find({user_id:this._id})
        for(const label of labels){
            await label.deleteOne()
        }
        next()
    }catch(error){
        next(error)
    }
})

labelSchema.pre('deleteOne',{document:true, query:false},async function (next){
    try{
        await Form.deleteMany({label_id:this._id})
        next()
    }catch(error){
        next(error)
    }
})
labelSchema.index({ name: 1, user_id: 1 }, { unique: true });
formSchema.index({ label_id: 1, user_id: 1 }, { unique: false });
formSchema.index({ user_id: 1 }, { unique: false });

const User = mongoose.model('User', userSchema)
const Label = mongoose.model('Label', labelSchema)
const Form = mongoose.model('Form', formSchema)
const InformationUser = mongoose.model('InformationUser', moreInformationUser)

module.exports = { User, Label, Form, InformationUser}