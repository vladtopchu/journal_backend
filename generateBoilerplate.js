const fs = require('fs')

Object.defineProperty(String.prototype, 'capitalize', {
	value: function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
	},
	enumerable: false
});

Object.defineProperty(String.prototype, 'removeLastChar', {
	value: function () {
		return this.slice(0, this.length - 1) + this.slice(this.length, this.length)
	},
	enumerable: false
})

const _name = process.argv[3]

if (['g', 'generate', 'gen'].includes(process.argv[2])) {

	if (!fs.existsSync(`./src/${_name}`)) {
		fs.mkdirSync(`./src/${_name}`)
	}

	if (!process.argv.includes('--no-schema')) {
		createSchema(_name)
	}
	createController(_name)
	createService(_name)
	createModule(_name)

	function createController(name) {
		let fileName = `${name}.controller.ts`
		let officialName = name.capitalize()
		let className = officialName + "Controller"
		fs.writeFileSync(`./src/${_name}/${fileName}`, `import { Controller, Get } from '@nestjs/common';
import { ${officialName}Service } from './${name}.service';

@Controller()
export class ${className} {
	constructor(private readonly ${name}Service: ${officialName}Service) { }

	@Get()
	getSomething(): any {
		return ;
	}
}`)
	}

	function createService(name) {
		let fileName = `${name}.service.ts`
		let officialName = name.capitalize()
		fs.writeFileSync(`./src/${_name}/${fileName}`, `import { Injectable } from "@nestjs/common";
import { ${officialName.removeLastChar()} } from "./${name.removeLastChar()}.schema";

@Injectable()
export class ${officialName}Service {
	constructor(private readonly repository: Repository) { }

	async getSomething(): Promise<any> {
		return ;
	}
}`)
	}

	function createSchema(name) {
		let currentName = name.removeLastChar()
		let fileName = `${currentName}.schema.ts`
		let officialName = currentName.capitalize()
		fs.writeFileSync(`./src/${_name}/${fileName}`, `import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ${officialName}Document = ${officialName} & Document;

@Schema({ timestamps: true })
export class ${officialName} {
	@Prop()
	test: string;
}

export const ${officialName}Schema = SchemaFactory.createForClass(${officialName});`)
	}

	function createModule(name) {
		let fileName = `${name}.module.ts`
		let officialName = name.capitalize()
		const generateContent = () => {
			if (process.argv.includes('--no-schema')) {
				return `import { Module } from "@nestjs/common";
import { ${officialName}Controller } from "./${name}.controller";
import { ${officialName}Service } from "./${name}.service";

@Module({
	imports: [],
	controllers: [${officialName}Controller],
	providers: [${officialName}Service]
})

export class ${officialName}Module { }`
			} else {
				return `import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ${officialName}Controller } from "./${name}.controller";
import { ${officialName.removeLastChar()}, ${officialName.removeLastChar()}Schema } from "./${name.removeLastChar()}.schema";
import { ${officialName}Service } from "./${name}.service";

@Module({
	imports: [MongooseModule.forFeature([{ name: ${officialName.removeLastChar()}.name, schema: ${officialName.removeLastChar()}Schema }])],
	controllers: [${officialName}Controller],
	providers: [${officialName}Service]
})

export class ${officialName}Module { }`
			}
		}
		fs.writeFileSync(`./src/${_name}/${fileName}`, generateContent())
	}
}