import mongoose from 'mongoose'

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin'],
    required: true
  }
})
export default mongoose.model('Users',UsersSchema)