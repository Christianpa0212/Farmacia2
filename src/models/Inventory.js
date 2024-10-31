import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inventory', inventorySchema);
