import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

function CurrencyConverter() {

    const currencies=['BTC','ETH','USD','XRP','LTC','ADA']
    const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState('BTC')
    const [amount,setAmount] = useState(1)
    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    const [result, setResult] = useState(0)

    function convert(){
    
        const options = {
            method: 'GET',
            url: 'https://board-crypto.herokuapp.com/convert',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
            setResult(response.data*amount)

            setExchangedData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    
    return (
      <div className="currency-converter">
        <h2>CurrencyConverter</h2>

        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td> Primary Currency</td>
                        <td>
                            <input  // help us to select different numbers in the currency box
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select // to choose different currencies
                                value={chosenPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                            >
                             {/* to  map the options of currencies */}
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}

                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td> Secondary Currency</td>
                        <td>
                            <input  // help us to select different numbers in the currency box
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e)=> setChosenSecondaryCurrency(e.target.value)}
                            >
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button id="convert-button" onClick={convert}> Convert </button>
        </div>

        <ExchangeRate
             exchangedData={exchangedData}
        />
      </div>
    );
}

export default CurrencyConverter