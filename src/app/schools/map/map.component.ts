import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})


export class MapComponent implements OnInit, AfterViewInit {
  @Input() schoolsData: any;
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 35.9114305;
  lng = 14.4771159;

  markers = [];

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 12,
  };

  marker = new google.maps.Marker({
    position: new google.maps.LatLng(this.lat, this.lng),
    map: this.map,
    title: 'Maltavista Office'
  });

  constructor() { }

  ngOnInit() {
    if (this.schoolsData && this.schoolsData.length > 0) {
      const tempSchool = [];
      this.schoolsData.forEach(item => {
        if (tempSchool.findIndex(x => x._id === item.school._id) === -1) {
          tempSchool.push(item.school);
        }
      });
      tempSchool.forEach(school => {
        this.markers.push({
          position: new google.maps.LatLng(school.latitude, school.longitute),
          map: this.map,
          title: school.name
        });
      });
    }
  }

  ngAfterViewInit(): void {
    this.mapInitializer();
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);

    // Adding Click event to default marker
    this.marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: this.marker.getTitle()
      });
      infoWindow.open(this.marker.getMap(), this.marker);
    });

    // Adding default marker to map
    this.marker.setMap(this.map);

    // Adding other markers
    this.loadAllMarkers();
  }

  loadAllMarkers(): void {
    this.markers.forEach(markerInfo => {
      // Creating a new marker object
      const marker = new google.maps.Marker({
        ...markerInfo
      });

      // creating a new info window with markers info
      const infoWindow = new google.maps.InfoWindow({
        content: marker.getTitle()
      });

      // Add click event to open info window on marker
      marker.addListener('click', () => {
        infoWindow.open(marker.getMap(), marker);
      });

      // Adding marker to google map
      marker.setMap(this.map);
    });
  }

}
