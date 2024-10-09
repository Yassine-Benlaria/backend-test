import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../categories/category.schema';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({ required: true, default: 0 })
  stock: number;
}

export const ProductSchema =
  SchemaFactory.createForClass(Product).plugin(softDeletePlugin);
