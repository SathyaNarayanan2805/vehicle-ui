import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CoreServices{


  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string,  action: string) {
    this.snackBar.open(message, action ? action : 'Ok',{
      duration: 1000,
      verticalPosition: 'top'
    });
  }
}
