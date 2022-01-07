import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Mongoose, SchemaTypes } from 'mongoose';
import { Schema } from '@nestjs/mongoose';

@Controller('auth')
export class AuthController {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService) { }

	@Post('signin')
	async signIn(@Body() authDto: AuthDto, @Res() response: Response) {

		if (!authDto.email && !authDto.phone) {
			return response.status(HttpStatus.BAD_REQUEST).send({
				status: HttpStatus.BAD_REQUEST,
				message: 'Email or phone should exist'
			})
		}

		let user: User = undefined
		if (!authDto.phone) {
			user = await this.usersService.findUserByEmail(authDto.email)
		} else if (!authDto.email) {
			user = await this.usersService.findUserByPhone(authDto.phone)
		}

		if (await bcrypt.compare(authDto.password, user.password)) {
			console.log(user["_id"].toString());
			return {
				access_token: this.jwtService.sign({ userId: user["_id"].toString() })
			}
		} else {
			return response.status(HttpStatus.UNAUTHORIZED).send({
				status: HttpStatus.UNAUTHORIZED,
				message: 'Password is incorrect'
			})
		}
	}

	@Post('signup')
	async signUp(@Body() userDto: UserDto, @Res() response: Response) {

		if (!userDto.email && !userDto.phone && !userDto.username) {
			return response.status(HttpStatus.BAD_REQUEST).send({
				status: HttpStatus.BAD_REQUEST,
				message: 'Username, email or phone should exist'
			})
		}
		let user = await this.usersService.createUser(userDto)
		console.log(user["_id"].toString());
		return {
			access_token: this.jwtService.sign({ userId: user["_id"].toString() })
		}
	}
}