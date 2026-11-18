import { Schema, model, models, type Model, type Types } from 'mongoose';

export interface IBusinessProfile {
  userId: Types.ObjectId;
  businessName: string;
  address: string;
  email: string;
  phone: string;
  vatNumber: string;
  paymentDetails: string;
  createdAt: Date;
  updatedAt: Date;
}

const businessProfileSchema = new Schema<IBusinessProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    vatNumber: { type: String, trim: true, default: '' },
    paymentDetails: { type: String, trim: true, default: '' },
  },
  { timestamps: true },
);

export const BusinessProfile: Model<IBusinessProfile> =
  (models.BusinessProfile as Model<IBusinessProfile>) ??
  model<IBusinessProfile>('BusinessProfile', businessProfileSchema);