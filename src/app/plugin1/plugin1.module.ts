import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Plugin1Component } from "./plugin1.component";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		Plugin1Component,
	],
	exports: [
		Plugin1Component,
	],
	bootstrap: [
		Plugin1Component
	]
})
export class Plugin1Module { }
