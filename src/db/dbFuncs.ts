import {
    collection,
    query,
    doc,
    setDoc,
    getDoc,
    getDocFromCache,
    getDocs,
    addDoc,
  } from "firebase/firestore";

import { getDatabase, ref, onValue } from "firebase/database";

import mockdata from './mockdata.json';

const rtdatabase = getDatabase();

/*
 * Methodology for maintaining devices
 *  devices/documentid/field
 *  fields:
 *      - data (map)                    # data coming from sensor
 *          |_ CO2      (string)
 *          |_ humidity (string) 
 *          |_ ozone    (string)
 *          |_ pm25     (string)
 *          |_ temp     (string)
 *          |_ voc      (string)
 *      - lat (string)                  # latitude
 *      - long (string)                 # longitude
 *      - timestamp (string)            # last updated
 * 
 *   Exact representation:
 *  
 *    {
        "IePlFjuMpgFnGvKZDRgi": 
        {
            "long": "-87.64712811866409",
            "data": {
                "pm25": "44",
                "voc": "12",
                "temp": "33",
                "CO2": "25",
                "ozone": "125",
                "humidity": "92"
            },
            "timestamp": "2/13/2023",
            "lat": "41.86579351612219"
        }
      }
 * 
 * 
 * 
 * 
 * 
 *      For future release maybe add a history here?
 *      - dates (map)
 *        |_data (array) <- data for a given date called ex. 2/13/2023_21:20:32
 *          |_[CO2, humidity, ozone, pm25, temp, voc]
 *        |_data (array) <- date and time
 *          |_[CO2, humidity, ozone, pm25, temp, voc]
 *        |_data (array) <- date and time
 *          |_[CO2, humidity, ozone, pm25, temp, voc]
 *  
 * 
 * 
*/




// Returns the document id which is how its referenced / accessed in the db
async function registerDevice(db) {

  let d = new Date();

  const docRef = await addDoc(collection(db, "devices"), {
    data: {CO2: "nan", humidity: "nan", ozone: "nan", pm25: "nan", temp: "nan", voc: "nan"},
    lat: "nan",
    long: "nan",
    timestamp: d.toString()
  }); 

  return docRef.id;
}

// Live data
async function getStoredData(db) {
  
  // let arr: Array<{[name:string]: Object}> = [];
  let dict = { }

  const querySnapshot = await getDocs(collection(db, "devices"));
  querySnapshot.forEach((doc) => {
    let docid = String(doc.id)
    // let dict = { [docid] : doc.data() };
    dict[docid] = doc.data();

    // arr.push(dict);
  });

  return dict;  // returns javascript object of {deviceid : devicedata}
}

async function getLiveData(db) {
  let arr: Array<{[name:string]: Object}> = [];
  
  const querySnapshot = await getDocs(collection(db, "devices"));
  querySnapshot.forEach((doc) => {
    let docid = String(doc.id)
    let dict = { [docid] : doc.data() };
    arr.push(dict);
  });

  return arr;  // returns and array of {deviceid : devicedata}
}

function generateMockData() {
//   {
//     "IePlFjuMpgFnGvKZDRgi": {
//         "long": "-87.64712811866409",
//         "data": {
//             "pm25": "44",
//             "voc": "12",
//             "temp": "33",
//             "CO2": "25",
//             "ozone": "125",
//             "humidity": "92"
//         },
//         "timestamp": "2/13/2023",
//         "lat": "41.86579351612219"
//     }
// }
  let data = mockdata;

  return data;
}

export {getLiveData , generateMockData, getStoredData}