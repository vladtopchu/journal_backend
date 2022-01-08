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
	@Prop({ unique: true })
	username?: string;
	@Prop({ unique: true })
	email?: string;
	@Prop({ unique: true })
	phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);