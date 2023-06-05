const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    usuario: {
      type: String,
      required: true,
      unique: true,
    },
    contrasena: {
      type: String,
      required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },
  });
  
  usuarioSchema.pre('save', async function (next) {
    if (!this.isModified('contrasena')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(this.contrasena, salt);
      this.contrasena = hash;
      next();
    } catch (error) {
      return next(error);
    }
  });
  
  const Usuario = mongoose.model('Usuario', usuarioSchema);

  module.exports = Usuario;