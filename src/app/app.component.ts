import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fetchList';
  query = '';
  values = '';

  onPress(event: KeyboardEvent) {
    this.query += (event.target as HTMLInputElement).value + ' | ';
  }

  onKey(value: string) {
    this.values += value + ' | ';
  }
  
}
