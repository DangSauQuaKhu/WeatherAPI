import { Component, OnChanges, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anothercity',
  templateUrl: './anothercity.component.html',
  styleUrls: ['./anothercity.component.css']
})
export class AnothercityComponent implements OnInit {
  zoom = 12;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };
  weather;
  constructor(private weatherService: WeatherService,private _route: ActivatedRoute){}
  
  ngOnInit(): void {
    console.log("router:",this._route.url);
    let slug = this._route.snapshot.paramMap.get('slug');
    console.log("slug:",slug);
    this.weatherService.getWeatherDataByCityName(slug).subscribe(
      data=>{
        this.weather = data;
        this.weather.date = new Date();
        let tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
        if (parseFloat(tempC) == parseInt(tempC)) this.weather.main.tempC = parseInt(tempC);
        else {
          this.weather.main.tempC = ((parseFloat(this.weather.main.temp) - 32) / 1.8).toFixed(1);
          console.log(this.weather.main.tempC);
        }
        this.weather.iconImg = "https://openweathermap.org/img/wn/"+this.weather.weather[0].icon+"@2x.png";
        console.log(this.weather);
        this.center = {
          lat: this.weather.coord.lat,
          lng: this.weather.coord.lon,
        };

          
      }
    )
   
    console.log("center",this.center);
  }
  
  zoomIn() {
    if (this.zoom < this.options.maxZoom) this.zoom++;
  }
 
  zoomOut() {
    if (this.zoom > this.options.minZoom) this.zoom--;
  }
}
