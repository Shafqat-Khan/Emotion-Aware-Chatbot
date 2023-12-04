import { Component } from '@angular/core';
import { BotService } from 'src/app/services/bot.service';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent {
  userInput = '';
  chatMessages: ChatMessage[] = [];
  isLoading = false;

  constructor(public botService: BotService) { }


  sendMessage() {
    this.isLoading = true;
    if (this.userInput.trim() === '') {
      window.confirm('Please Enter Input');
      return;
    }

    const userMessage: ChatMessage = { role: 'User', content: this.userInput };
    this.chatMessages.push(userMessage);
    
    this.botService.sendMessage(this.userInput).subscribe((response) => {
        const chatGptMessage: ChatMessage = { role: 'EmoSense', content: response.result };
        this.chatMessages.push(chatGptMessage);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
    
    this.userInput = '';
    this.isLoading = false;
  }

}
