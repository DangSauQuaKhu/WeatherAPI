import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
            this.weather.date = new Date();
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
        this.weather.date = new Date();
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
}
