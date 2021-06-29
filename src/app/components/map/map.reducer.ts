import { Action, createReducer, on, } from '@ngrx/store';
import { MapViewProperties } from 'src/app/models/map-view-properties';
import { ServiceStatusTypes } from 'src/app/models/service-status.types';
import { ServiceStatus } from 'src/app/models/service-status'
import * as MapActions from './map.actions';
import { MapState, WebMapTiles } from './map.state';




const initialState: MapState = {
  status: new ServiceStatus(ServiceStatusTypes.content)
};

export function mapReducer(state = initialState, action: Action): MapState {
  return reducer(state, action);
}

const reducer = createReducer(
  initialState,
  on(MapActions.UpdateMapViewProperties, (state, action) => {
      return updateMapViewProperties(state, action.mapViewProperties);
  }),
  on(MapActions.UpdateLoadedTiles, (state,action)=>{
    return updateLoadedTiles(state, action.webMap)
  })
);

function updateMapViewProperties(state: MapState, mapViewProperties: MapViewProperties): MapState {
  return {
      ...state,
      mapViewProperties: {
          ...state.mapViewProperties,
          ...mapViewProperties
      }
  };
}

function updateLoadedTiles(state:MapState, tile:WebMapTiles):MapState{
  console.log(state, tile)
  return {
    ...state,
    webMap:tile
  }
}

