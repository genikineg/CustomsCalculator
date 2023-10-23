
export const checkCarAge = async ({year=2000}) => {

  return new Promise(async (resolve, reject) => {
    
    try {

      const currentYear = new Date().getFullYear()
      const carAge = currentYear - year
    
      if (carAge < 3) {
        return resolve("Меньше 3-х лет");
      } else if (carAge >= 3 && carAge <= 5) {
        return resolve("3-5 лет")
      } else if (carAge > 5 && carAge <= 7) {
        return resolve("5-7 лет")
      } else {
        return resolve("Больше 7 лет")
      }
    } catch (error) {
      
      console.error(error.message)
      return resolve("Больше 7 лет")
    }
  })
}
