import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // Pie
  public pieChartData: number[] = null;
  public pieChartType: ChartType = 'pie';
  public pieChartColors = [
    {
      backgroundColor: ['rgb(202, 46, 46)', 'rgb(21, 167, 21)'],
    },
  ];

  choices;
  choice1;
  choice2;
  choice1VoteAmount = 0;
  choice2VoteAmount = 0;
  winner = null;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getNewVote().subscribe((choices) => {
      console.log('Vote started message from server', choices);
      this.winner = null;
      this.pieChartData = null;
      this.choices = choices;
      this.choice1 = choices[0];
      this.choice2 = choices[1];
      this.choice1VoteAmount = 0;
      this.choice2VoteAmount = 0;

      window.scrollTo(0, 0);
    });

    this.webSocketService.getEndVote().subscribe((winningId) => {
      console.log('Vote ended message from server', winningId);
      this.setWinner(winningId);
      this.choice1 = null;
      this.choice2 = null;
    });

    this.webSocketService.getUpdatedVotes().subscribe((votes) => {
      console.log('New votes have been submitted', votes);
      this.choice1VoteAmount = votes.filter(
        (vote) => vote.trackId === this.choices[0].track.id
      ).length;
      this.choice2VoteAmount = votes.length - this.choice1VoteAmount;

      this.pieChartData = [this.choice2VoteAmount, this.choice1VoteAmount];
    });
  }
  private setWinner(winningId) {
    const winningIndex = this.choices.findIndex(
      (choice) => choice.track.id === winningId
    );
    if (winningIndex >= 0) {
      this.winner = this.choices[winningIndex];
      this.choices = null;
    } else {
      console.log('COULD NOT DETERMINE WINNER');
    }
  }
}
