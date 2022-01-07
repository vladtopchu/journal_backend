import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { User, UserDocument } from "./user.schema";

@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

	async getUserById(userId: string): Promise<User> {
		return this.userModel.findById(userId)
	}

	async createUser(userDto: UserDto): Promise<User> {
		let newUser = new this.userModel(userDto)
		return newUser.save()
	}

	async getUsers(): Promise<User[]> {
		return this.userModel.find()
	}

	async findUserByEmail(email: string) {
		return this.userModel.findOne({ email })
	}

	async findUserByPhone(phone: string) {
		return this.userModel.findOne({ phone })
	}
}