import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {

  constructor(private socket: Socket) {}

  public getNewVote(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('new-vote', (choice) => {
        observer.next(choice);
      });
    });
  }

  public getEndVote(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('end-vote', (winner) => {
        observer.next();
      });
    });
  }
}
