import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Map, Control, Layer, MapOptions, tileLayer, latLng, GeoJSON, geoJSON, TileLayer, GeoJSONOptions, Polygon, PolylineOptions, PathOptions} from 'leaflet';
import { MapService } from './map.service';
import { HttpClient} from '@angular/common/http';
import { Subscription } from 'rxjs';

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
  private tileURL:string = "https://landscapedatacommons.org/geoserver/statemap/wms?"
  public wmsTile!:TileLayer
  // public testOptions:any = {
  //   service:"wfs",
  //   version:'2.0.0',
  //   request:'GetFeature',
  //   typeNames:'statemap:jerstatemapsimple',
  //   srsName: 'EPSG:4326',
  //   ouputFormat: 'application/json'
  // }
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
    onEachFeature:this.onEachFeature

  }
  private highlightStyle:{} = {
    "color": "yellow",
    "fillOpacity":0.5,
    "fillColor":"orange"
  }
  private resetStyle= {
    "color": "black",
    "fillOpacity":0.2,
    "fillColor":"black"
  }

  // ?service=WMS&
  // version=1.1.0&
  // request=GetMap&layers=
  // statemap%3Ajerstatemapsimple
  // srs=EPSG%3A32613&format=application/openlayers
  constructor(
    private mapService: MapService,
    private http:HttpClient
  ) {
    this.http.get('https://landscapedatacommons.org/geoserver/statemap/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=statemap:jerstatemapsimple&srsName=EPSG:4326&outputFormat=application/json').subscribe(json=>{
      // console.log(json)
      this.json = json
      this.testLayer = geoJSON(this.json, this.geoJSONStyle)
      console.log(this.testLayer)
      this.testLayer.on("data:loaded",this.layerLoad())
      // if(this.testLayer && this.map){
      //   this.testLayer.addTo(this.map)
      // }
    })
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

   onEachFeature(feature:any,layer:Polygon){
    
    function randomColor():string {
      let poss = ["orange", "green", "blue", "purle", "red","yellow","white","pink","teal"]
      function getRandomInt(max:any) {
        return Math.floor(Math.random() * max);
      }
      return poss[getRandomInt(9)]
    }
    layer.on("mouseover", (e) =>{
      // console.log(randomColor())
      layer.setStyle({
        "color": "black",
        "fillOpacity":0.5,
        "fillColor":randomColor(),
        "opacity":1

      })
    })
    layer.on("mouseout", (e)=>{
      layer.setStyle({
        "color": "black",
        "fillOpacity":0.2,
        "fillColor":"black",
        "opacity":0.2
      })
    })
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
