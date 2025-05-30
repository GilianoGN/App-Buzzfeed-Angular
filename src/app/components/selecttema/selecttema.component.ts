import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Option {
  id: number;
  name: string;
  alias: number;
}

interface Question {
  id: number;
  question: string;
  option: Option[];
}

interface Quiz {
  id: number;
  tema: string;
  image: string;
  questions: Question[];
  results: {[key:string]:string};
}

@Component({
  selector: 'app-selecttema',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './selecttema.component.html',
  styleUrl: './selecttema.component.css'
})

export class SelecttemaComponent {
  @Input() AllQuizz: Quiz[] = [];
  @Output() themeSelected = new EventEmitter<number>();

  constructor(){ }

  selectQ(id: number) {
    this.themeSelected.emit(id);
  }
}
