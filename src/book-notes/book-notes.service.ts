import { Injectable } from "@nestjs/common";
import { BookNote } from "./book-note.schema";

@Injectable()
export class BookNotesService {
constructor(private readonly repository: Repository) { }

async getSomething(): Promise<any> {
	return ;
}
}