import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-plugin1',
	templateUrl: './plugin1.component.html',
	styleUrls: ['./plugin1.component.scss']
})
export class Plugin1Component implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log("plugin1 ngOnInit");
	}

}
