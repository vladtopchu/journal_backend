import { Controller, Get } from '@nestjs/common';
import { BookNotesService } from './book-notes.service';

@Controller()
export class BookNotesController {
	constructor(private readonly bookNotesService: BookNotesService) { }

	@Get()
	getSomething(): any {
		return ;
	}
}