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
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    // renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  clouds = null;
  isocentre = null;
  controls = null;
  radius: number = 7;
  paths = [];

  mexico = [];
  bigmexico = [];
  sydney = [];
  bigsydney = [];
  beijing = [];
  bigbeijing = [];
  sotchi = [];
  bigsotchi = [];

  gpsMexique = [
    {
      lon:37.9838096,
      lat:23.727538800000048
    },
    {
      lon:44.4056499,
      lat:8.946255999999948
    },
    {
      lon:40.4167754,
      lat:-3.7037901999999576
    },
    {
      lon:28.2574221,
      lat:-14.146604600000046
    },
    {
      lon:24.0775546,
      lat:-74.47600879999999
    },
    {
      lon:19.173773,
      lat:-96.13422409999998
    },
    {
      lon:19.685267,
      lat:-98.87211860000002
    },
    {
      lon:16.8531086 ,
      lat:-99.82365329999999
    },
    {
      lon:19.2464696,
      lat:-99.10134979999998
    }
  ];

  gpsSydney = [
    {
      lon:37.9838096,
      lat:23.727538800000048
    },
    {
      lon:-25.2334936,
      lat:130.98486980000007
    },
    {
      lon:-27.4697707,
      lat:153.02512350000006
    },
    {
      lon:-16.9185514,
      lat:145.77805480000006
    },
    {
      lon:-17.9614336,
      lat:122.23585200000002
    },
    {
      lon:-31.9505269,
      lat:115.86045719999993
    },
    {
      lon:-31.1656389,
      lat:136.81926069999997
    },
    {
      lon:-33.8688197,
      lat:151.20929550000005
    }
  ];

  gpsBeijing = [
    {
      lon:37.9838096,
      lat:23.727538800000048
    },
    {
      lon:41.0082376,
      lat:28.97835889999999
    },
    {
      lon:48.85661400000001,
      lat:2.3522219000000177
    },
    {
      lon:13.7563309,
      lat:100.50176510000006
    },
    {
      lon:27.98785,
      lat:86.92502609999997
    },
    {
      lon:22.817002,
      lat:108.36654299999998
    },
    {
      lon:31.2303904,
      lat:121.47370209999997
    },
    {
      lon:39.0392193,
      lat:125.76252410000006
    },
    {
      lon:40.2373519,
      lat:116.23046160000001
    }
  ];

  gpsSotchi = [
    {
      lon:37.9838096,
      lat:23.727538800000048
    },
    {
      lon:43.3499382,
      lat:42.44533009999998
    },
    {
      lon:45.6232258,
      lat:63.31398289999993
    },
    {
      lon:55.755826,
      lat:37.617299900000035
    },
    {
      lon:68.9585244,
      lat:33.08265970000002
    },
    {
      lon:69.35579,
      lat:88.18929389999994
    },
    {
      lon:64.7336613,
      lat:177.4968265
    },
    {
      lon:53.5587003,
      lat:108.16499650000003
    },
    {
      lon:56.83892609999999,
      lat:60.60570250000001
    },
    {
      lon:43.60280789999999,
      lat:39.7341543
    }
  ];

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
    this.camera.position.set(17,15,0);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.controls.minDistance = 0;
    this.controls.maxDistance = Infinity;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;

  }

  ngAfterViewInit() {

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    this.animate();

    for (let i = 0; i < this.gpsMexique.length - 1; i++) {
      this.mexico.push(this.drawPath(this.gpsMexique[i], this.gpsMexique[i+1], '#0480C9', 0.03, 0.5));
      this.bigmexico.push(this.drawPath(this.gpsMexique[i], this.gpsMexique[i+1], '#0480C9', 0.03, 0));
    }
    for (let i = 0; i < this.gpsSydney.length - 1; i++) {
      this.sydney.push(this.drawPath(this.gpsSydney[i], this.gpsSydney[i+1], '#50E3C2', 0.03, 0.5));
      this.bigsydney.push(this.drawPath(this.gpsSydney[i], this.gpsSydney[i+1], '#50E3C2', 0.03, 0));
    }
    for (let i = 0; i < this.gpsBeijing.length - 1; i++) {
      this.beijing.push(this.drawPath(this.gpsBeijing[i], this.gpsBeijing[i+1], '#ED1941', 0.03, 0.5));
      this.bigbeijing.push(this.drawPath(this.gpsBeijing[i], this.gpsBeijing[i+1], '#ED1941', 0.03, 0));
    }
    for (let i = 0; i < this.gpsSotchi.length - 1; i++) {
      this.sotchi.push(this.drawPath(this.gpsSotchi[i], this.gpsSotchi[i+1], '#86450C', 0.03, 0.5));
      this.bigsotchi.push(this.drawPath(this.gpsSotchi[i], this.gpsSotchi[i+1], '#86450C', 0.03, 0));
    }

    // this.mexico = this.drawPath(this.gpsAthens, this.gpsMexico, '#0480C9', 12, 0.04, 0.6);
    // this.bigmexico = this.drawPath(this.gpsAthens, this.gpsMexico, '#0480C9', 12, 0.08, 0);
    // this.sydney = this.drawPath(this.gpsAthens, this.gpsSydney, '#50E3C2', 10.5, 0.04, 0.6);
    // this.bigsydney = this.drawPath(this.gpsAthens, this.gpsSydney, '#50E3C2', 10.5, 0.08, 0);
    // this.beijing = this.drawPath(this.gpsAthens, this.gpsBeijing, '#ED1941', 13, 0.04, 0.6);
    // this.bigbeijing = this.drawPath(this.gpsAthens, this.gpsBeijing, '#ED1941', 13, 0.08, 0);
    // this.sotchi = this.drawPath(this.gpsAthens, this.gpsSotchi, '#86450C', 14.5, 0.04, 0.6);
    // this.bigsotchi = this.drawPath(this.gpsAthens, this.gpsSotchi, '#86450C', 14.5, 0.08, 0);


    this.animate();
  }

  animate() {
    window.requestAnimationFrame(() => this.animate());

    this.clouds.rotation.y += .0005;
    this.isocentre.rotation.y += .001;

    this.renderer.render(this.scene, this.camera);
    // setInterval(() => this.controls.constraint.dollyIn(10), 2000)
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
    const starGeometry = new THREE.SphereGeometry(80, 20, 20);
    const starMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.ImageUtils.loadTexture("./assets/2048x1024.png"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
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

  enter(city) {
    // this[city].material.color.setHex( 0xffffff );
    let bigCity = 'big' + city;
    for (let i = 0; i < this[bigCity].length; i++) {
      this[bigCity][i].material.opacity = 0.7;
    }
  }
  leave(city, color) {
    // this[city].material.color.setHex( color );
    let bigCity = 'big' + city;
    for (let i = 0; i < this[bigCity].length; i++) {
      this[bigCity][i].material.opacity = 0;
    }
  }

  drawPath(start, end, color, radius, opacity) {

    let height = 15 - (this.distanceInKmBetweenEarthCoordinates(start.lat, start.lon, end.lat, end.lon) / 2500);

    let startCoords = this.convertToCartesian(start.lon, start.lat);
    let endCoords = this.convertToCartesian(end.lon, end.lat);

    var vT = new THREE.Vector3(startCoords.x, startCoords.y, startCoords.z);
    var vF = new THREE.Vector3(endCoords.x, endCoords.y, endCoords.z);

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

    var smoothDist = map(dist, 0, height, 0, 15/dist );
    
    mid.setLength( this.radius * smoothDist );
    
    cvT.add(mid);
    cvF.add(mid);
    
    cvT.setLength( this.radius * smoothDist );
    cvF.setLength( this.radius * smoothDist );

    function map( x, in_min, in_max, out_min, out_max){
      return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    var curve = new THREE.CubicBezierCurve3( vF, cvF, cvT, vT );

    var geometry = new THREE.TubeGeometry( curve, 20, radius, 8, false );
    var material = new THREE.MeshBasicMaterial( { color: color, transparent: true, opacity: opacity } );
    var mesh = new THREE.Mesh( geometry, material );
    this.isocentre.add( mesh );

    return mesh;
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }
  
  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
  
    var dLat = this.degreesToRadians(lat2-lat1);
    var dLon = this.degreesToRadians(lon2-lon1);
  
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
  
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }

}