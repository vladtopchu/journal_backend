import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Book, BookDocument } from "./book.schema";

@Injectable()
export class BooksRepository {
	constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

	async findById(id: string): Promise<Book> {
		return this.bookModel.findById(id)
	}

	async findAll(filterQuery: FilterQuery<Book>): Promise<Book[]> {
		return this.bookModel.find(filterQuery)
	}

	async create(book: Book): Promise<Book> {
		const newBook = new this.bookModel(book)
		return newBook.save()
	}

	async findByIdAndUpdate(id: string, book: Partial<Book>): Promise<Book> {
		// By default, Mongo returning old record on update; 
		// So to fix this, we should set option new to true
		return this.bookModel.findByIdAndUpdate(id, book, { new: true })
	}
}