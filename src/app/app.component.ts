import { Component, ElementRef, ViewChild } from '@angular/core';
import { map, tileLayer, Map } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("map", { static: false })
  mapRef!: ElementRef;

  private map?: Map;

  ngAfterViewInit() {
    this.map = map(this.mapRef.nativeElement).setView([42.698334, 23.319941], 13);
    tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1IjoicmFtcGFnZXIiLCJhIjoiY2t6MWhwY3Q0MHMzMjJ3bWk4aGFwM2kxeSJ9.Nn9VHSh9tj5ROEJWpX7CQw'
    }).addTo(this.map);
  }
}
