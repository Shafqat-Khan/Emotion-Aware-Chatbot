import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

  messages: Message[] = [];
  value: string | undefined;
  
  constructor(public chatService: ChatService) { }
  
  ngOnInit(): void {
    this.chatService.conversation.subscribe((val)=>{
      this.messages = this.messages.concat(val);
    })
  } 

  sendMessage(){
    this.chatService.getBotAnswer(this.value);
    this.value = '';
  }

}
