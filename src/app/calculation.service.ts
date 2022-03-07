import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CorrectAnswer, WrongAnswer } from './model/data.model';

@Injectable({
    providedIn: 'root'
  })

export class CalculationService {

  constructor() { }

  private _correct$ = new BehaviorSubject<CorrectAnswer[]>([]);
  readonly correct$ = this._correct$.asObservable();

  private _wrong$ = new BehaviorSubject<WrongAnswer[]>([]);
  readonly wrong$ = this._wrong$.asObservable();

  private corrects: CorrectAnswer[] = [];
  private wrongs: WrongAnswer[] = [];
  private correctNextId = 0;
  private wrongNextId = 0;

  /* load(){

  } */

  setCorrectData(item: CorrectAnswer){
    item.id = ++this.correctNextId;

    this.corrects.push(item);
    this._correct$.next(Object.assign([], this.corrects));
  }

  setWrongData(item: WrongAnswer){
    item.id = ++this.wrongNextId;

    this.wrongs.push(item);
    this._wrong$.next(Object.assign([],this.wrongs));
  }
}



