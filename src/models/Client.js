import mongoose from 'mongoose';

const Client = mongoose.models.Client || mongoose.model('Client', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
}));

export default Client;
