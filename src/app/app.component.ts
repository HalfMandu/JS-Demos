import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClient, HttpClientModule, HttpHandler } from  '@angular/common/http';
import { ConfigService } from './config.service';

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
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fetchList';
  out1 = '';
  query1 = '';
  out2 = '';

  //receives #ID ref param -- faster
  press1(value: string) {
    this.out1 += value + ' | ';
  }

  //$event object -- slower
  press2(event: Event) {
    this.query1 += (event.target as HTMLInputElement).value + ' | ';
  }

  //function called each time a key is pressed..reset the timer, update the status, attempt to make the call
  //  keyPressed(key){

  //   console.log("key pressed...");

  //   clearTimeout(this.myTimer); 	//reset timer each time key pressed
  //   this.isWaiting = true; 			//update status

  //   //if input not empty AND waiting status was not interrupted, then make the API call. Then reset status.
  //   this.myTimer = setTimeout(() => {
  //       //if (this.isWaiting && document.getElementsByName("query")[0].value) {
  //       if (this.isWaiting && this.query) {
  //         console.log("making API call with: " + this.query);
  //     this.http.get(url).then(items) => this.items = items;
  //       }
  //       this.isWaiting = false; 	//reset status
  //     }, 2000);

  //   }

  constructor(private httpClient: HttpClient, private configService: ConfigService) { }

  config: any;

  //call service
  showConfig() {
    this.configService.getConfig()
      .subscribe(data => this.config = {
          heroesUrl: data.heroesUrl,
          textfile:  data.textfile,
          date: data.date,
      });
  }

  //array of 2-field objects: author, text
  private authorUrl: string = 'https://type.fit/api/quotes';
  
  //lifecycle hook
  ngOnInit(): void {
    this.showConfig();
    //useFetch();
    //httpClient1();
    //httpClient2();
  }
  
  //using fetch()
  useFetch(){
    fetch(this.authorUrl)
      .then(console.log);
  }

  url2 = "";
  // HttpClient - http.request
  httpClient1(term: string): Observable<Object> {
    return this.httpClient.request('GET', this.url2);
  }
  
  //HttpClient - http.get
  url3 = "";
  httpClient2() {
    return this.httpClient.get(this.url3);
  }
  
  url4 = "";
  //JSONP example
  // requestJsonp(url4, callback = 'callback') {
  //   return this.httpClient.jsonp(this.url4, callback);
  //  }
  
}
