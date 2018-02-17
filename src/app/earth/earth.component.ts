import { Component, ViewChild, HostListener, ElementRef, OnInit } from '@angular/core';
import * as THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE)

@Component({
  selector: 'earth',
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.scss']
})
export class EarthComponent implements OnInit {
  @ViewChild('rendererContainer') rendererContainer: ElementRef;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  clouds = null;
  isocentre = null;
  controls = null;
  radius: number = 10;
  paths = [];

  gpsParis = {
    lon: 48.856638,
    lat: 2.352241
  };
  gpsAthens = {
    lon: 37.983810,
    lat: 23.727539,
  };

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
    this.camera.position.set(17,15,0);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    this.controls.enableZoom = false;

  }

  ngAfterViewInit() {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.animate();

    this.wip();
    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    this.clouds.rotation.y += .0005;
    this.isocentre.rotation.y += .001;

    this.renderer.render(this.scene, this.camera);
    // setInterval(() => console.log(this.camera.position), 5000)
  }

  ngOnInit() {

    // Ambient light //
    const ambientLight = new THREE.AmbientLight( 0xcccccc );
    this.scene.add( ambientLight );

    // Directional light //
    const directionalLight = new THREE.DirectionalLight( 0xfdfcf0, 1 );
    directionalLight.position.set(20,10,20);
    this.camera.add( directionalLight );
    

    // Earth //
    const earthGeometry = new THREE.SphereGeometry( this.radius, 50, 50 );
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture("./assets/map-test-4.jpg"),
      // bumpMap: new THREE.ImageUtils.loadTexture('./assets/earthspec1k.jpg'),
      bumpScale: 0.1,
      specularMap: THREE.ImageUtils.loadTexture('./assets/map-test-2.jpg'),
      specular: new THREE.Color('grey'),
      color: 0xaaaaaa,
      shininess: 5
    });

    // Clouds //
    const cloudGeometry = new THREE.SphereGeometry(this.radius + .05, 50, 50);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture("./assets/fair_clouds_4k.png"),
      transparent: true,
      opacity: 0.6
    });

    // Cities //
    const cityGeometry = new THREE.SphereGeometry(this.radius + .01, 50, 50);
    const cityMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture("./assets/earthlights1k.jpg"),
      transparent: true,
      opacity: 1,
    });

    // Stars //
    const starGeometry = new THREE.SphereGeometry(200, 50, 50);
    const starMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture("./assets/2048x1024.png"),
      side: THREE.DoubleSide,
      shininess: 0
    });

    // Setup earth //
    this.isocentre = new THREE.Object3D();
    const star = new THREE.Mesh(starGeometry, starMaterial);
    this.isocentre.add(star);
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    this.isocentre.add(earth);
    this.clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    this.isocentre.add(this.clouds);
    const citys = new THREE.Mesh(cityGeometry, cityMaterial);
    this.isocentre.add(citys);

    this.isocentre.add(this.camera);
    this.isocentre.position.x = -20;
    this.scene.add(this.isocentre);
  }


  convertToCartesian(lon, lat) {
    let phiFrom = lon * Math.PI / 180;
    let thetaFrom = (lat + 90) * Math.PI / 180;
 
    let res = {
      x: this.radius * Math.cos(phiFrom) * Math.sin(thetaFrom),
      y: this.radius * Math.sin(phiFrom),
      z: this.radius * Math.cos(phiFrom) * Math.cos(thetaFrom)
    }
    return res;
  }

  wip() {

    let parisCoords = this.convertToCartesian(this.gpsParis.lon, this.gpsParis.lat);
    let athensCoords = this.convertToCartesian(this.gpsAthens.lon, this.gpsAthens.lat);

    var vT = new THREE.Vector3(parisCoords.x, parisCoords.y, parisCoords.z);
    var vF = new THREE.Vector3(athensCoords.x, athensCoords.y, athensCoords.z);

    var dist = vF.distanceTo(vT);
 
    // here we are creating the control points for the first ones.
    // the 'c' in front stands for control.
    var cvT = vT.clone();
    var cvF = vF.clone();
    
    // then you get the half point of the vectors points.
    var xC = ( 0.5 * (vF.x + vT.x) );
    var yC = ( 0.5 * (vF.y + vT.y) );
    var zC = ( 0.5 * (vF.z + vT.z) );
    
    // then we create a vector for the midpoints.
    var mid = new THREE.Vector3(xC, yC, zC);

    var smoothDist = map(dist, 0, 14.5, 0, 15/dist );
    
    mid.setLength( this.radius * smoothDist );
    
    cvT.add(mid);
    cvF.add(mid);
    
    cvT.setLength( this.radius * smoothDist );
    cvF.setLength( this.radius * smoothDist );

    function map( x,  in_min,  in_max,  out_min,  out_max){
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    var curve = new THREE.CubicBezierCurve3( vF, cvF, cvT, vT );

    var geometry = new THREE.TubeGeometry( curve, 20, 0.02, 8, false );
    var material = new THREE.MeshBasicMaterial( { color: 0xff00ff, opacity: 0.5 } );
    var mesh = new THREE.Mesh( geometry, material );
    this.isocentre.add( mesh );

  }

}




//     //Draw point to gps loc
//     // Example: Decimal (World Geodetic System WGS84) : 48.856638, 2.352241
//     let drawGPSPoint = function(northLoc, EastLoc) {

//       let pos = convertGeodeticToCoords(northLoc, EastLoc, 1);
//       let posX = pos.x / 1250000;
//       let posY = pos.y / 1250000;
//       let posZ = pos.z / 1250000;


//       //Draw
//       let geometry = new THREE.SphereGeometry( 0.01, 50, 50 );
//       let material = new THREE.MeshBasicMaterial( {color: 0xff0000} );
//       let sphereGPS = new THREE.Mesh( geometry, material );
//       sphereGPS.position.x = posX;
//       sphereGPS.position.y = posY;
//       sphereGPS.position.z = posZ;
//       let pathMask = new THREE.Object3D();
//       pathMask.add( sphereGPS );
//       pathMask.rotation.x = -Math.PI / 2;
//       scene.add(pathMask);
//       return sphereGPS;

//     }


//     let convertGeodeticToCoords = function(lon, lat, h) {

//       // WGS-84 geodetic constants
//       const a = 6378137;               // WGS-84 Earth semimajor axis (m)
//       const b = 6356752.3142;          // WGS-84 Earth semiminor axis (m)
//       const f = (a - b) / a;           // Ellipsoid Flatness
//       const e_sq = f * (2 - f);        // Square of Eccentricity

//       // Convert to radians in notation consistent with the paper:
//       let lambda = DegreesToRadians(lon);
//       let phi = DegreesToRadians(lat);
//       let s = Math.sin(lambda);
//       let N = a / Math.sqrt(1 - e_sq * s * s);

//       let sin_lambda = Math.sin(lambda);
//       let cos_lambda = Math.cos(lambda);
//       let cos_phi = Math.cos(phi);
//       let sin_phi = Math.sin(phi);

//       let coords = {};
//       coords.x = (h + N) * cos_lambda * cos_phi;
//       coords.y = (h + N) * cos_lambda * sin_phi;
//       coords.z = (h + (1 - e_sq) * N) * sin_lambda;
//       return coords;
//     }

//     let DegreesToRadians = function(degrees) {
//       return Math.PI / 180.0 * degrees;
//     }

