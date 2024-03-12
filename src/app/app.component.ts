import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

/* 
Autocomplete:

	-fetch items from API then display them in the list
		-set items to local scope upon return
	-autocomplete: the api accepts a parameter which is the user input
	-however, api call should only be made if
		1. user input is not-blank
		2. 5000ms have passed 
	-user input should start some timer which, once elapsed, will check the input
		-if not empty, it will use it as the param to make the api call
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fetchList';
  query1 = '';
  values1 = '';

  onPress(event: KeyboardEvent) {
    this.query1 += (event.target as HTMLInputElement).value + ' | ';
  }

  onKey(value: string) {
    this.values1 += value + ' | ';
  }
  
}
