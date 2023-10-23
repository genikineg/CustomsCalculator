import axios from 'axios'

import { checkCarAge } from './checkCarAge.js'

let actual = {
  timestamp: 0,
  rates: []
}

// Конвертируем
const convertTo = ({exchange='CNY', direction='sell'/* buy, sell */, value=1 }) => {

  if(direction==='sell'){

    const exchangeRate = actual.rates[exchange];
    const amountOut = value / exchangeRate;
    return amountOut
  }else{

    const exchangeRate = actual.rates[exchange];
    const amountOut = value * exchangeRate;
    return amountOut
  }
}

export const Price = async ({exchange='CNY', direction='sell', value=1 }) => {

  return new Promise(async (resolve, reject) => {
    
    try {

      if(actual.timestamp + (1000 * 60 * 60 ) < Date.now() || actual.rates.length === 0){

        await getActualPrice()
      }

      if(direction==='buy'){

        return resolve(Number(convertTo({exchange, direction, value }).toFixed(2)))
      }

      return resolve(Number(convertTo({exchange, direction, value }).toFixed(2)))
    } catch (error) {
      
      console.error(error.message)
      resolve(((value)))
    }
  })
}

const getActualPrice = async () => {

  return new Promise(async (resolve, reject) => {
    
    try {

      axios({
        timeout: 30000,
        method: 'GET',
        url: `https://www.cbr-xml-daily.ru/latest.js`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: {}
      })
      .then(async (data) => {

        if(data.status===200){

          // CNY Китайский юань
          // JPY Японская иена
          // KRW Южнокорейская вона
          // EUR Евро
          // USD Доллар США


          actual = {
            timestamp: Date.now(),
            rates: data?.data?.rates
          }

          const RUBtoCNY = await Price({exchange:'CNY', direction:'buy', value:1000000 }) // RUB to CNY
          const CNYtoRUB = await Price({exchange:'CNY', direction:'sell', value:1000000 }) // CNY to RUB 

          console.log(`Китайский юань: RUBtoCNY: ${RUBtoCNY}, CNYtoRUB: ${CNYtoRUB}`)

          const RUBtoJPY = await Price({exchange:'JPY', direction:'buy', value:1000000 }) // RUB to JPY
          const JPYtoRUB = await Price({exchange:'JPY', direction:'sell', value:10000 }) // JPY to RUB 

          console.log(`Японская иена: RUBtoJPY: ${RUBtoJPY}, JPYtoRUB: ${JPYtoRUB}`)

          const RUBtoKRW = await Price({exchange:'KRW', direction:'buy', value:1000000 }) // RUB to KRW
          const KRWtoRUB = await Price({exchange:'KRW', direction:'sell', value:10000 }) // KRW to RUB 

          console.log(`Южнокорейская вона: RUBtoKRW: ${RUBtoKRW}, KRWtoRUB: ${KRWtoRUB}`)

          const RUBtoEUR = await Price({exchange:'EUR', direction:'buy', value:1000000 }) // RUB to EUR
          const EURtoRUB = await Price({exchange:'EUR', direction:'sell', value:10000 }) // EUR to RUB 

          console.log(`Евро: RUBtoEUR: ${RUBtoEUR}, EURtoRUB: ${EURtoRUB}`)

          const RUBtoUSD = await Price({exchange:'USD', direction:'buy', value:1000000 }) // RUB to USD
          const USDtoRUB = await Price({exchange:'USD', direction:'sell', value:10000 }) // USD to RUB 

          console.log(`Доллар США: RUBtoUSD: ${RUBtoUSD}, USDtoRUB: ${USDtoRUB}`)

          return resolve()
        }
      })
      .catch((error) => {

        console.log(error)
      })
    } catch (error) {
          
      console.error(error.message)
      return resolve()
    }
  })
}

(async () => {
  
  await getActualPrice()

  const cubicCM = 139
  const year = 2023

  // Пример использования:
  const carAgeCategory = await checkCarAge({year})
  console.log(carAgeCategory); // Выведет "3-5 лет"






  function calculateCarTax(cost, engineVolume, age) {
    let taxRate = 0;
  
    if (age <= 3) {
      if (cost <= 8500) {
        taxRate = 2,5;
      } else if (cost <= 16700) {
        taxRate = 3.5;
      } else if (cost <= 42300) {
        taxRate = 5.5;
      } else if (cost <= 84500) {
        taxRate = 7.5;
      } else if (cost <= 169000) {
        taxRate = 15.0;
      } else {
        taxRate = 20.0;
      }
    } else if (age <= 5) {
      if (engineVolume <= 1000) {
        taxRate = 1.5;
      } else if (engineVolume <= 1500) {
        taxRate = 1.7;
      } else if (engineVolume <= 1800) {
        taxRate = 2.5;
      } else if (engineVolume <= 2300) {
        taxRate = 2.7;
      } else if (engineVolume <= 3000) {
        taxRate = 3;
      } else {
        taxRate = 3.6;
      }
    } else {
      if (engineVolume <= 1000) {
        taxRate = 3;
      } else if (engineVolume <= 1500) {
        taxRate = 3.2;
      } else if (engineVolume <= 1800) {
        taxRate = 3.5;
      } else if (engineVolume <= 2300) {
        taxRate = 4.8;
      } else if (engineVolume <= 3000) {
        taxRate = 5;
      } else {
        taxRate = 5.7;
      }
    }
  
    const taxAmount = engineVolume * taxRate;
    return taxAmount;
  }
  
  const carCost = 8600; // Стоимость автомобиля в евро
  const customsClearance = 3000 // Таможенное оформление  	3100 руб.	3100.00 руб.
  const companyCommission = null // Комиссия компании 30000
  const engineVolume = 1500; // Рабочий объем двигателя в куб. см
  const carAge = 4; // Возраст автомобиля в годах

  /* Если это электрокар то там идет Пошлина 15% от стоимости авто  */
  /* И Акциз до 68 л. с. – применяется нулевой акциз // 55 руб./0.75 КВт  // 	до 112 кВт и после  531 руб./0.75 КВт  //	 и после 150  идет 869 руб./0.75 КВт  	*/
  /* Утилизационный сбор. Для физических лиц он составит 3400 рублей за авто возрастом 0-3 года и 5200 рублей за машину старше 3 лет. */

  const carTax = calculateCarTax(carCost, engineVolume, carAge);

  console.log(`Налог на автомобиль составляет: ${carTax} евро.`);
  console.log(`Налог на автомобиль составляет: ${await Price({exchange:'EUR', direction:'sell', value:carTax }) + customsClearance + ( companyCommission ? companyCommission : 0 )} RUB.`);
  console.log(`Таможенное оформление: ${customsClearance} RUB.`);
  
  const RUBtoEUR = await Price({exchange:'EUR', direction:'buy', value:800000 }) // RUB to EUR
console.log(RUBtoEUR)
})()

