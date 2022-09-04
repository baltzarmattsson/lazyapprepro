import { ApplicationRef, Component, ComponentRef, createNgModule, Injector, Input, Renderer2, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
	selector: 'hero-loader',
	template: "<p>heroloader</p><ng-template #container></ng-template>",
})
export class HeroLoaderTempComponent {

	@Input() path!: string;

	componentRef!: ComponentRef<unknown>;

	constructor(
		private injector: Injector,
		private viewRef: ViewContainerRef,
		private renderer: Renderer2,
		private applicationRef: ApplicationRef,
	) { }

	// Not working
	async ngOnInit() {
		let module = await import(this.path)
			.then(m => (m as any)[Object.keys(m)[0]]);
		console.log("Module", module);
		this.loadModuleComponents(module);
	}

	// Working
	// async ngOnInit() {
	// 	let module = await import("src/app/plugin1/plugin1.module")
	// 		.then(m => (m as any)[Object.keys(m)[0]]);
	// 	console.log("Module", module);
	// 	this.loadModuleComponents(module);
	// }

	private loadModuleComponents(importedModule: any) {
		let moduleRef = createNgModule(importedModule, this.injector);
		const component = (moduleRef as any)._bootstrapComponents[0];
		this.componentRef = this.viewRef.createComponent(component, { injector: this.injector, ngModuleRef: moduleRef })
	}
}