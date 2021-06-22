import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CRS,Map, Control, DomUtil, MapOptions, tileLayer, latLng, marker, icon, LocationEvent, GeoJSON , } from 'leaflet';
import { Subscription } from 'rxjs';
import { MapService } from './components/map/map.service';
import  'leaflet-wfst'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  // private wfstOptions = {
  //   crs: CRS.EPSG4326,
  //   showExisting:true,
  //   url:``,
  //   count:90,
  //   request: 'GetFeature',
  //   service: 'WFS',
  //   typeName: 'statemap:jerstatemapsimple',
  //   version: '2.0.0',
  //   opacity: 1
  // }
  // public layer= new WFST(this.wfstOptions)
  //map variables
  public rtr!:Router
  public map: Map[]=[]
  private zoom: number[] = [];
  title = 'state-leaflet';
  
  public map1options:MapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      // this.layer
    ],
    zoomControl: false,
    zoom: 5,
    center: latLng(34.125448,-106.079642)
  };

  constructor(
    private router:Router,
    
  ){
    this.rtr = router
    
  }

  receiveMap(map: Map, id: any) {
    this.map[id] = map;
   
  }
  
}
