
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
    task: {
      type:String,
      required: true
    },
    completed: {
      type: Boolean,
      default:false
    }
})

module.exports=mongoose.model('task',userSchema)