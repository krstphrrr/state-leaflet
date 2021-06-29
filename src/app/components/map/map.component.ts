import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, Layer, MapOptions, tileLayer, latLng, GeoJSON, geoJSON, TileLayer, GeoJSONOptions, Polygon, PolylineOptions, PathOptions, Util} from 'leaflet';
import { MapService } from './map.service';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { LayerService } from './layer.service';
import { MapFactory } from './map.factory';
import { MapViewProperties } from 'src/app/models/map-view-properties';
import { Action, Store } from '@ngrx/store';
import { selectCheckbox, selectMapViewPropertiesExtent, selectWebMap } from './map.selectors';
import * as MapActions from './map.actions'
import { filter, takeUntil } from 'rxjs/operators';
// import { WebMapDocument } from './map.state';

interface CheckObj{
  check:boolean
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit,OnDestroy  {

  public options!: MapOptions 
  public map!: Map;
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
  // private URL = this.wfsUrl + Util.getParamString(this.parameters)
  private properGeo = geoJSON()
  // public testLayer:any =geoJSON('https://landscapedatacommons.org/geoserver/statemap/wfs')
  public json:any
  /// polygon editing test
  public testLayer:any 
  private checkboxSub!:Subscription
  private wfsSubs:Subscription

  private mapViewPropertiesSubject: Subject<MapViewProperties> = new Subject

  private dispatchTriggeredByMap = false;
  // mapViewPropertiesSubject = new Subject();
  private check$!: Observable<any>
  private map$!:Observable<any>
  public storedOptions!:any

  
  private geoJSONStyle:GeoJSONOptions= {
    style:{
      "fillColor":"black",
      "fillOpacity":0.2,
      "color":"black",
      "opacity":0.2
    },
    onEachFeature:this.layerServ.onEachFeature

  }
  
  

  constructor(
    private mapService: MapService,
    private http:HttpClient,
    private layerServ: LayerService,
    private mapFactory: MapFactory,
    private store: Store<{check:boolean,map:{}}>
  ) {
    this.check$=store.select('check')
    this.map$= store.select('map')
    this.check$.subscribe((chk)=>{
      this.tileCheck(chk.check)
    })

    this.map$.subscribe(e=>{
      console.log(e)
      if(e.hasOwnProperty('mapViewProperties')){
       this.storedOptions = e.mapViewProperties
      }
    })

    this.mapFactory.remoteWFSGet()
    
    this.wfsSubs = this.store.subscribe(layer=>{
      this.testLayer = layer
    })
    
    
    this.checkboxSub = this.mapService.wmsTile$.subscribe(check=>{
      this.tileCheck(check)
    })

    
    this.initializeWatch(this.map)
    this.mapViewPropertiesSubject
            // .pipe(debounceTime(150))
            .subscribe((mapViewProperties:MapViewProperties) => {
                this.dispatchMapAction(MapActions.UpdateMapViewProperties({mapViewProperties: mapViewProperties}));
                this.dispatchTriggeredByMap = false;
            });


    this.wmsTile = tileLayer.wms(this.tileURL,{
      layers:"statemap:jerstatemapsimple",
      format:"image/png",
      version:"1.1.0",
      transparent:true
      
    })
   }

   layerLoad(){
     this.mapService.layerCheck(true)
   }
   private dispatchMapAction(action: Action): void {
    this.dispatchTriggeredByMap = true;
    try {
        this.store.dispatch(action);
    } finally {
        this.dispatchTriggeredByMap = false;
    }
}

  mapStateRecall(options:{}){
    if(this.storedOptions){
      return {
        ...options,
        zoom:this.storedOptions.zoom,
        center:this.storedOptions.center,
        bounds:this.storedOptions.extent
      }
    } else {
      return this.mapFactory.options
    }
    
  }

  checkStateRecall(){
  // if(this.)
  }
  

  ngOnInit(){
    this.options = this.mapStateRecall(this.mapFactory.options)

    this.mapStateRecall(this.mapFactory.options)
    
  }

  
  

  addTile(){
    if(this.map && this.wmsTile){
      // this.wmsTile.addTo(this.map)
      this.testLayer.addTo(this.map)
    }
  }

  removeTile(){
    if(this.map && this.wmsTile){
      // this.map.removeLayer(this.wmsTile)
      this.map.removeLayer(this.testLayer)
    }
  }

  
  ngOnDestroy(): void {
    this.checkboxSub.unsubscribe()
  }

  tileCheck(state:boolean){
    switch(state){
      case true:
        // console.log(state)
        this.addTile()
        break
      case false:
        // console.log(state)
        this.removeTile()
        break
      default:
        console.log("hola")
    }
  }
  private initializeWatch(map:Map): void {
    if(map){
      let obj:MapViewProperties = {
        center:map.getCenter(),
        extent:map.getBounds(),
        zoom:map.getBoundsZoom(map.getBounds())
      }
      
      this.mapViewPropertiesSubject.next(obj)
    }
    // this.mapView.watch('extent', (extent: Extent) => {
    //     this.mapViewPropertiesSubject.next({
    //         center: extent.center,
    //         zoom: this.mapView.zoom,
    //         extent: extent
    //     });
    // });
}

  onMapReady(map: Map) {
    if(this.store){

    }
    this.map = map
    this.mapService.receiveMap(map)
    

    
    if(this.map){
      this.map.on("zoomend", (e)=>{
        this.initializeWatch(this.map)
        
        // this.initializeWatch(this.map)
        // console.log(e.target)
        // console.log(e.target._zoom)
      })
    }
  }

}

function debounceTime(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
// https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&ouputFormat=application/json
// https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&outputFormat=application/json