import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule} from "@angular/material/input"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatCheckboxModule } from "@angular/material/checkbox"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatListModule } from "@angular/material/list"
import { MatTabsModule } from "@angular/material/tabs"
import { MatSelectModule } from "@angular/material/select"
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatDialogModule } from "@angular/material/dialog"
import { MatGridListModule } from "@angular/material/grid-list"
import {MatExpansionModule} from '@angular/material/expansion';



@NgModule({
  imports: [MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatSidenavModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatCheckboxModule,
            MatToolbarModule,
            MatCardModule,
            MatListModule,
            MatTabsModule,
            MatSelectModule,
            MatProgressSpinnerModule,
            MatDialogModule,
            MatGridListModule,
            MatExpansionModule

          ],
  exports: [MatButtonModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            MatSidenavModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatCheckboxModule,
            MatToolbarModule,
            MatCardModule,
            MatListModule,
            MatTabsModule,
            MatSelectModule,
            MatProgressSpinnerModule,
            MatDialogModule,
            MatGridListModule,
            MatExpansionModule

          ]
})
export class MaterialModule {}