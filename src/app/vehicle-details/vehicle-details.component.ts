import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {Vehicle} from "../model/vehicle";
import {CommonModule, NgForOf} from "@angular/common";
import {VehicleService} from "../services/vehicle.service";
import {FormBuilder} from "@angular/forms";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {MatIconButton} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'vehicle-details',
  templateUrl: 'vehicle-details.component.html',
  styleUrl: 'vehicle-details.component.css',
  imports: [
    CommonModule, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatIconButton
  ],
  standalone: true
})
export class VehicleDetailsComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  refreshDetails: boolean = false;

  @Output()
  editVehicleInformation: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();

  displayedColumns: string[] = ['id', 'make', 'model', 'year', 'vin', 'actions'];
  dataSource!: MatTableDataSource<Vehicle>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  vehicle: Vehicle = {
    make: 'test',
    model:'model',
    year: 2023,
    vin: 'sin'
  };
  vehicleList: Vehicle[] = [
    {
      make: 'test',
      model:'model',
      year: 2023,
      vin: 'sin'
    },
    {
      make: 'test',
      model:'model',
      year: 2023,
      vin: 'sin'
    }
  ];


  constructor(private formBuilder: FormBuilder, private vehicleService: VehicleService) {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllVehicles(): void {

    /*this.vehicleService.getAllVehicles().subscribe(value => {
      this.vehicleList = value;
      this.dataSource = new MatTableDataSource<Vehicle>(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });*/
    this.vehicleService.getAllVehicles().subscribe({
      next: (vehicleArray: Vehicle[])=> {
        this.vehicleList = vehicleArray;
        this.dataSource = new MatTableDataSource<Vehicle>(this.vehicleList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(vehicleArray);
      }, error: () => {
      this.vehicleList =[];
      console.log("error occurred");
    }});
  }

  editVehicle(vehicle: Vehicle): void {
  this.editVehicleInformation.emit(vehicle);
  }

  deleteVehicle(id: number): void {
    this.vehicleService.deleteVehicle(id).subscribe({
      next: (response: any) => {
        console.log(response);
        this.getAllVehicles();
      }, error:(res)=> {
        console.log(res);
        console.log('error occurred');
      }
    })
  }
  ngOnInit() {
  this.getAllVehicles();
  }

  ngOnChanges(): void {
    if (this.refreshDetails) {
      this.getAllVehicles();
    }
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  console.log('view rendered');
  }
}
