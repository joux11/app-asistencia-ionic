import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.scss'],
})
export class MiniMapComponent implements AfterViewInit {

  @Input() lngLat?: [number, number]
  @ViewChild('map') map?: ElementRef

  constructor() { }
  ngAfterViewInit(): void {
    (mapboxgl as any).accessToken = 'pk.eyJ1Ijoiam9oYW5jYXNzMSIsImEiOiJjbG9nMDhmY2IwdDQ5Mm1zMWRrN21zbnMwIn0.PBO1tRgrxUqm4Lw4F-jH7Q';
    if (!this.map?.nativeElement) throw "Mapa no encontrado";
    if (!this.lngLat) throw "LngLat no encontrado";
    const map = new Map({
      container: this.map.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 17,
      //interactive: false
    })
    new Marker().setLngLat(this.lngLat).addTo(map)
  }



}
