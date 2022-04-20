import { Component, OnInit, NgZone, ElementRef } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  monitorData: any;
  zoom: number;
  address: any;

  constructor(private dashboardService: DashboardService,  private mapsAPILoader: MapsAPILoader,private ngZone: NgZone) { }
  lat;
  lng;

  private geoCoder;
  ngOnInit() {
    this.showData()
  }

  showData(){
    this.dashboardService.getData().subscribe((result:any)=>{
      console.log(result.data);
      this.monitorData = result.data
      this.lat = result.map.latitude
      this.lng = result.map.longitude
      // this.mapsAPILoader.load().then(() => {
      //   this.setCurrentLocation();
      // });
      
      
    },
    (error)=>{
      console.log(error)
    }
    )
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lat = position.coords.longitude;
        this.zoom = 8;
        this.getAddress(this.lat, this.lat);
      });
    }
  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    
    });
  }

}
