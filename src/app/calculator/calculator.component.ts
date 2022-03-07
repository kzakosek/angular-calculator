import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CalculationService} from '../calculation.service';
import { CorrectAnswer, WrongAnswer} from '../model/data.model';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit{
  
  @ViewChild('result',{static: true}) result: ElementRef;

  constructor(private stateService: CalculationService, public snackBar: MatSnackBar) {}

  num1:number = 0;
  num2:number = 0;
 
  corrects$: Observable<CorrectAnswer[]>;
  wrongs$: Observable<WrongAnswer[]>;

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  datasourceWrong = this.stateService.wrong$;
  datasourceCorrect = this.stateService.correct$;
  displayedColumns: string[] = ['answer'];

  ngOnInit(): void {
    this.setValues();

    this.corrects$ = this.stateService.correct$;
    this.wrongs$ = this.stateService.wrong$;
  }

  setValues(){
    this.num1 = this.randomInteger(0, 20);
    this.num2 = this.randomInteger(0, 20);
    this.result.nativeElement.value = '';
  }

  onSubmit = () => {
    var append = null;
    var value = this.result.nativeElement.value;
    var data = this.num1.toString() + " + " + this.num2.toString() + " = " + value.toString();

    if(value != ""){
      if(this.num1 + this.num2 == value){
        data = data + "   CORRECT !";
        append = {id:0, answer:data};
        this.stateService.setCorrectData(append);
      }
      else{
        data = data + "   WRONG !";
        append = {id:0, answer:data};
        this.stateService.setWrongData(append);
      }
      this.setValues();
    }else{
        this.snackBar.open('Enter the result!', '', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: 1000,
          panelClass: ['gray-snackbar']
        });
    }
  }; 

  randomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}

 



