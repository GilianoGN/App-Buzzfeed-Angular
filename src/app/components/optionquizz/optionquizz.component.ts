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

@Component({
  selector: 'app-optionquizz',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './optionquizz.component.html',
  styleUrl: './optionquizz.component.css'
})
export class OptionquizzComponent {
  @Input() questionSel:Question | undefined;
  @Output() playerCh = new EventEmitter<number>();

  constructor() { }

  playerCho(id: number) {
    this.playerCh.emit(id);
  }

}
