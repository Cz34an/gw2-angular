import { Component, inject, OnInit, signal } from '@angular/core';
import { EventControllerService, EventResponseDto } from './core/api';
import { Sidebar } from './components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('angular-gw2');
  protected readonly events = signal<EventResponseDto[]>([]);
  private readonly eventService = inject(EventControllerService);

  public ngOnInit(): void {
    this.eventService.getEvents().subscribe({
      next: (data) => this.events.set(data),
      error: (err) => console.error(err),
    });
  }
}
