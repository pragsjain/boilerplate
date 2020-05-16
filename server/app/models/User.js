'use strict'

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    default: ''
  },
  lastName: {
    type: String,
    default: ''
  },
  fullName: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    min: [5, 'Too short, min is 5 characters'],
    max: [32, 'Too long, max is 32 characters'],
    required: 'Password is required',
    default: 'randomPassword'
  },
  userName: {
    type: String,
    default: '',
    unique: true
  },
  mobileNo: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    default: '',
    unique: true,
    required: 'Email is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
  },
  createdOn :{
    type:Date,
    default:""
  }


})


mongoose.model('User', userSchema);