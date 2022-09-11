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

	dir!: THREE.DirectionalLight;

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
		document.getElementById("container")?.appendChild(this.renderer.domElement);
		this.renderer.setSize(900, 900)
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

		let spot = new THREE.SpotLight("white", 0.5, 0);
		spot.castShadow = true;
		this.scene.add(spot);
		spot.position.set(10, 20, -10);

		this.dir = new THREE.DirectionalLight("white", 0.5);
		this.dir.castShadow = true;
		this.scene.add(this.dir);
		spot.position.set(10, 20, 10);
		spot.target.position.set(0, 0, 0);

		// let spot2 = new THREE.SpotLight("white", 0.5, 0);
		// spot2.castShadow = true;
		// this.scene.add(spot2);
		// spot2.position.set(10, 20, 10);

		// let spot3 = new THREE.SpotLight("white", 0.5, 0);
		// spot3.castShadow = true;
		// this.scene.add(spot3);
		// spot3.position.set(-10, 20, 10);

		// let spot4 = new THREE.SpotLight("white", 0.5, 0);
		// spot4.castShadow = true;
		// this.scene.add(spot4);
		// spot4.position.set(10, -20, 10);

		this.tcontrols.attach(spot);
		this.tcontrols.setMode("translate");


		// @ts-ignore
		window["materials"] = [pmat, boxm];
		// @ts-ignore
		console.log(window["materials"]);

		this.renderLoop();
	}

	renderLoop() {
		requestAnimationFrame(this.renderLoop.bind(this));
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}
