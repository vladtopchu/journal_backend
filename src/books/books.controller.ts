import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './book.schema';
import { BooksService } from './books.service';
import { Response } from 'express';

@Controller('books')
export class BooksController {
	constructor(private readonly booksService: BooksService) { }

	@Get(':bookId')
	async getBook(@Param('bookId') bookId: string): Promise<Book> {
		return this.booksService.getBookById(bookId)
	}

	@Get()
	async getAllBooks(): Promise<Book[]> {
		return this.booksService.getAllBooks()
	}

	@Post()
	async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
		return this.booksService.createBook(createBookDto)
	}

	@Patch(':bookId')
	async updateBook(@Param('bookId') bookId: string, @Body() updateBookDto: UpdateBookDto, @Res() response: Response) {
		if (!updateBookDto.author && !updateBookDto.finishUntil && !updateBookDto.photo && !updateBookDto.title) {
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: 'Request should contain atleast one field' })
		}
		return this.booksService.updateBook(bookId, updateBookDto)
	}

}