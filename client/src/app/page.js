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

  console.log(`${Number(new Date().getTime())}`)

   let contentShops = data.map(med => med['Shops'].title)
   let constentShopsModified = new Set(contentShops);
   let newContentShops = [...constentShopsModified];
   let contentShopsFinal = newContentShops.map(shop => <button className='cursor-pointer uppercase border border-inherit px-4 py-2 rounded-sm mb-4 hover:outline-1 hover:bg-[#333C45]' key={shop} data-name={shop} onClick={chooseShop}>{shop}</button>)
  

  return (
    <div className="flex flex-row pt-[125px]" >
      <ShopsList contentShops={contentShopsFinal}/>
      <div className="grid justify-evenly grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-4 pl-[210px] lg:pl-[240px]">{contentMeds}</div>
    </div>
  )
}

export default Home
