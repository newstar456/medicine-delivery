const ShopsList = ({contentShops}) => {
  
  return(

    <div className='fixed left-10 flex flex-col items-center'>
      <h2>SHOPS:</h2>
      <div className='flex flex-col pt-4'>{contentShops}</div>
    </div>

  );
}

export default ShopsList






