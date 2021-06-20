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
  @Output() map$: EventEmitter<Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options!: MapOptions 
  public map!: Map;
  private zoom!: number;
  private loadingOptions: any={
    position: 'topleft',
    zoomControl: false,
  };
  constructor(
    private mapService: MapService
  ) {
    
   }
  

  ngOnInit(){

    // Use a compact attribution control for small map container widths
    
      
        // update on map resize
       
      
  }

  ngOnDestroy(): void {
    this.map.clearAllEventListeners()
    this.map.remove();
  }

  onMapReady(map: Map) {
    this.map = map;
    this.map$.emit(map);
    
    
    // this.mapService.receiveMap(this.map)
  }

  // onMapZoomEnd(e: ZoomAnimEvent) {
  //   this.zoom = e.target.getZoom();
  //   this.zoom$.emit(this.zoom);
  // }

}
