import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'assistant';
  message: string;
  time: Date;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './ai-chatbot.component.html',
  styleUrl: './ai-chatbot.component.css'
})
export class AiChatComponent {

  userMessage = '';

  isLoading = false;

  messages: ChatMessage[] = [
    {
      role: 'assistant',
      message:
        'Hello! 👋 I am your AI Banking Copilot. How can I help you today?',
      time: new Date()
    }
  ];


  sendMessage(): void {

    const message = this.userMessage.trim();

    if (!message || this.isLoading) {
      return;
    }

    // Add user message
    this.messages.push({
      role: 'user',
      message: message,
      time: new Date()
    });

    // Clear input
    this.userMessage = '';

    this.isLoading = true;

    // Temporary response
    setTimeout(() => {

      this.messages.push({
        role: 'assistant',
        message:
          'I received your message. AI integration with Spring Boot will be connected next. 🤖',
        time: new Date()
      });

      this.isLoading = false;

    }, 1000);
  }


  sendQuickMessage(message: string): void {

    this.userMessage = message;

    this.sendMessage();

  }


  handleEnter(event: Event): void {

    const keyboardEvent = event as KeyboardEvent;

    if (
      keyboardEvent.key === 'Enter' &&
      !keyboardEvent.shiftKey
    ) {

      keyboardEvent.preventDefault();

      this.sendMessage();

    }
  }

}