import { HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { UserDto } from "src/users/dto/user.dto";
import { AuthDto } from "./dto/auth.dto";

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) { }
}