import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  name: string;
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
