import mongoose, { Document } from 'mongoose';
import { hashPassword, comparePassword } from '../utils';
export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  tokenVersion: number;
  comparePassword(plainPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /ˆ[ˆ\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    username: { type: String, required: true },
    role: {
      type: String,
      enum: ['agent', 'admin', 'subscriber'],
      default: 'user',
    },
    tokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Hash password before saving
userSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  if (typeof this.password === 'string') {
    this.password = await hashPassword(this.password);
  }
});

userSchema.methods.comparePassword = async function (hashedPassword: string) {
  return comparePassword(hashedPassword, this.password);
};

export default mongoose.model<IUser>('User', userSchema);
