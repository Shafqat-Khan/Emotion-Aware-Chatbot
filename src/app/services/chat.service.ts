import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export class Message {
  constructor(public author: string, public content: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor() {}

  conversation = new Subject<Message[]>();

  messageMap:any = {
    'hello': 'chala ja bsdk',
    'hi': 'chala ja bsdk',
    'default': 'chala ja bsdk',
  };

  getBotAnswer(msg: any) {
    const userMessage = new Message('user', msg);
    this.conversation.next([userMessage]);
    const botMessage = new Message('bot', this.getBotMessage(msg));
    setTimeout(() => {
      this.conversation.next([botMessage]);
    }, 1500);
  }

  getBotMessage(question:string){
    let answer = this.messageMap[question];
    return answer || this.messageMap['default'];
  }
}
