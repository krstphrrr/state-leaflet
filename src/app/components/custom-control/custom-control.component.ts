import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import {Map, Control, DomUtil, ControlPosition, LatLng, DomEvent} from 'leaflet';
import { MapService } from '../map/map.service';

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
  private preCustom!:any 
  private custom!: Control;
  private _div!:HTMLElement|null
  private mapSubscribe:Subscription
  
  private position: ControlPosition = "topleft"
  private layerLoaded: Subscription;
  public layerReady:boolean = true

  constructor( private mapService: MapService) { 
    this.layerLoaded = this.mapService.layerReady$.subscribe(loaded=>{
      if(loaded){
        this.enabling()
      }
    })
    this.mapSubscribe = this.mapService.map$.subscribe(map=>{

      if (map){
        this._map = map;
        let _div = DomUtil.get('custom') 
        this.preCustom = Control.extend({
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
      }
    })
  }
  ngAfterViewInit(): void {
    this.custom=new this.preCustom({
      position: this.position
    }).addTo(this._map); 
  }

  ngOnInit() {

  }

  enabling(){
    this.layerReady = !this.layerReady
  }
  onCheck(event:any){
    // console.log(event.checked)
    this.mapService.mapCheck(event.checked)
  }
  

  ngOnDestroy() {
    this.mapSubscribe.unsubscribe()
    if(this._map){
      this._map.removeControl(this.custom);
    }
  }



}
