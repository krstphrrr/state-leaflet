import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, Layer, MapOptions, tileLayer, latLng, GeoJSON, geoJSON, TileLayer, GeoJSONOptions, Polygon, PolylineOptions, PathOptions, Util} from 'leaflet';
import { MapService } from './map.service';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Subscription } from 'rxjs';
import { LayerService } from './layer.service';


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
  private url1 = 'https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&count=1&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&outputFormat=application/json'
  private url2 = 'https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&count=100&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&ouputFormat=application/json'
  private parameters = Util.extend(this.wfsOptions)
  private preppedParams = new HttpParams({fromObject:this.parameters})
  // private URL = this.wfsUrl + Util.getParamString(this.parameters)
  private properGeo = geoJSON()
  // public testLayer:any =geoJSON('https://landscapedatacommons.org/geoserver/statemap/wfs')
  public json:any
  /// polygon editing test
  public testLayer:any 
  private checkboxSub!:Subscription

  
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
    private layerServ: LayerService
  ) {
    
    this.http.get(this.wfsUrl, {params:this.preppedParams})
      .subscribe(json=>{
      
      this.json = json
      this.testLayer = geoJSON(this.json, this.geoJSONStyle)
      console.log(this.testLayer)
      this.testLayer.on("data:loaded",this.layerLoad())

    }, error => console.log(error))
    
    this.checkboxSub = this.mapService.wmsTile$.subscribe(check=>{
      this.tileCheck(check)
    })

      

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

   
  

  ngOnInit(){
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        
      ],
      zoomControl: false,
      zoom:12,
      center: latLng(32.614074531767606, -106.70780181884767)
    };
      
  }

  
  getZoom(map:Map){
    map.on("tileload",(e)=>{
      console.log(e)
    })
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

  onMapReady(map: Map) {
    map = map.invalidateSize()
    this.map = map
    this.mapService.receiveMap(map)
    if(this.map){
      this.map.on("zoomend", (e)=>{
        
        console.log(e.target)
        console.log(e.target._zoom)
      })
    }
  }

}
// https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&ouputFormat=application/json
// https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&outputFormat=application/json