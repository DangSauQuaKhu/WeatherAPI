import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
url= 'https://api.openweathermap.org/data/2.5/weather';
apikey='e1cb0c66fe1454ee0d3abd6e2eff5776';
  constructor( private http:HttpClient) { }
  getWeatherDataByCoords(lat,lon)
  {
    let params= new HttpParams()
    .set('lat',lat)
    .set('lon',lon)
    .set('units','imperial')
    .set('appid',this.apikey);
    return this.http.get(this.url, {params});
  }
  getWeatherDataByCityName(city: string)
  {
    let params= new HttpParams()
    .set('q',city)
    .set('units','imperial')
    .set('appid',this.apikey);
    return this.http.get(this.url, {params});
  }
}
