import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {VehicleDetailsComponent} from "./vehicle-details/vehicle-details.component";
import {VehicleFormComponent} from "./vehicle-form/vehicle-form.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {Vehicle} from "./model/vehicle";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {CoreServices} from "./services/core.services";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    VehicleDetailsComponent,
    VehicleFormComponent,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginator, MatPaginatorModule,
    MatSort, MatSortModule,
    MatSnackBarModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Vehcicle-ui';
  refreshDetails: boolean = false;

  constructor(private dialog: MatDialog) {
  }

  openVehicleForm() {
    this.refreshDetails = false;
    const dialogRef = this.dialog.open(VehicleFormComponent);
    dialogRef.afterClosed().subscribe({
      next:(value) => {
        if (value) {
          this.refreshDetails = true;
          console.log('added');

        }
      }
    });
  }

  editVehicleInformation(vehicle: Vehicle):void {
    console.log('edit vehicle');
    this.refreshDetails = false;
    const dialogRef = this.dialog.open(VehicleFormComponent, {data : vehicle});
    dialogRef.afterClosed().subscribe({
      next:(value) => {
        if (value) {
          this.refreshDetails = true;
          console.log('updated');

        }
      }
    });
  }
}
