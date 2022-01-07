import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
	@Prop()
	name: string;
	@Prop()
	surname: string;
	@Prop()
	password: string;
	@Prop()
	username?: string;
	@Prop()
	email?: string;
	@Prop()
	phone?: string;
	@Prop()
	id?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);