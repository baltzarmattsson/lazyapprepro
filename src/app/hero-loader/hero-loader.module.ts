import { Component, NgModule, ViewEncapsulation } from "@angular/core";
import { HeroLoaderTempComponent } from "./hero-loader.component";

@NgModule({
	declarations: [HeroLoaderTempComponent],
	exports: [HeroLoaderTempComponent]
})
export class HeroLoaderModule {
}