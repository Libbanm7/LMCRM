import { Schema, model, models, type Model, type Types } from 'mongoose';

export interface ICustomer {
  userId: Types.ObjectId;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  notes?: string;
  archivedAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const customerSchema = new Schema<ICustomer>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    address: { type: String, trim: true },
    notes: { type: String },
    archivedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

export const Customer: Model<ICustomer> =
  (models.Customer as Model<ICustomer>) ??
  model<ICustomer>('Customer', customerSchema);