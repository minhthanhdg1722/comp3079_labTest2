import { Component } from '@angular/core';
import { MyRowComponent } from '../my-row/my-row.component';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  locList = [];
  lat;
  lng;
  timestamp;
  keys;
  clicked = false;

  constructor(private geolocation: Geolocation) {
    this.displayData();
  }
  

  setData(myKey:string, value: string) {
    Storage.set({ key: myKey, value: value }).then(()=>{
      console.log("location saved");
    });
  }

  displayData(){
    Storage.keys().then((res) => {
      if(res.keys.length > 0){
        res.keys.forEach(myKey => {
          Storage.get({ key: myKey })
          .then((res) => {
            this.locList.push(res.value)
          });
        });
      }else {
        console.log("No Data")
      }
    });
  }

  getLocation(){
    this.geolocation.getCurrentPosition().then((res) => {
      this.lat = res.coords.latitude;
      this.lng = res.coords.longitude;
      this.timestamp = res.timestamp;
      let location = `Timestamp: ${this.timestamp} | Latitude: ${this.lat} | Longitude: ${this.lng}`;
      this.locList.push(location);
      this.setData(this.timestamp, location);
    }).catch((error) => {
      console.log('Error getting location', error);
    })
  }

  deleteLoc(index){
    Storage.keys().then((res) => {
      if(res.keys.length > 0){
        Storage.remove({key: res.keys[index]})
        this.locList.splice(index, 1);
      }else {
        console.log("No Data")
      }
    });
  }


  
  

}
