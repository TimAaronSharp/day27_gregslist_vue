import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { House } from "@/models/House.js"


class HousesService {
  async getAllHouses() {
    const res = await api.get('api/houses')
    this.handleRes(res, House) //Passes the res and class definition (House) to handleRes
  }
  //Takes in a res and object class definition and maps over the res to create a new array of objClass objects (id. House), which is then assigned to AppState[appStateArray] (ie. houses)
  handleRes(res, objClass) {
    const appStateArray = (objClass.name.toLowerCase() + 's')
    const newRes = res.data.map(pojo => new objClass(pojo))
    AppState[appStateArray] = newRes
    logger.log(AppState.houses)
  }

}
export const housesService = new HousesService()