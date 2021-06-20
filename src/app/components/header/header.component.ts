import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { SelectTestState } from '../map/map.selectors';
// import { MapState } from '../map/map.state';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>()
  // public testToggle$: Observable<string>

  constructor(
    // private store:Store<{ui:MapState}>
  ) { }

  ngOnInit(): void {
    // this.testToggle$ = this.store.select(SelectTestState)
  }
  onToggleSidenav(){
    console.log("toggled")
    // this.store.dispatch({type: 'TEST_MAP_ACTION'})
    this.sidenavToggle.emit()
  }

}