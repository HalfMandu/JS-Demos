import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ConfigService } from './config.service';
import { QuotesLocal } from '../assets/quotes';

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
  searchTerms = [
    'apple',
    'apple watch',
    'apple macbook',
    'apple macbook pro',
    'iphone',
    'iphone 12',
  ];
  displayedMatches = this.searchTerms;
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
  //match() method of String checks string against a regular expression
  autocompleteLocal(input: string) {
    if (!input) {
      this.displayedMatches = this.searchTerms;
      return;
    }
    const reg = new RegExp(input);
    this.displayedMatches = this.searchTerms.filter((term) => term.match(reg));
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
    this.displayedMatches = this.searchTerms.filter((term) => term.match(reg));
    return;
  }

  //debounce (1-second)
  autoCompleteLocalDebounce(input: string) {

    clearTimeout(this.timeoutID);

    this.timeoutID = setTimeout(() => {
      const reg = new RegExp(input);
      this.displayedMatches = this.searchTerms.filter(term => term.match(reg));
      return;
    }, 1000);
  }

  isFirst: boolean = true;    //tells whether or not data has been brought to front end yet...dont' bring unless user wants it 
  itemsAll: any;              //all items brought into frontend memory
  itemsDisplayed: any;        //subset which will be displayed based on filtering with userinput

  //called on every keypress in the input...waits 1 second (debounce) and only sends if input non-empty
  autoCompleteRemote(input: string) {

    clearTimeout(this.timeoutID);
    
    //only make http request once (after first keystroke)...then filter on frontend subsequently
    this.timeoutID = setTimeout(() => {
      if (this.isFirst) {
        this.httpClient.get(this.gitHubURL).subscribe(res => {
          this.isFirst = false;
          this.itemsAll = Object.values(res);
        });  
      } 
      const reg = new RegExp(input, 'i');
      this.itemsDisplayed = input ? this.itemsAll?.filter((repo: Repo) => repo.name.match(reg)) : [];
            
    }, 1000);  

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
      .subscribe(data => (this.config = { ...data }));
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

export interface Repo {
  name: string;
}
