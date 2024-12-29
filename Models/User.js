import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: ""
  }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
  const [firstName, lastName] = this.name.split(' ');
  const username = `${firstName || ''}+${lastName || ''}`;
  this.profilePic = `https://avatar.iran.liara.run/username?username=${username}`;
  next();
});

export default mongoose.model('user', UserSchema);