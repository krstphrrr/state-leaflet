import { createReducer, on } from '@ngrx/store';

import { checked, unchecked } from './app.actions';


export interface CheckboxState {
  check:boolean;
}
export const initialState:CheckboxState = {
  check:false
}

const _checkboxReducer = createReducer(
  initialState,
  on(checked, (state)=>checkYes(state)),
  on(unchecked,(state)=>checkNo(state))
)

const checkYes=(state:CheckboxState):CheckboxState=>{
  return {
    ...state,
    check:true
  }
}

const checkNo=(state:CheckboxState):CheckboxState=>{
  return {
    ...state,
    check:false
  }
}

export function checkboxReducer(state:any,action:any){
  return _checkboxReducer(state,action)
}