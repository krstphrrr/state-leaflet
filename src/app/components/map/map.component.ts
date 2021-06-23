import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, Layer, MapOptions, tileLayer, latLng, GeoJSON, geoJSON} from 'leaflet';
import { MapService } from './map.service';
import { HttpClient} from '@angular/common/http';

declare module 'leaflet' {
  interface Control {
     _addTo(map: Map): Control;
  }
  interface Map {
    _leaflet_id: number;
    _container: HTMLElement;
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit,OnDestroy  {

  public options!: MapOptions 
  public map!: Map;
  public testOptions:any = {
    service:"wfs",
    version:'2.0.0',
    request:'GetFeature',
    typeNames:'statemap:jerstatemapsimple',
    srsName: 'EPSG:4326',
    ouputFormat: 'application/json'
  }
  // public testLayer:any =geoJSON('https://landscapedatacommons.org/geoserver/statemap/wfs')
  public json:any
  public testLayer:any 


  constructor(
    private mapService: MapService,
    private http:HttpClient
  ) {
    this.http.get('https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&count=100&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&outputFormat=application/json').subscribe(json=>{
      // console.log(json)
      this.json = json
      this.testLayer = geoJSON(this.json)
      console.log(this.testLayer)
      if(this.testLayer && this.map){
        this.testLayer.addTo(this.map)
      }
    })
    
    
   }
  

  ngOnInit(){
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        
      ],
      zoomControl: false,
      zoom:11,
      center: latLng(32.57,-106.757537)
    };

    // Use a compact attribution control for small map container widths
    
      
        // update on map resize
       
      
  }

  ngOnDestroy(): void {

  }

  onMapReady(map: Map) {
    map = map.invalidateSize()
    this.map = map;
    this.mapService.receiveMap(map)

  }

}
