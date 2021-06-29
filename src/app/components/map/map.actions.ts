import { createAction, props } from '@ngrx/store';

import { MapViewProperties } from '../../models/map-view-properties';
import { WebMapTiles } from './map.state';

export enum MapActionTypes {
  UpdateMapViewProperties = 'UPDATE_MAP_VIEW_PROPERTIES',
  UpdateLoadedTiles = 'UPDATE_LOADED_TILES'
}

export const UpdateMapViewProperties = createAction(
  MapActionTypes.UpdateMapViewProperties,
  props<{mapViewProperties: MapViewProperties}>()
);

export const UpdateLoadedTiles = createAction(
  MapActionTypes.UpdateLoadedTiles,
  props<{webMap:WebMapTiles}>()
)
