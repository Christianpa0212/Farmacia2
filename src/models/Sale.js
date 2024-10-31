import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  customerName: { type: String },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Sale', saleSchema);
