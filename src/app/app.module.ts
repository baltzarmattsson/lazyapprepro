import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { AppComponent } from './app.component';
import { HeroLoaderModule } from './hero-loader/hero-loader.module';
import { ThreeComponent } from './three/three.component';
// let routing = RouterModule.forRoot([
// 	{
// 		path: "",
// 		pathMatch: "prefix",
// 		children: [{
// 			path: "",
// 			loadChildren: () => import("./plugin1/plugin1.module").then(m => m.Plugin1Module)
// 		}]
// 	}
// ])

@NgModule({
	declarations: [
		AppComponent,
  ThreeComponent
	],
	imports: [
		BrowserModule,
		HeroLoaderModule,
		// routing
	],
	providers: [],
	bootstrap: [AppComponent],
	// exports: [Plugin1Module]
})
export class AppModule { }
