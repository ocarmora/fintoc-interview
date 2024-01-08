// 1. Request to Stellar (axios) // DONE
// 2. Request -> payload (body): string -> JSDom -> output: DOM.
// 3. Selector CSS/Tag.
// 4. Console.log(row) -> format string to number -> optional: array push.


// Docs:
// 1. Request export from browser miss cookies (session-id).

import axios from 'axios';
import { parse } from 'node-html-parser';

/**
 * @date YYYY-mm-dd
 */
const getCryptoValues = async (date) => {

    if(!date) return;

    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://stellar.fintoc.com?date=${date}`,
        headers: { 
          'authority': 'stellar.fintoc.com', 
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
          'accept-language': 'en-US,en;q=0.6', 
          'cache-control': 'no-cache', 
          'cookie': 'session-id=svb97o1qtfdi0wvdrnqyhmlkc7nwhku0',
          'pragma': 'no-cache', 
          'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Brave";v="120"', 
          'sec-ch-ua-mobile': '?0', 
          'sec-ch-ua-platform': '"macOS"', 
          'sec-fetch-dest': 'document', 
          'sec-fetch-mode': 'navigate', 
          'sec-fetch-site': 'cross-site', 
          'sec-fetch-user': '?1', 
          'sec-gpc': '1', 
          'upgrade-insecure-requests': '1', 
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      };
      
      const { data } = await axios.request(config);
      const root = parse(data);
      const rawData = root.querySelector('#vite-plugin-ssr_pageContext').textContent
    
      const { pageContext: {pageProps: { currencies }}} = JSON.parse(rawData);

      const currencyDate = currencies[0].date;
    
      return {
        [currencyDate]: {
            [currencies[0].currency]: currencies[0].value,
            [currencies[1].currency]: currencies[1].value,
            [currencies[2].currency]: currencies[2].value,
        }  
      }
}

const getCryptoByDates = async (from_date, to_date) => {
    // 1. Request with from_date
    // 2. Add one day
    // 3. Current day greater than to_date
}

async function main () {
 const crypto = await getCryptoValues('2024-01-05');
 console.log(crypto);
}



main();