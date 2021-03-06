import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BookNotesModule } from './book-notes/book-notes.module';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [MongooseModule.forRoot(process.env.MONGODB_URI), BooksModule, UsersModule, AuthModule, BookNotesModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
