import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BooksService } from 'src/books/books.service';
import { BookNote } from './book-note.schema';
import { BookNotesService } from './book-notes.service';
import { CreateBookNoteDto } from './dto/create-book-note.dto';

@Controller('book-notes')
@UseGuards(JwtAuthGuard)
export class BookNotesController {
	constructor(
		private readonly bookNotesService: BookNotesService,
		private readonly booksService: BooksService
	) { }

	@Get(':noteId')
	async getNoteById(@Request() req: any, @Param('noteId') noteId: string, @Res() response: Response) {
		let note = await this.bookNotesService.getNoteById(noteId)
		if (note.userId == req.user.userId) {
			return note
		} else {
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: "Note doesn't exist" })
		}
	}

	@Get('book/:bookId')
	async getBooksNotes(@Request() req: any, @Param('bookId') bookId: string) {
		let notes = await this.bookNotesService.getBooksNotes(req.user.userId, bookId)
		return notes
	}

	@Post()
	async createBookNote(@Request() req: any, @Body() createBookNoteDto: CreateBookNoteDto, @Res() response: Response): Promise<any> {
		console.log("CREATE BOOK NOTE CONTROLLER");
		console.log(createBookNoteDto);
		let book = await this.booksService.getBookById(createBookNoteDto.bookId)
		console.log("BOOK:", book)
		if (book && book.userId == req.user.userId) {
			console.log("PASSED");
			let note = await this.bookNotesService.createBookNote({ ...createBookNoteDto, userId: req.user.userId })
			console.log(note);
			return note
		} else {
			console.log("DIDN'T PASSED");
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: "Book doesn't exist" })
		}
	}

	// TODO
	// @Patch(':noteId')
	// async updateNote(@Request() req: any, @Param('noteId') noteId: string) {
	// 	return updatedNote
	// }

	@Delete(':noteId')
	async deleteNote(@Request() req: any, @Param('noteId') noteId: string, @Res() response: Response) {
		let note = await this.bookNotesService.getNoteById(noteId)
		if (note.userId == req.user.userId) {
			return this.bookNotesService.deleteBookNote(noteId)
		} else {
			return response.status(HttpStatus.BAD_REQUEST).send({ status: HttpStatus.BAD_REQUEST, message: "Note doesn't exist" })
		}
	}
}