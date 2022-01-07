import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookDocument = Book & Document;

@Schema({ timestamps: true })
export class Book {
	@Prop()
	userId: string;
	@Prop()
	title: string;
	@Prop()
	author?: string;
	@Prop()
	finishUntil?: number;
	@Prop()
	photo?: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);