import { Component, ElementRef, ViewChild } from '@angular/core';
import { map as leaflet, tileLayer, Map, TileLayerOptions, LatLngExpression } from 'leaflet';
import { defer, map, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild("map", { static: true })
  mapRef!: ElementRef<HTMLElement>;

  private mapElement = defer(() => of(this.mapRef.nativeElement));

  ngOnInit() {
    this.mapElement.pipe(
      map(this.createMap({
        coordinates: [42.698334, 23.319941],
        zoom: 13
      })),
      tap(this.createTile({
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoicmFtcGFnZXIiLCJhIjoiY2t6MWhwY3Q0MHMzMjJ3bWk4aGFwM2kxeSJ9.Nn9VHSh9tj5ROEJWpX7CQw'
      })),
      take(1)
    ).subscribe()
  }


  private createTile(options: TileLayerOptions) {
    return (map: Map) =>
      tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', options)
        .addTo(map)
  }

  private createMap(options: { coordinates: LatLngExpression; zoom: number; }) {
    return (element: HTMLElement) => leaflet(element).setView(options.coordinates, options.zoom);
  }
}
