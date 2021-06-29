import { MapViewProperties } from "src/app/models/map-view-properties";
import { ServiceStatus } from "src/app/models/service-status";

export class WebMapTiles {
  layers: any

}


export interface MapState {
  status: ServiceStatus;
  mapViewProperties?: MapViewProperties;
  webMap?:WebMapTiles

}
