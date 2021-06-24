
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'leaflet';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { tap, map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MapService{
  private layerLoaded = new BehaviorSubject<boolean>(false)
  private showTile = new BehaviorSubject<boolean>(false)
  private mapUpdate = new BehaviorSubject<Map|null>(null)

  public map$:Observable<any>= this.mapUpdate.asObservable()
  public wmsTile$:Observable<any> = this.showTile.asObservable()
  public layerReady$:Observable<any> = this.layerLoaded.asObservable()

  receiveMap(map:Map){
    this.mapUpdate.next(map)
  }

  mapCheck(state:boolean){
    this.showTile.next(state)
  }

  layerCheck(state:boolean){
    this.layerLoaded.next(state)
  }
}