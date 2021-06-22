import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, DomUtil, ZoomAnimEvent , Layer, MapOptions, tileLayer, latLng} from 'leaflet';
import { MapService } from './map.service';

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

  constructor(
    private mapService: MapService
  ) {
    
    
   }
  

  ngOnInit(){
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      ],
      zoomControl: false,
      zoom: 5,
      center: latLng(34.125448,-106.079642)
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
