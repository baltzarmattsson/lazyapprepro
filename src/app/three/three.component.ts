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
	private box!: THREE.Mesh;

	constructor() { }

	ngOnInit(): void {

		// Setup
		document.getElementById("container")?.appendChild(this.renderer.domElement);
		this.scene.background = new THREE.Color("red");
		this.scene.add(new THREE.AmbientLight("white", 0.5));
		this.camera.position.set(100, 100, 100);
		this.camera.lookAt(0, 0, 0);
		this.controls = new OrbitControls(this.camera, this.renderer.domElement);
		this.tcontrols = new TransformControls(this.camera, this.renderer.domElement);
		this.tcontrols.addEventListener("mouseDown", e => {
			this.controls.enabled = false;
		})
		this.tcontrols.addEventListener("mouseUp", e => {
			this.controls.enabled = true;
		})
		this.tcontrols.setMode("translate");
		this.scene.add(this.tcontrols);

		// Renderer settings
		this.renderer.setSize(900, 900);
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		// Podium
		let plane = new THREE.PlaneGeometry(100, 100);
		let pmat = new THREE.MeshPhongMaterial({ color: "green" })
		pmat.side = THREE.DoubleSide;
		this.podium = new THREE.Mesh(plane, pmat);
		this.scene.add(this.podium);
		this.podium.rotation.set(Math.PI / 2, 0, 0)
		this.podium.receiveShadow = true;

		// Box
		let boxg = new THREE.BoxGeometry(10, 10);
		let boxm = new THREE.MeshPhongMaterial({ color: "blue" })
		this.box = new THREE.Mesh(boxg, boxm);
		this.scene.add(this.box);
		this.box.castShadow = true;

		// Lights
		let spot = new THREE.SpotLight("white", 0.5, 0);
		spot.castShadow = true;
		this.scene.add(spot);
		spot.position.set(10, 20, -10);

		this.dir = new THREE.DirectionalLight("white", 0.5);
		this.dir.castShadow = true;
		this.scene.add(this.dir);
		this.dir.position.set(10, 20, 10);
		this.dir.target.position.set(0, 0, 0);
		this.tcontrols.attach(spot);

		// run
		this.renderLoop();
	}

	renderLoop() {
		requestAnimationFrame(this.renderLoop.bind(this));
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}
}
