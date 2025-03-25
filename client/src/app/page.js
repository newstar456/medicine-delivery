'use client';
import ShopsList from "@/components/ShopsList";
import React, { useState, useEffect, useMemo} from "react"
import axios from "axios"
import Med from "@/components/Med";

const Home = () => {

  let contentMeds;
  const [data, setData] = useState([]);
  const [chosenShop, setChosenShop] = useState('default');
  const [sortedList, setSortedList] = useState(false)
  // const [selectedShop, setSelectedShop] = useState('')

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
  // console.log(data);

  const medsFav = data.filter(med => med.favorite === true)
  const medsNonFav = data.filter(med => med.favorite === false)
  function comparePrices(a, b) {return a.price - b.price}
  const medsFavSorted = medsFav.sort(comparePrices)
  const medsNonFavSorted = medsNonFav.sort(comparePrices)

  const medsChosen = useMemo(() => {
    let medsChosenList = []
    for(let i =0; i < data.length; i++){
      if(data[i]['Shops'].title=== chosenShop){
        medsChosenList.push(data[i])
      }
    }
    return medsChosenList
  }, [data, chosenShop])

  const medsChosenFav = medsChosen.filter(med => med.favorite === true)
  const medsChosenNonFav = medsChosen.filter(med => med.favorite === false) 
  const medsChosenFavSorted = medsChosenFav.sort(comparePrices)
  const medsChosenNonFavSorted = medsChosenNonFav.sort(comparePrices)
  // console.log(medsChosenFavSorted, medsChosenNonFavSorted);

  const sortedAllMeds = useMemo(() => {
    const copiedFavSortedMeds = medsFavSorted.slice()
    const copiedNonFavSortedMeds = medsNonFavSorted.slice()
    const sortedAllMeds = copiedFavSortedMeds.concat(copiedNonFavSortedMeds);
    return sortedAllMeds
  }, [medsFavSorted, medsNonFavSorted])
  const sortedMedsChosen = useMemo(() => {
    const copiedChosenFavSortedMeds = medsChosenFavSorted.slice()
    const copiedChosenNonFavSortedMeds = medsChosenNonFavSorted.slice()
    const sortedMedsChosen = copiedChosenFavSortedMeds.concat(copiedChosenNonFavSortedMeds);
    return sortedMedsChosen
  }, [medsChosenNonFavSorted, medsChosenFavSorted])

  if(chosenShop === 'default'&&sortedList){
    contentMeds = sortedAllMeds.map(med => <Med med={med} key={med.id}/>);
  }
  else if (chosenShop !== 'default'&&!sortedList) {
    contentMeds = medsChosen.map(med => <Med med={med} key={med.id}/>);
  } else if(chosenShop === 'default'&&!sortedList){
    contentMeds = data.map(med => <Med med={med} key={med.id}/>);
  } else if (chosenShop !== 'default'&&sortedList) {
    contentMeds = sortedMedsChosen.map(med => <Med med={med} key={med.id}/>);
  }


  // const medsChosen = useMemo(() => {
  //   let medsChosenList = []
  //   for(let i =0; i < data.length; i++){
  //     if(data[i]['Shops'].title=== chosenShop){
  //       medsChosenList.push(data[i])
  //     }
  //   }
  //   return medsChosenList
  // }, [data, chosenShop])

  const chooseShop = (e) => { setChosenShop(e.target.dataset.name) }
  const sortByPrice = () => { setSortedList(true) }
  const resetSorting = () => { setSortedList(false) }
  const selectAllShops = () => { setChosenShop('default') }

  // if(chosenShop){
  //   contentMeds = medsChosen.map(med => <Med med={med} key={med.id}/>)
  // } else {
  //   contentMeds = data.map(med => <Med med={med} key={med.id}/>)
  // }

   let contentShops = data.map(med => med['Shops'].title)
   let constentShopsModified = new Set(contentShops);
   let newContentShops = [...constentShopsModified];
   let contentShopsFinal = newContentShops.map(shop => <button className='cursor-pointer uppercase border border-inherit px-4 py-2 rounded-sm mb-4 hover:outline-1 hover:bg-[#333C45]' key={shop} data-name={shop} onClick={chooseShop}>{shop}</button>)
  

  return (
    <div>
      <div className="flex flex-row pt-[125px] justify-center gap-20">
        <button onClick={sortByPrice} className='text-sm uppercase border border-inherit px-3 py-1 rounded-sm hover:outline-1 hover:bg-[#333C45] cursor-pointer'>Sort by Price</button>
        <button onClick={resetSorting} className='text-sm uppercase border border-inherit px-3 py-1 rounded-sm hover:outline-1 hover:bg-[#333C45] cursor-pointer'>Reset Sorting</button>
        <button onClick={selectAllShops} className='text-sm uppercase border border-inherit px-3 py-1 rounded-sm hover:outline-1 hover:bg-[#333C45] cursor-pointer'>All Shops</button>
      </div>

      <div className="flex flex-row pt-12" >
        <ShopsList contentShops={contentShopsFinal}/>
        <div className="grid justify-evenly grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-x-6 gap-y-4 pl-[210px] lg:pl-[240px]">{contentMeds}</div>
      </div>
    </div>
  )
}

export default Home
