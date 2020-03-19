import { Component, OnInit } from '@angular/core';
import { AppService } from '../app/app.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  scores = [0 , 0]; 

  weapons = [
    'rock',
    'paper',
    'scissors'
  ];  
  
  play2: any;
  enemyChoice: any;
  playerChoice: any;
  hasError: string;
  isClicked: boolean = false;

  constructor(
    private appService: AppService,
  ) {}

  ngOnInit() {
  }

  sendChoice(choice: string) {
    this.playerChoice = choice;
    this.isClicked = true;
    console.log(choice);
    this.appService.getChoice(choice)
      .subscribe (
        result => {
          this.play2 = result;
          this.enemyChoice = result.computerChoice;
          console.log(this.enemyChoice)
          this.checkResult();
        },
        error => {
          this.hasError = error;
          console.log(this.hasError)
        },
      );
  }

  reset(): void {
    this.scores = [0,0];
    this.isClicked = false;
  }

  checkResult(): void {
    const userChoice = this.playerChoice;
    const computerChoice = this.enemyChoice;

    if (userChoice === computerChoice){
      console.log("Tie!");
      }else if (userChoice === 'paper' && computerChoice === 'rock'){
      console.log("You win!");
      this.scores[0] = this.scores[0]+1;
      }else if (userChoice === 'rock' && computerChoice === 'scissors'){
      console.log("You win!");
      this.scores[0] = this.scores[0]+1;
      }else if (userChoice === 'scissors' && computerChoice === 'rock'){
      console.log("You lose!");
      this.scores[1] = this.scores[1]+1;
      }else if (userChoice === 'rock' && computerChoice === 'paper'){
      console.log("You lose!");
      this.scores[1] = this.scores[1]+1;
      }else if (userChoice === 'paper' && computerChoice === 'scissors'){
      console.log("You lose!");
      this.scores[1] = this.scores[1]+1;
      }else if (userChoice === 'scissors' || computerChoice === 'paper'){
      console.log("You win!");
      this.scores[0] = this.scores[0]+1;
      }else{
      console.log("Invalid input, please try again");
      }
    }
}
