import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Parser } from '@angular/compiler';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  @Input() cities: any[];
  lat;
  lon;
  weather;
  errorMessage: any;
  constructor(private weatherService: WeatherService, private router: Router) { }
  ngOnInit(): void {
    this.getLocation();
  }
  getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((success) => {
        this.lat = success.coords.latitude;
        this.lon = success.coords.longitude;
        this.weatherService.getWeatherDataByCoords(this.lat, this.lon).subscribe(
          data => {
            this.weather = data;
            const utc_seconds = parseInt(this.weather.dt, 10) + parseInt(this.weather.timezone, 10);
            let utc_milliseconds = utc_seconds * 1000;
            let date =  new Date(utc_milliseconds);
            let hour = date.getUTCHours();
            if(hour>=12) utc_milliseconds = (utc_seconds-24*60*60) * 1000;
            let local_date = new Date(utc_milliseconds).toUTCString();        
            console.log(local_date);
            this.weather.date = local_date;
            let tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
            if (parseFloat(tempC) == parseInt(tempC)) this.weather.main.tempC = parseInt(tempC);
            else {
              this.weather.main.tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
              console.log(this.weather.main.tempC);
            }
            this.weather.iconImg = "https://openweathermap.org/img/wn/" + this.weather.weather[0].icon + "@2x.png";
            console.log(this.weather.iconImg);
            if (this.cities.findIndex(element => element.name === this.weather.name) == -1) {

              this.cities.push(this.weather);
              console.log(this.weather);
            }

          }
        )
      }
      )
    }
  }
  getCity(city) {

    this.weatherService.getWeatherDataByCityName(city).subscribe({
      next: data => {
        this.weather = data;
        console.log(this.weather);
        const utc_seconds = parseInt(this.weather.dt, 10) + parseInt(this.weather.timezone, 10);
        let utc_milliseconds = utc_seconds * 1000;
        let date =  new Date(utc_milliseconds);
        let hour = date.getUTCHours();
        if(hour>=12) utc_milliseconds = (utc_seconds-24*60*60) * 1000;
        let local_date = new Date(utc_milliseconds).toUTCString();        
        console.log(local_date);
        this.weather.date = local_date;
        let tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
        if (parseFloat(tempC) == parseInt(tempC)) this.weather.main.tempC = parseInt(tempC);
        else {
          this.weather.main.tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
          console.log(this.weather.main.tempC);
        }
        this.weather.iconImg = "https://openweathermap.org/img/wn/" + this.weather.weather[0].icon + "@2x.png";
        console.log(this.weather);
        if (this.cities.findIndex(element => element.name === this.weather.name) == -1)
          this.cities.push(this.weather);
        else {
          Swal.fire({
            icon: 'error',
            text: "The city already exists"
          });
        }

      },
      error: error => {
        this.errorMessage = error.message;

        Swal.fire({
          icon: 'error',
          text: "City ​​not found! "
        });
      }
    }


    )
  }
  isHomeRoute() {
    //console.log(this.router.url);
    return this.router.url === '/';

  }
  getIndex(name): number {
    return this.cities.findIndex(element => element.name === name);
  }
  deleteCity(name)
  {
    let index =  this.cities.findIndex(element => element.name === name);
    this.cities.splice(index,1);
  }
}
