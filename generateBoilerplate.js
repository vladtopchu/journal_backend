const fs = require('fs')

Object.defineProperty(String.prototype, 'capitalize', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false
});

Object.defineProperty(String.prototype, 'decapitalize', {
	value: function () {
		return this.charAt(0).toLowerCase() + this.slice(1);
	},
	enumerable: false
});

Object.defineProperty(String.prototype, 'removeLastChar', {
	value: function () {
		return this.slice(0, this.length - 1) + this.slice(this.length, this.length)
	},
	enumerable: false
})

let _folderName = undefined
let _name = process.argv[3]
_folderName = _name
let _splittedName = _name.split('-')
if (_splittedName.length > 1) {
	_name = _splittedName.map(el => el.capitalize()).join('')
}
console.log("NAME: ");
console.log(_name);
console.log("FOLDERNAME: ");
console.log(_folderName);


if (['g', 'generate', 'gen'].includes(process.argv[2])) {

	if (!fs.existsSync(`./src/${_folderName}`)) {
		fs.mkdirSync(`./src/${_folderName}`)
		fs.mkdirSync(`./src/${_folderName}/dto`)
	}

	if (!process.argv.includes('--no-schema')) {
		// Create Schema
		let currentName = _folderName.removeLastChar()
		let fileName = `${currentName}.schema.ts`
		let officialName = _name.removeLastChar()
		fs.writeFileSync(`./src/${_folderName}/${fileName}`, `import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ${officialName}Document = ${officialName} & Document;

@Schema({ timestamps: true })
export class ${officialName} {
	@Prop()
	test: string;
}

export const ${officialName}Schema = SchemaFactory.createForClass(${officialName});`)
	}

	// Create Controller
	let fileName = `${_folderName}.controller.ts`
	let className = _name + "Controller"
	fs.writeFileSync(`./src/${_folderName}/${fileName}`, `import { Controller, Get } from '@nestjs/common';
import { ${_name}Service } from './${_folderName}.service';

@Controller()
export class ${className} {
	constructor(private readonly ${_name.decapitalize()}Service: ${_name}Service) { }

	@Get()
	getSomething(): Promise<any> {
		return ;
	}
}`)

	// Create Service
	fileName = `${_folderName}.service.ts`
	fs.writeFileSync(`./src/${_folderName}/${fileName}`, `import { Injectable } from "@nestjs/common";
import { ${_name.removeLastChar()} } from "./${_folderName.removeLastChar()}.schema";

@Injectable()
export class ${_name}Service {
constructor(private readonly repository: Repository) { }

async getSomething(): Promise<any> {
	return ;
}
}`)

	// Create Module
	fileName = `${_folderName}.module.ts`
	const generateContent = () => {
		if (process.argv.includes('--no-schema')) {
			return `import { Module } from "@nestjs/common";
import { ${_name}Controller } from "./${_folderName}.controller";
import { ${_name}Service } from "./${_folderName}.service";

@Module({
	imports: [],
	controllers: [${_name}Controller],
	providers: [${_name}Service]
})

export class ${_name}Module { }`
		} else {
			return `import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ${_name}Controller } from "./${_folderName}.controller";
import { ${_name.removeLastChar()}, ${_name.removeLastChar()}Schema } from "./${_folderName.removeLastChar()}.schema";
import { ${_name}Service } from "./${_folderName}.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: ${_name.removeLastChar()}.name, schema: ${_name.removeLastChar()}Schema }])],
	controllers: [${_name}Controller],
	providers: [${_name}Service]
})

export class ${_name}Module { }`
		}
	}
	fs.writeFileSync(`./src/${_folderName}/${fileName}`, generateContent())
}