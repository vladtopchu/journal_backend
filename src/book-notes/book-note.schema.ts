import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BookNoteDocument = BookNote & Document;

@Schema({ timestamps: true })
export class BookNote {
	@Prop()
	test: string;
}

export const BookNoteSchema = SchemaFactory.createForClass(BookNote);