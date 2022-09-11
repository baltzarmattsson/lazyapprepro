import { Component, OnInit } from '@angular/core';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { TransformControls } from "three/examples/jsm/controls/TransformControls"

@Component({
	selector: 'app-three',
	templateUrl: './three.component.html',
	styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

	private controls!: OrbitControls;
	private tcontrols!: TransformControls;
	private scene = new THREE.Scene();
	private camera = new THREE.PerspectiveCamera();
	private renderer = new THREE.WebGLRenderer({
		alpha: true,
		antialias: true,
		preserveDrawingBuffer: true
	})

	private podium!: THREE.Mesh;

	constructor() { }

	ngOnInit(): void {
		// @ts-ignore
		window["scene"] = this.scene;
		this.renderer.shadowMap.enabled = true;
		// @ts-ignore
		window["renderer"] = this.renderer;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		console.log(this.renderer);

		document.getElementById("container")?.appendChild(this.renderer.domElement);
		this.renderer.setSize(1000, 1000)
		this.init();
		this.renderLoop();
	}

	private init() {
		let plane = new THREE.PlaneGeometry(100, 100);
		let pmat = new THREE.MeshPhongMaterial({ color: "green" })
		pmat.side = THREE.DoubleSide;
		this.podium = new THREE.Mesh(plane, pmat);
		this.scene.add(this.podium);
		this.scene.background = new THREE.Color("red");
		this.scene.add(new THREE.AmbientLight("white", 0.5));
		this.camera.position.set(100, 100, 100);
		this.camera.lookAt(0, 0, 0);
		this.podium.rotation.set(Math.PI / 2, 0, 0)

		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.tcontrols = new TransformControls(this.camera, this.renderer.domElement);
		this.scene.add(this.tcontrols);

		this.tcontrols.addEventListener("mouseDown", e => {
			this.controls.enabled = false;
		})
		this.tcontrols.addEventListener("mouseUp", e => {
			this.controls.enabled = true;
		})

		let boxg = new THREE.BoxGeometry(10, 10);
		let boxm = new THREE.MeshPhongMaterial({ color: "blue" })
		let box = new THREE.Mesh(boxg, boxm);
		this.scene.add(box);

		box.castShadow = true;
		this.podium.receiveShadow = true;

		let spot = new THREE.SpotLight("white", 1, 0);
		spot.castShadow = true;
		this.scene.add(spot);
		spot.position.set(10, 20, -10);

		this.tcontrols.attach(spot);
		this.tcontrols.setMode("translate");


		// @ts-ignore
		window["materials"] = [pmat, boxm];
		// @ts-ignore
		console.log(window["materials"]);

	}

	renderLoop() {
		requestAnimationFrame(this.renderLoop.bind(this));
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}
