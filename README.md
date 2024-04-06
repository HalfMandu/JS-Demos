# About

Demonstrating various input setups
*    #ID on the input
*    $event object
Fetching/displaying data from API
*    HTTPClient
      *    benefits of HttpClient include testability features, 
    typed request and response objects, request and response interception, 
    Observable apis, and streamlined error handling.
*    JSONP
      *    works around limitations of certain API endpoints that don't support newer/preferable CORS protocol
      *    API sets certain headers in the response a browser 
*    Autocomplete
      * fetch items from API then display them in the list
      *    set items to local scope upon return
*    the api accepts a parameter which is the user input
	  *    api call only be made if
		    1. user input is not-blank
		    2. 2000ms have passed 
*    user input should start some timer which, once elapsed, will check the input
	*    if not empty, it will use it as the param to make the api call
*    github api for calls 
    https://api.github.com/users/USERNAME/repos 
	https://api.github.com/users/halfmandu/repos

# FetchList 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Versions
Angular CLI: 17.2.3
Node: 20.11.1
Package Manager: npm 10.2.4
OS: win32 x64
Typescript: 5.3.3
npm: 10.2.4
nvm: 1.1.12

