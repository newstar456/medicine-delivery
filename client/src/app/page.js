'use client';
import ShopsList from "@/components/ShopsList";
import { useState, useEffect, useMemo} from "react"
import axios from "axios"
import React from 'react'
import Med from "@/components/Med";

const Home = () => {

  let contentMeds;
  const [data, setData] = useState([]);
  const [chosenShop, setChosenShop] = useState('');

  useEffect(() => {
      const fetchData = async () => {
          try {
            await axios.get("https://medicine-delivery-server.vercel.app")
              .then((response) => {
                  const obj = JSON.parse(response.data)
                setData(obj);
              });
          } catch (error) {
            console.error(error);
          }
      };
      fetchData();
     
  }, []);

  const medsChosen = useMemo(() => {
    let medsChosenList = []
    for(let i =0; i < data.length; i++){
      if(data[i]['Shops'].title=== chosenShop){
        medsChosenList.push(data[i])
      }
    }
    return medsChosenList
  }, [data, chosenShop])

  const chooseShop = (e) => { setChosenShop(e.target.dataset.name) }

  if(chosenShop){
    contentMeds = medsChosen.map(med => <Med med={med} key={med.id}/>)
  } else {
    contentMeds = data.map(med => <Med med={med} key={med.id}/>)
  }

   let contentShops = data.map(med => med['Shops'].title)
   let constentShopsModified = new Set(contentShops);
   let newContentShops = [...constentShopsModified];
   let contentShopsFinal = newContentShops.map(shop => <button variant='outlined' size="large" key={shop} data-name={shop} onClick={chooseShop}>{shop}</button>)
  

  return (
    <div direction='row' spacing={{ xs:1, sm:2 }}>
      <ShopsList contentShops={contentShopsFinal}/>
      <div className="grid ">{contentMeds}</div>
    </div>
  )
}

export default Home
