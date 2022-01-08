import { Injectable } from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { BooksRepository } from "./books.repository";
import { Book } from "./book.schema";

@Injectable()
export class BooksService {
	constructor(private readonly booksRepository: BooksRepository) { }

	async getBookById(bookId: string): Promise<Book> {
		return this.booksRepository.findById(bookId)
	}


	async getAllUsersBooks(userId: string): Promise<Book[]> {
		return this.booksRepository.findAll({ userId })
	}

	async getAllBooks(): Promise<Book[]> {
		return this.booksRepository.findAll({})
	}

	async createBook(createBookDto: CreateBookDto): Promise<Book> {
		return this.booksRepository.create({
			userId: createBookDto.userId,
			title: createBookDto.title,
			author: createBookDto.author,
			photo: createBookDto.photo,
			finishUntil: createBookDto.finishUntil
		})
	}

	async updateBook(bookId: string, bookUpdateDto: UpdateBookDto): Promise<Book> {
		return this.booksRepository.findByIdAndUpdate(bookId, bookUpdateDto)
	}
}