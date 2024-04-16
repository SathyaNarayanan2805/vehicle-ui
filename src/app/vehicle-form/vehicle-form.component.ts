import {Component, EventEmitter, Inject, OnInit, Output} from "@angular/core";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

import {VehicleService} from "../services/vehicle.service";
import {Vehicle} from "../model/vehicle";
import {MatCheckbox, MatCheckboxModule} from "@angular/material/checkbox";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {DialogRef} from "@angular/cdk/dialog";
import {CoreServices} from "../services/core.services";


@Component({
  selector: 'vehicle-form',
  templateUrl: 'vehicle-form.component.html',
  styleUrl: 'vehicle-form-component.css',
  imports: [
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatDialogContent,
    MatFormFieldModule,
    MatInputModule
  ],
  standalone: true
})
export class VehicleFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private vehicleService: VehicleService,
              private coreService: CoreServices,
              private dialogRef: MatDialogRef<VehicleFormComponent>,
              @Inject(MAT_DIALOG_DATA) public vehicle: Vehicle) {
  }

  vehicleForm = this.formBuilder.group({
    id: [null],
    make: ['', [Validators.required]],
    model: ['', [Validators.required]],
    year: [0, [Validators.required, Validators.pattern(/^[0-9]{4}$/)]],
    vin: ['', [Validators.required]],
    updateVehicle: [false]
  });

  onCancel():void {
    this.dialogRef.close(false);
  }
  onSubmit () {
    console.log(this.vehicleForm.getRawValue());
    if (this.vehicleForm.valid) {
      if(this.vehicle) {
        this.vehicleService.updateVehicle(this.vehicleForm.value as Vehicle).subscribe({
            next:(vehicle) => {
              this.coreService.openSnackBar('Vehicle updated successfully','Ok');
              this.dialogRef.close(true);
            }, error:(res) => {
              console.log(res);
              this.dialogRef.close(true);
            }
          }

        );
      } else {
        this.vehicleService.addVehicle(this.vehicleForm.value as Vehicle).subscribe({
          next:(vehicle : Vehicle) => {
            this.coreService.openSnackBar('Vehicle added successfully', 'Ok');
            this.dialogRef.close(true);
          }, error:(res) =>{
            console.log(res);
            this.dialogRef.close(true);
          }
        });
      }
      this.vehicleForm.reset();
    }
  }

  ngOnInit() {
    if (this.vehicle) {
      this.vehicleForm.patchValue(this.vehicle);
    }

  }
}
