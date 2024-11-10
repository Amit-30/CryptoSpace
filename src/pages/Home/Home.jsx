import React, { useEffect, useState } from 'react'
import './Home.css'
import { useCoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

function Home() {

  const {allCoin, currency} = useCoinContext()
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] = useState('')

  const inputHandler = (e) => {
    setInput(e.target.value)
    if (e.target.value === '') setDisplayCoin(allCoin)
  }

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoin.filter((item) => (
      item.name.toLowerCase().includes(input.toLowerCase()) 
    ))
    setDisplayCoin(coins)
  }

  useEffect(()=>{
    setDisplayCoin(allCoin);
  },[allCoin])

  return (
    <div className='home'>
      
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the largest CryptoCurrency marketplace. Sign up to explore more about cryptos.</p>
        <form onSubmit={searchHandler}>
          <input 
           type="text" 
           placeholder='Search Cryptos...' 
           list='coinlist'
           value={input}
           onChange={inputHandler}
           required/>
          <datalist id='coinlist'>
            {allCoin.map((coin) => (
              <option 
               key={coin.id}
               value={coin.name}/>
            ))}
          </datalist> 
          <button>Search</button>
        </form>
      </div>

      <div className="crypo-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coin</p>
          <p>Price</p>
          <p style={{textAlign:'center'}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((coin) => (
            <Link to={`/coin/${coin.id}`}  
             className="table-layout" key={coin.id}>
              <p>{coin.market_cap_rank}</p>
              <div>
                <img src={coin.image} alt="" />
                <p>{coin.name + ' - ' + coin.symbol}</p>
              </div>
              <p>
                {currency.symbol} {coin.current_price.toLocaleString()}
              </p>
              <p 
              style={{textAlign:'center'}}
              className={coin.price_change_percentage_24h>0?'green':'red'}>
                {Math.floor(coin.price_change_percentage_24h*100)/100}
              </p>
              <p className='market-cap'>
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
