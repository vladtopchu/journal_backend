import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from '../users/dto/user.dto';
import { User } from '../users/user.schema';
import { UsersService } from '../users/users.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) { }

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

		if (!user) {
			return response.status(HttpStatus.UNAUTHORIZED).send({
				status: HttpStatus.UNAUTHORIZED,
				message: "User with such credentials doesn't exist"
			})
		}

		if (await bcrypt.compare(authDto.password, user.password)) {
			let access_token = { access_token: this.jwtService.sign({ userId: user["_id"].toString() }) }
			console.log(access_token);
			return response.status(HttpStatus.OK).send(access_token)
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
		try {
			let user = await this.usersService.createUser({ ...userDto, password: await bcrypt.hash(userDto.password, 10) })
			console.log(user["_id"].toString());
			let access_token = { access_token: this.jwtService.sign({ userId: user["_id"].toString() }) }
			console.log(access_token);
			return response.status(HttpStatus.OK).send(access_token)
		} catch (e: any) {
			console.log(e);
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: e['message'] })
		}
	}
}