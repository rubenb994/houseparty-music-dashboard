import { Component, OnInit } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  choice1;
  choice2;

  constructor(private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.webSocketService.getNewVote().subscribe((choices) => {
      console.log('Vote started message from server', choices);
      this.choice1 = choices[0];
      this.choice2 = choices[1];
      window.scrollTo(0, 0);
    });

    this.webSocketService.getEndVote().subscribe(() => {
      console.log('Vote ended message from server');
      this.choice1 = null;
      this.choice2 = null;
    });
  }
}
