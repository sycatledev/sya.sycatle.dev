import React, { useState, useEffect } from 'react';

function BitcoinPrice() {
    const [price, setPrice] = useState(null);
  
    useEffect(() => {
      fetch('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR')
        .then(response => response.json())
        .then(data => {
          setPrice(data.EUR);
        });
    }, []);
  
    return (
      <div>
        {price ? `Le prix actuel du bitcoin est de ${price} €` : 'Loading...'}
      </div>
    );
  }
  
  const rootNode = document.getElementById('bitcoin');
  const root = ReactDOM.createRoot(rootNode);
  ReactDOM.render(<BitcoinPrice />, rootNode)