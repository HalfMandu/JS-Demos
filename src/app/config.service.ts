import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private httpClient: HttpClient) { }

  configUrl = 'assets/config.json';

  //with a generic, Config (IUnterface below) that indicates the data return type
  getConfig() {
    return this.httpClient.get<Config>(this.configUrl);
  }
}

//Interface 
export interface Config {
  heroesUrl: string;
  textfile: string;
  date: any;
}

