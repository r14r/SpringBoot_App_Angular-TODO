import { Injectable } from "@angular/core";

@Injectable()
export class HelperService {
	
	constructor() {}

	log(module, func, line='') {
		console.log(`DEBUG: ${module}.${func} | ${line}`)
	}

}
