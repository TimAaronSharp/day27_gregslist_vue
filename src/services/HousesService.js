import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { House } from "@/models/House.js"


class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    this.handleRes(res, House) //Passes the res and class definition (House) to handleRes
  }
  async deleteHouse(houseId) {
    const res = await api.delete(`api/houses/${houseId}`)
    const houses = AppState.houses
    const houseIndex = houses.findIndex(house => house.id == houseId)
    houses.splice(houseIndex, 1)
    // this.handleRes(res, House)
  }
  async createHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    // logger.log(res.data)
    const newHouse = new House(res.data)
    AppState.houses.push(newHouse)
  }
  //Takes in a res and object class definition and maps over the res to create a new array of objClass objects (id. House), which is then assigned to AppState[appStateArray] (ie. houses)
  //Not really necessary for the scope of this project but I wanted to practice making a method like this more dynamic
  handleRes(res, objClass) {
    const appStateArray = (objClass.name.toLowerCase() + 's')

    const newRes = res.data.map(pojo => new objClass(pojo))
    AppState[appStateArray] = newRes
    logger.log(AppState.houses)
  }

}
export const housesService = new HousesService()