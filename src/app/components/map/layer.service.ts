import { Injectable } from '@angular/core';
import { PathOptions, Polygon } from 'leaflet';
import { MapComponent } from './map.component';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  public highlightStyle: PathOptions={
    "color": "black",
    "fillOpacity":0.5,
    "fillColor":(this.randomColor()),
    "opacity":1
  }

  public resetStyle:PathOptions= {
    "color": "black",
    "fillOpacity":0.2,
    "fillColor":"black"
  }
  
  
  constructor() {
    
   }

  randomColor():string{
    let poss = ["orange", "green", "blue", "purle", "red","yellow","white","pink","teal"]
    function getRandomInt(max:any){
      return Math.floor(Math.random() * max);
    }
    return poss[getRandomInt(9)]
  }


  onEachFeature=(feature:any,layer:Polygon)=>{
    layer.on("mouseover", (e) =>{
      layer.setStyle(this.highlightStyle)
    })
    layer.on("mouseout", (e)=>{
      layer.setStyle(this.resetStyle)
    })
   }
}
