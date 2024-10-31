import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Método para encriptar la contraseña
userSchema.methods.encryptPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

// Método para comparar contraseñas
userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);
