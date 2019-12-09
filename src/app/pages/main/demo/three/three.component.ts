import { Component, OnInit, ElementRef } from '@angular/core';

import * as THREE from 'three';
import * as Stats from 'stats.js';
import * as OrbitControls from 'three-orbitcontrols';
import DragControls from 'three-dragcontrols';

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  rootElement: HTMLElement;

  scene: THREE.Scene;
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;

  stats: Stats; // fps 工具
  orbitControls: OrbitControls; // 缩放旋转平移控制组件
  dragControls: DragControls; // 模型拖拽控制组件

  objects: THREE.Mesh[];

  constructor(
    public el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.initScene();
    this.animate();
  }

  initScene() {
    this.rootElement = this.el.nativeElement.querySelector('.three-wrap');
    this.camera = new THREE.PerspectiveCamera(70, this.rootElement.clientWidth / this.rootElement.clientHeight, 1, 5000);
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    // 添加光线
    this.scene.add(new THREE.AmbientLight(0x505050));
    const light = new THREE.SpotLight(0xffffff, 1.5);
    light.position.set(0, 500, 2000);
    light.angle = Math.PI / 9;
    light.castShadow = true;
    light.shadow.camera.near = 1000;
    light.shadow.camera.far = 4000;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    this.scene.add(light);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.rootElement.clientWidth, this.rootElement.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.rootElement.appendChild(this.renderer.domElement);

    // 地图平移旋转缩放操作工具
    this.orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.orbitControls.maxPolarAngle = 0.9 * Math.PI / 2; // 设置镜头最大下视角度(鼠标上下移动)
    this.orbitControls.minDistance = 200; // 设置相机距离原点的最小距离(鼠标滚轮向前滚动)
    this.orbitControls.maxDistance = 1000; // 设置镜头最大视距(鼠标滚轮向后滚动)
    this.orbitControls.enableKeys = true;
    // 操作控制器重新渲染场景
    this.orbitControls.addEventListener('change', (event) => {
      this.renderer.render(this.scene, this.camera);
    });

    const $this = this;
    // 模型拖拽
    this.initObjects();
    this.dragControls = new DragControls(this.objects, this.camera, this.renderer.domElement);
    this.dragControls.addEventListener('dragstart', (event) => {
      $this.orbitControls.enabled = false;
      event.object.material.emissive.set(0xaaaaaa);
    });
    this.dragControls.addEventListener('dragend', (event) => {
      $this.orbitControls.enabled = true;
      event.object.material.emissive.set(0x000000);
    });

    // fps
    this.stats = new Stats();
    this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    this.stats.dom.style.position = 'absolute';
    this.rootElement.appendChild(this.stats.dom);
  }

  initObjects() {
    this.objects = [];
    const geometry = new THREE.BoxBufferGeometry(40, 40, 40);
    for (let i = 0; i < 200; i++) {
      const object: THREE.Mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
      object.position.x = Math.random() * 1000 - 500;
      object.position.y = Math.random() * 600 - 300;
      object.position.z = Math.random() * 800 - 400;
      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;
      object.scale.x = Math.random() * 2 + 1;
      object.scale.y = Math.random() * 2 + 1;
      object.scale.z = Math.random() * 2 + 1;
      object.castShadow = true;
      object.receiveShadow = true;
      this.scene.add(object);
      this.objects.push(object);
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));

    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
}
