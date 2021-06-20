
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Map } from 'leaflet';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
// import { tap, map, catchError, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MapService{
  private map = new Subject()
  private mapUpdate = new BehaviorSubject<any>("a")
  map$:Observable<any>= this.mapUpdate.asObservable()


  getMap(){
    return this.map$
  }

  receiveMap(map:Map){
    
    this.mapUpdate.next(map)
  }
}