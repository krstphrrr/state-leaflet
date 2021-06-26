import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, ElementRef, Renderer2, RendererFactory2 } from '@angular/core';
import { geoJSON, GeoJSONOptions, latLng, tileLayer, TileLayer, Util } from 'leaflet';

import { Observable, ReplaySubject, Subject } from 'rxjs';
import { LayerService } from './layer.service';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root',
})
export class MapFactory {
  private tileURL:string = "https://landscapedatacommons.org/geoserver/statemap/wms?"
  public wmsTile!:TileLayer
  private wfsUrl:string = 'https://landscapedatacommons.org/geoserver/statemap/wfs'
  public wfsOptions = {
    service:"wfs",
    version:'2.0.0',
    request:'GetFeature',
    count:1,
    typeNames:'statemap:jerstatemapsimple',
    srsName: 'EPSG:4326',
    outputFormat: 'application/json'
  }
  private parameters = Util.extend(this.wfsOptions)
  private preppedParams = new HttpParams({fromObject:this.parameters})

  private geoJSONStyle:GeoJSONOptions= {
    style:{
      "fillColor":"black",
      "fillOpacity":0.2,
      "color":"black",
      "opacity":0.2
    },
    onEachFeature:this.layerServ.onEachFeature

  }
  
  public json:any
  
  public wfsLayer = new Subject
  public wfsLayer$:Observable<any> = this.wfsLayer.asObservable()
  

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoomControl: false,
    zoom:12,
    center: latLng(32.614074531767606, -106.70780181884767)
  };

  
  constructor(
    private layerServ:LayerService,
    private mapService:MapService,
    private http: HttpClient
    ){}

  remoteWFSGet(){
    this.http.get(this.wfsUrl, {params:this.preppedParams})
      .subscribe(json=>{
      
      this.json = json
      let actualLayer:any = geoJSON(this.json, this.geoJSONStyle)
      this.wfsLayer.next(actualLayer)
      
      actualLayer.on("data:loaded",this.layerLoad())

    }, error => console.log(error))
    
    
  }

    layerLoad(){
      console.log("HA LLEGAO")
      this.mapService.layerCheck(true)
    }
  
}