import React, { useState, useEffect } from 'react';
import './App.css';

function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [people, setPeople] = useState(1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountPerPerson, setAmountPerPerson] = useState(0);
  const [conversionRate, setConversionRate] = useState(0); 

  const apiKey = '8e54d70809bd084570fd9415b429de97badd6549f1d87da3e53df11b2552f757'; // Replace with your actual API key

  const fetchConversionRate = async () => {
    try {
      const response = await fetch('https://swop.cx/rest/rates', {
        method: 'GET',
        headers: {
          Authorization: `ApiKey ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversion rate');
      }

      const data = await response.json();
      const brlRate = data.find(item => item.quote_currency === 'BRL')
      if (!brlRate) {
        console.error('BRL conversion rate not found in API response');
      } else {
        setConversionRate(brlRate.quote);
      }
    } catch (error) {
      console.error('Error fetching conversion rate:', error);
    }
  };

  useEffect(() => {
    fetchConversionRate();
  }, []);

  const calculateTip = () => {
    const calculatedTip = (bill * tipPercentage) / 100;
    setTipAmount(calculatedTip);
    const total = parseFloat(bill) + calculatedTip;
    setTotalAmount(total);
    setAmountPerPerson(total / people);
  };

  return (
    <div className="Card">
      <div className="Tip">
        <h2>Calculadora de Gorjeta</h2>
        <label className="text">
          Valor da Conta:
          <input
            type="text"
            className="input"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
          />
        </label>
        <label className="tip2">
          Gorjeta:
          <input
            type="number"
            max="20"
            min="10"
            className="number"
            onChange={(e) => setTipPercentage(e.target.value)}
          />
          %
        </label>
        <label className="divide">
          Dividir entre:
          <input
            type="number"
            min={1}
            value={people}
            className="input"
            onChange={(e) => setPeople(e.target.value)}
          />
        </label>
        <div>
          <button onClick={calculateTip} className="btn">
            <strong className="strong">CALCULAR</strong>
          </button>
        </div>
        <p className="TipValue">
          Tip(USD): <p className="Cash">{tipAmount.toFixed(2)}</p>
        </p>
        <p className="TipValue">
          Total amount (USD): <p className="Cash">${totalAmount.toFixed(2)}</p>
        </p>
        <p className="TipValue">
          Amount per person (USD): <p className="Cash">${amountPerPerson.toFixed(2)}</p>
        </p>
        {conversionRate > 0 && (
          <>
            <p className="TipValue">
              Valor Total (BRL): <p className="Cash">R$ {(totalAmount * conversionRate).toFixed(2)}</p>
            </p>
            <p className="TipValue">
              Valor por Pessoa (BRL): <p className="Cash">R$ {(amountPerPerson * conversionRate).toFixed(2)}</p>
            </p>
            <p className="TipValue">
          Gorjeta (BRL): <p className="Cash">{(tipAmount*conversionRate).toFixed(2)}</p>
        </p>
          </>
        )}
      </div>
    </div>
  );
}

export default TipCalculator;
