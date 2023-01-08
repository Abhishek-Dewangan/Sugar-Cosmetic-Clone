import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    quantity: {type: Number, default: 1, min: 1},
  },
  {
    timestamps: true,
  }
);

// const handleaddCart = () => {
//   axios.post(`https://sugar-cosmatics.onrender.com/api/cart`, {
//     userId: `${user.userID}`,
//     productId: id,
//     quantity: 1,
//   });

// };

export const Cartmodel = mongoose.model('cart', cartSchema);
