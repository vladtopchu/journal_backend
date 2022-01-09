import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookNoteDocument = BookNote & Document;

@Schema({ timestamps: true })
export class BookNote {
	@Prop()
	userId: string;
	@Prop()
	bookId: string;
	@Prop()
	note: string;
	@Prop()
	page?: string;
}

export const BookNoteSchema = SchemaFactory.createForClass(BookNote);