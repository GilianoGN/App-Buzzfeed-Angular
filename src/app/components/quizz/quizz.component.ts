import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import  allQuizzesData from '../../assets/data/quizz_questions.json'

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
  selector: 'app-quizz',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})

export class QuizzComponent implements OnInit{
  tema:string = "";
  quizzImage:string = "";

  questions:Question[] = [];
  questionSelect:Question | undefined;

  answers:number = 0;
  answersSelect:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  selectTema:boolean = true;
  finished:boolean = false;

  allQuizzes: Quiz[] = [];

  private currentQuiz: Quiz | undefined;

  constructor() {}

  ngOnInit(): void {
      if(allQuizzesData){
        this.allQuizzes = allQuizzesData as Quiz[];
        this.selectTema = true;
        this.finished = false;
      } else {
        alert("Erro ao carregar dados dos quizes.");
      }
  }

  selectQuiz(id: number): void {
    this.currentQuiz = this.allQuizzes.find(quiz => quiz.id === id);
    if (this.currentQuiz) {
      this.selectTema = false;
      this.finished = false;

      this.tema = this.currentQuiz.tema;
      this.quizzImage = this.currentQuiz.image;
      this.questions = this.currentQuiz.questions;

      this.questionIndex = 0;
      this.questionSelect = this.questions[this.questionIndex];
      this.questionMaxIndex = this.questions.length;
      this.answers = 0;
    } else {
      alert("Quiz com ID ${id} não encontrado.");
    }
  }

  playerChooce(value: number): void {
    this.answers += value;
    this.nextStep();
  }

  nextStep(): void {
    this.questionIndex ++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelect = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      const resultKey = Math.floor(this.answers);
      if (this.currentQuiz && this.currentQuiz.results) {
        this.answersSelect = this.currentQuiz.results[resultKey] || "Resultado não definido para esta combinação de respostas.";
      } else {
        this.answersSelect = "Erro: Dados de resultados não disponiveis.";
      }
    }
  }

  resetQuiz(): void {
    this.selectTema = true;
    this.finished = false;
    this.tema = "";
    this.quizzImage = "";
    this.questions = [];
    this.questionSelect = undefined;
    this.answers = 0;
    this.answersSelect = "";
    this.questionIndex = 0;
    this.questionMaxIndex = 0;
    this.currentQuiz = undefined;
  }
}