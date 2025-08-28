import {getHighestPrice} from "../../src/service/bitcoinExchangeService";

const fetch = require('node-fetch');

const blockChainResp = {
    "USD": {
        "15m": 59037.04,
        "last": 59037.04,
        "buy": 59037.04,
        "sell": 59037.04,
        "symbol": "USD"
    }
}
const ExmoResp = {
    "BTC_USD": {
        "buy_price": "60560.9",
        "sell_price": "60594.06",
        "last_trade": "60528.03",
        "high": "61000",
        "low": "58597.94",
        "avg": "59804.93163944",
        "vol": "264.18356844",
        "vol_curr": "15990510.95660846",
        "updated": 1637875391
    }
};

describe('bitcoinExchangeService', () => {

    test('should call blockchain.info and api.exmo.com', async () => {

        fetch.once(JSON.stringify(blockChainResp))
            .once(JSON.stringify(ExmoResp));
        let result = await getHighestPrice();

        expect(fetch.mock.calls.length).toEqual(2);
        expect(fetch.mock.calls[0][0]).toEqual('https://blockchain.info/ticker')
        expect(fetch.mock.calls[1][0]).toEqual('https://api.exmo.com/v1/ticker')
    });

    test('should err if unable to get a sellPrice', async () => {

        fetch.mockResponse(JSON.stringify({"no": "dice"}));

        await expect(getHighestPrice())
            .rejects
            .toThrowError("USD Currency could not be found")
    });

    test('when blockchain has the highest value', async () => {
        let blockchain = {...blockChainResp}, exmo = {...ExmoResp};

        blockchain.USD.sell = 2;
        exmo.BTC_USD.sell_price = 1;

        fetch.once(JSON.stringify(blockchain))
            .once(JSON.stringify(exmo));
        let result = await getHighestPrice();

        expect(result.apiName).toBe("Blockchain")
        expect(result.price).toBe(blockchain.USD.sell)

    });

    test('when Exmo has the highest value', async () => {
        let blockchain = {...blockChainResp}, exmo = {...ExmoResp};

        blockchain.USD.sell = 1;
        exmo.BTC_USD.sell_price = 2;

        fetch.once(JSON.stringify(blockchain))
            .once(JSON.stringify(exmo));
        let result = await getHighestPrice();

        expect(result.apiName).toBe("Exmo");
        expect(result.price).toBe(exmo.BTC_USD.sell_price);
    });

});
