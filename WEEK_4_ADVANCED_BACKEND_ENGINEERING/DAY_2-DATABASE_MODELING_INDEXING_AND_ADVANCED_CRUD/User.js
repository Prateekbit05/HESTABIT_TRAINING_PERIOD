const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Fixed: removed unnecessary escape characters \- in character classes
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [EMAIL_REGEX, 'Please provide a valid email']
    },
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // Fixed: Number.parseInt instead of parseInt
  const saltRounds = Number.parseInt(process.env.BCRYPT_SALT) || 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  // No redundant await — bcrypt.compare already returns a Promise
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
