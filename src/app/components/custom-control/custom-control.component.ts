import { Component, OnInit, OnDestroy, Input, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import {Map, Control, DomUtil, ControlPosition, LatLng, DomEvent} from 'leaflet';
import { MapService } from '../map/map.service';
// ngrx 
import { Store } from '@ngrx/store'
import {checked, unchecked} from '../../app.actions'


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
  private layerLoaded!: Subscription;
  public layerReady:boolean = true

  check$!: Observable<boolean>

  constructor( 
    private mapService: MapService,
    private store: Store<{ check:boolean}>
    ) { 
    this.check$ = store.select('check')
    
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

  toCheck(){
    this.store.dispatch(checked())
  }
  toUncheck(){
    this.store.dispatch(unchecked())
  }

  ngOnInit() {
    this.layerLoaded = this.mapService.layerReady$.subscribe(loaded=>{
      console.log(loaded)
      if(loaded){
        this.enabling()
      }
    })

  }

  enabling(){
    this.layerReady = !this.layerReady
  }
  onCheck(event:any){
    switch (event.checked){
      case true:
        this.toCheck()
        break 
      case false:
        this.toUncheck()
        break
    }
    this.mapService.mapCheck(event.checked)
  }
  

  ngOnDestroy() {
    console.log("destruido")
    this.mapSubscribe.unsubscribe()
    if(this._map){
      this._map.removeControl(this.custom);
    }
  }



}
