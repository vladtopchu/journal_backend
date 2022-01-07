import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from './dto/user.dto';
import { User } from './user.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) { }

	@Get(':userId')
	async getUserById(@Param('userId') userId: string): Promise<User> {
		return this.usersService.getUserById(userId);
	}

	@Get()
	async getUsers(): Promise<User[]> {
		return this.usersService.getUsers();
	}

	@Post()
	async createUser(@Body() userDto: UserDto, @Res() response: Response) {
		if (!userDto.email && !userDto.phone && !userDto.username) {
			return response.status(HttpStatus.BAD_REQUEST).send({
				status: HttpStatus.BAD_REQUEST,
				message: 'Username, email or phone should exist'
			})
		}
		return this.usersService.createUser(userDto);
	}
}