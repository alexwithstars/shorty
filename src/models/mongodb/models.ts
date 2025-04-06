import { Schema, model } from 'mongoose'
import { ILink } from '../types.js'

const linkSchema = new Schema<ILink>({
  alias: { type: String, required: true },
  url: { type: String, required: true },
  clicks: { type: Number, default: 0 }
})

linkSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

export const Link = model<ILink>('Link', linkSchema)
