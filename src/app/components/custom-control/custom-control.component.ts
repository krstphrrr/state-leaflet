import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Map, Control, DomUtil, ControlPosition, LatLng, DomEvent} from 'leaflet';

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
  selector: 'app-custom-control',
  templateUrl: './custom-control.component.html',
  styleUrls: ['./custom-control.component.sass']
})
export class CustomControlComponent implements OnInit, OnDestroy, AfterViewInit {
  private _map!: Map;
  public custom!: Control;
  private _div!:HTMLElement|null
  
  @Input() position: ControlPosition = "topleft"

  constructor( private changeDetector: ChangeDetectorRef) { 
  }
  ngAfterViewInit(): void {
    this.map
  }

  ngOnInit() {
    // this.currentLocation = new LocData();
  }
  

  ngOnDestroy() {
    this._map.removeControl(this.custom);
    // this._map.off('click', this.onClick);
  }

  @Input() set map(map: Map){
    if (map){
      this._map = map;
      let _div = DomUtil.get('custom') 
      let Custom = Control.extend({
        onAdd(map: Map){
          if(_div){
            DomEvent.disableClickPropagation(_div)
            return _div
          } else {
            return _div
          }
        },
        onRemove(map: Map) {}
      });
      this.custom=new Custom({
          position: this.position
        }).addTo(map);
      
    }
  }

}
