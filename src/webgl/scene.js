/*
 import {
 Camera,
 Scene,
 Mesh,
 BoxGeometry,
 MeshNormalMaterial,
 WebGLRenderer
 } from 'three';
 */

import {PerspectiveCamera} from 'three/src/cameras/PerspectiveCamera';
import {Scene} from 'three/src/scenes/scene';
import {Mesh} from 'three/src/objects/Mesh';
import {BoxGeometry} from 'three/src/geometries/BoxGeometry';
import {MeshBasicMaterial} from 'three/src/materials/MeshBasicMaterial';
import {WebGLRenderer} from 'three/src/renderers/WebGLRenderer';


export default class SceneHelper {

    constructor() {
        this.startTime = Date.now();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 4;

        this.scene = new Scene();

        this.cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color: "#433F81"}));

        this.scene.add(this.cube);

        const container = document.createElement('div');
        document.body.appendChild(container);

        this.renderer = new WebGLRenderer({antialias: true});
        this.renderer.setClearColor("#000000");
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

        this.animate();
    }

    render() {
        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.0125;
        this.cube.rotation.z += 0.0075;
        const dtime = Date.now() - this.startTime;
        this.cube.scale.x = 1.0 + 0.2 * Math.sin(dtime / 300);
        this.cube.scale.y = 1.0 + 0.2 * Math.sin(dtime / 300);
        this.cube.scale.z = 1.0 + 0.2 * Math.sin(dtime / 300);
        this.renderer.render(this.scene, this.camera);
    }

    animate() {
        this.render();
        requestAnimationFrame(() => this.animate());
    }

}
