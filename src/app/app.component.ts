import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { QuotesLocal } from '../assets/quotes';

/* 
-Demonstrating various input setups
  -#ID on the input
  -$event object
-Fetching/displaying data from API
  -HTTPClient
    -benefits of HttpClient include testability features, 
    typed request and response objects, request and response interception, 
    Observable apis, and streamlined error handling.
  -fetch() 
    -not recommended
    -will return a promise, instead of Observable
  -JSONP
    -works around limitations of certain API endpoints that don't support newer/preferable CORS protocol
    -API sets certain headers in the response a browser will reject the response
-Using/Injecting Config Service to help offload the wor
-Autocomplete task:
	-fetch items from API then display them in the list
		-set items to local scope upon return
	-autocomplete: the api accepts a parameter which is the user input
	-however, api call should only be made if
		1. user input is not-blank
		2. 5000ms have passed 
	-user input should start some timer which, once elapsed, will check the input
		-if not empty, it will use it as the param to make the api call
  -You can use the github api for this. 
    https://api.github.com/users/USERNAME/repos 
      will list public repositories for the user USERNAME. 
    to find all the user's repos
	    https://api.github.com/users/halfmandu/repos
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    HeaderComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  //input fields
  title: string = 'fetchList';
  outArray: string[] = [];
  outString: string = '';
  query1: string = '';
  out2: string = '';
  config: any;
  gitHubURL: string = 'https://api.github.com/users/halfmandu/repos'; //array of repo Objects
  authorUrl: string = 'https://type.fit/api/quotes'; //array of 2-field objects: author, text
  authors: any;
  //autocomplete
  timeoutID: any;
  isWaiting = false;
  query = '';
  items2 = [];
  items: any;
  url = '';
  quotesLocal: any;
  search_terms = [
    'apple',
    'apple watch',
    'apple macbook',
    'apple macbook pro',
    'iphone',
    'iphone 12',
  ];
  displayedMatches = this.search_terms;
  // displayedMatches: any;

  constructor(
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    // this.showConfig();
    this.showConfig2();
    //this.showConfig3();

    // this.useFetch();
    // this.useFetch2();
    // this.useFetch3();
    //this.useFetch4();
    // this.useFetch5();
    this.useFetch6();
    //httpClient1();
    //httpClient2();

    this.quotesLocal = QuotesLocal;
    //console.log(this.quotesLocal);
  }

  ////////////////////////////////////////////////////////////////////
  //Event handlers

  //receives #ID ref param -- faster...uses Array to store entries
  keyPress1(value: string) {
    this.outArray.push(value + ' | ');
  }

  //using string instead of array
  keyPress1b(value: string) {
    this.outString += value + ' | ';
  }

  //$event object -- slower
  keyPress2(event: Event) {
    this.query1 += (event.target as HTMLInputElement).value + ' | ';
  }

  ////////////////////////////////////////////////////////////////////
  //Autcomplete input

  
  //list displayed on page open
  autocompleteLocal(input: string) {
    if (!input) {
      this.displayedMatches = this.search_terms;
      return;
    }
    const reg = new RegExp(input);
    this.displayedMatches = this.search_terms.filter(term => {
      if (term.match(reg)) {
        return true;
      } else {
        return false;
      }
    });
    return;
  }

  //list NOT displayed on page open
  //checking against local array in memory...if empty input, reset
  autocompleteLocal2(input: string) {
    if (!input) {
      this.displayedMatches = [];
      return;
    }
    const reg = new RegExp(input);
    this.displayedMatches = this.search_terms.filter((term) => {
      if (term.match(reg)) {
        return true;
      } else {
        return false;
      }
    });
    return;
  }

  //called on every keypress in the input...waits 2 seconds (debounce) and only sends if input non-empty
  autoCompleteRemote(value: string) {
    console.log('key pressed...', value);
    clearTimeout(this.timeoutID); //reset timer on each key press

    this.timeoutID = setTimeout(() => {
      if (value) {
        console.log('timer done AND input not empty, sending http request...');
        // this.httpClient.get(this.gitHubURL)
        //   .then(items) => this.items = items;
        this.httpClient.get(this.gitHubURL).subscribe((res) => {
          this.items = res;
        });
      }
    }, 2000);
  }

  ////////////////////////////////////////////////////////////////////
  //Data fetching

  //call service, subscribe to Observable
  showConfig() {
    this.configService.getConfig().subscribe(
      (data) =>
        (this.config = {
          heroesUrl: data.heroesUrl,
          textfile: data.textfile,
          date: data.date,
        })
    );
  }

  //v2 -- destructuring...clone the data object, using its known Config shape
  showConfig2() {
    this.configService
      .getConfig()
      .subscribe((data) => (this.config = { ...data }));
  }

  //v3 -- searching with search terms
  showConfig3() {
    this.configService
      .searchTerm('2020-01-29')
      .subscribe((data) => (this.config = { ...data }));
  }

  /////////////////////////////////////////////////////////////////////////
  // .then() vs async/await

  //using fetch() with .then() chain
  useFetch() {
    fetch(this.authorUrl)
      .then((response) => response.json())
      .then((data) => (this.authors = data))
      .catch((error) => {
        console.log(error);
      });
  }

  //using fetch() with async/await
  async useFetch2() {
    const response = await fetch(this.authorUrl);
    this.authors = await response.json();
  }

  //wrapping in function, gives its own namespace, security, self-calling, immutable...
  //..self calling, nameless function is assigned to the variable
  useFetch3 = () => {
    (async () => {
      const response = await fetch(this.authorUrl);
      this.authors = await response.json();
    })();
  };

  //using fetch() with error handling block
  async useFetch4() {
    try {
      const response = await fetch(this.authorUrl);
      this.authors = await response.json();
    } catch (error) {
      console.log('Error:', error);
    }
  }

  //now with response checking
  async useFetch5() {
    const response = await fetch(this.authorUrl);
    if (response.ok) {
      this.authors = await response.json();
    } else {
      throw new Error('Something went wrong');
    }
  }

  //using fetch() with .then() chain
  useFetch6() {
    return fetch(this.authorUrl)
      .then((response) => response.json())
      .then((data) => (this.authors = data))
      .then(this.handleErrors);
  }

  //error handler for above function
  handleErrors(response: any) {
    if (!response) {
      console.log(response);
      throw Error(response.statusText);
    } else {
      return response;
    }
  }

  // HttpClient - http.request
  httpClient1(term: string): Observable<Object> {
    return this.httpClient.request('GET', this.authorUrl);
  }

  //HttpClient - http.get
  httpClient2() {
    return this.httpClient.get(this.authorUrl);
  }

  //JSONP example
  // requestJsonp(url4, callback = 'callback') {
  //   return this.httpClient.jsonp(this.url4, callback);
  //  }
}
