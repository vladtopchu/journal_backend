import { Injectable } from "@nestjs/common";
import { BookNote } from "./book-note.schema";
import { BookNotesRepository } from "./book-notes.repository";
import { CreateBookNoteDto } from "./dto/create-book-note.dto";

@Injectable()
export class BookNotesService {
	constructor(
		private bookNotesRepository: BookNotesRepository
	) { }

	async getNoteById(noteId: string): Promise<BookNote> {
		return this.bookNotesRepository.findNoteById(noteId)
	}

	async getBooksNotes(userId: string, bookId: string): Promise<BookNote[]> {
		return this.bookNotesRepository.findMatching({ userId, bookId })
	}

	async createBookNote(createBookNoteDto: CreateBookNoteDto): Promise<BookNote> {
		return this.bookNotesRepository.createBookNote({
			userId: createBookNoteDto.userId,
			bookId: createBookNoteDto.bookId,
			note: createBookNoteDto.note,
			page: createBookNoteDto.page
		})
	}

	async deleteBookNote(noteId: string) {
		return this.bookNotesRepository.deleteBookNote(noteId)
	}
}