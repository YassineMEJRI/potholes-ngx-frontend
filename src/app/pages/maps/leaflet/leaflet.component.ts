import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';

import * as L from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { PotHole } from '../../../models/PotHole';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options"
        (leafletMapReady)="onMapReady($event)"
        ></div>
      </nb-card-body>
    </nb-card>
  `,
})
export class LeafletComponent implements OnInit{

  private headers = new HttpHeaders({
    "Content-Type": "application/json",
    "Accept": "application/json"
  });
  public map: L.Map;
  potholes: BehaviorSubject<PotHole[]> = new BehaviorSubject(null)

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' }),
    ],
    zoom: 10,
    center: L.latLng({ lat: 36.8137, lng: 10.063949 }),
  };

  constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.getAllPotholes()
  }

  onMapReady(map: L.Map) {
    this.map = map;
    var ensi_marker = L.marker([36.8137, 10.063949]).addTo(map);
    ensi_marker.bindPopup("<b>ENSI</b><br>")
    this.potholes.subscribe((ph: PotHole[])=>{
      if(ph != null){
        ph.forEach((p)=>{
          let lng = p.location.coordinates[0][0][0];
          let lat = p.location.coordinates[0][0][1];
          let name = p.name;
          let desc = p.desc;
          let img_marker = L.marker([lng, lat]).addTo(map);
          img_marker.bindPopup("<h1>"+name+"</h1><p>"+desc+"</p><img width=\"300px\" src='http://localhost:8080/pothole_picture/"+p._id+"'></img></div>")
            
        })
      }
    })
  }

  getAllPotholes(): void {
    this.http.get<PotHole[]>("http://localhost:8080/potholes").subscribe((response) => {
      this.potholes.next(response)
    })
  }

}
