import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../model/vehicle";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn : "root"
})
export class VehicleService {

  private getAllVehicleUrl: string = 'http://localhost:8080/get/vehicles';
  private getVehicleByIdUrl: string = 'http://localhost:8080/get/vehicles/';
  private postVehicleUrl: string = 'http://localhost:8080/save/vehicle';
  private putVehicleUrl: string= 'http://localhost:8080/update/vehicle';
  private deleteVehicleUrl: string = 'http://localhost:8080/delete/vehicle/';

  constructor(private http:HttpClient) {
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.getAllVehicleUrl);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(this.getVehicleByIdUrl+id);
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.postVehicleUrl, vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(this.putVehicleUrl, vehicle);
  }

  deleteVehicle(id: number): Observable<Object> {
    return this.http.delete(this.deleteVehicleUrl+id, {responseType: 'text'});
  }
 }
