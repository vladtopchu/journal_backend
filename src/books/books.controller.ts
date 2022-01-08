import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Req, Request, Res } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { BooksService } from './books.service';
import { Response } from 'express';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	@Get(':bookId')
	async getBook(@Request() req: any, @Param('bookId') bookId: string, @Res() response: Response): Promise<any> {
		let book = await this.booksService.getBookById(bookId)
		if (book.userId == req.user.userId) {
			return book
		} else {
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: "Book is not exist" })
		}
	}

	@Get()
	async getAllUsersBooks(@Request() req: any): Promise<Book[]> {
		return this.booksService.getAllUsersBooks(req.user.userId)
	}

	@Post()
	async createBook(@Request() req: any, @Body() createBookDto: CreateBookDto): Promise<Book> {
		return this.booksService.createBook({ ...createBookDto, userId: req.user.userId })
	}

	@Patch(':bookId')
	async updateBook(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto, @Res() response: Response) {
		if (!updateBookDto.author && !updateBookDto.finishUntil && !updateBookDto.photo && !updateBookDto.title) {
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: 'Request should contain atleast one field' })
		}
		return this.booksService.updateBook(bookId, updateBookDto)
	}

}