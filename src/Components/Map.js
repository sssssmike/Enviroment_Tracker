import React, { useMemo, useEffect, useState } from "react";
import { MapContainer } from 'react-leaflet/MapContainer'
import { Marker } from 'react-leaflet/Marker'
import { Popup } from 'react-leaflet/Popup'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Circle } from 'react-leaflet/Circle'
import { useMap } from 'react-leaflet/hooks'

import "../CSS/Map.css";

import { getStoredData, getLiveData, generateMockData } from "../db/dbFuncs.ts"
import { db } from "../db/dbInstance"

function Map() {
  
  const [data, setData] = useState([]);

  // DATA FORMATTING
  // {
  //   "IePlFjuMpgFnGvKZDRgi": {
  //       "long": "-87.64712811866409",
  //       "data": {
  //           "pm25": "44",
  //           "voc": "12",
  //           "temp": "33",
  //           "CO2": "25",
  //           "ozone": "125",
  //           "humidity": "92"
  //       },
  //       "timestamp": "2/13/2023",
  //       "lat": "41.86579351612219"
  //   }
  // }

  // access data, make sure its loaded first though
  /*if(data != undefined)
  {
    //console.log(data);            // you'll notice this stuff prints twice, since React.Strict is on it will render twice
    // console.log(data["KONGDOG"]); // see -> shorturl.at/cwER3  
    //console.log(data["KONGDOG"]["long"]); // etc. etc...
    // console.log(data["KONGDOG"]["data"]["pm25"]);
  }*/

  useEffect(()=> {
    (async function pullData() {
      let d = await getStoredData(db);
      
      setData(d);
      console.log('pulldata');
      setTimeout(pullData, 1800000);  // refreshes every 3 minutes
    })();

    console.log(data);
  }, []);

  // creates a list of all markers using info from data
  // list used later to populate the map with markers
  let markers = [];

  for (const key in data) {
    markers.push(
    <Marker position={[data[key]["lat"], data[key]["long"]]}>
      <Popup>
        {key}
        <br/> pm25: {data[key]["data"]["pm25"]}
        <br/> voc: {data[key]["data"]["voc"]}
        <br/> temp: {data[key]["data"]["temp"]}
        <br/> CO2: {data[key]["data"]["CO2"]}
        <br/> ozone: {data[key]["data"]["ozone"]}
        <br/> humidity: {data[key]["data"]["humidity"]}
      </Popup>
    </Marker>
    )
    
    // creates blue circle if humidity is too high
    if(data[key]["data"]["humidity"] > 50) {
      markers.push(
        <Circle center={[data[key]["lat"], data[key]["long"]]} radius="70" color="blue"/>
        )
    }

    // creates red circle if humidity is too low
    if(data[key]["data"]["humidity"] < 15) {
      markers.push(
        <Circle center={[data[key]["lat"], data[key]["long"]]} radius="70" color="red"/>
        )
    }
  }

  // map container creates map centered at UIC
  return (
    <div id='map'> 
        <MapContainer center={[41.86877130657323, -87.64863209188573]} zoom={16} scrollWheelZoom={false}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <ul>{markers}</ul>
        </MapContainer>
    </div>
  );
}

export default Map;