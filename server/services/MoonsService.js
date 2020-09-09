import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class MoonsService {
  async find(query = {}) {
    return await dbContext.Moons.find(query).populate('planet')
  }
  async findById(id) {
    let star = await dbContext.Moons.findById(id).populate('planet')
    if (!star) {
      throw new BadRequest("invalid id")
    }
    return star
  }
  async create(star) {
    return await dbContext.Moons.create(star)
  }
  async edit(update) {
    let updated = await dbContext.Moons.findOneAndUpdate({ _id: update.id }, update, { new: true })
    if (!updated) {
      throw new BadRequest("invalid id")
    }
    return updated
  }
  async delete(id) {
    let deleted = await dbContext.Moons.findOneAndDelete({ _id: id })
    if (!deleted) {
      throw new BadRequest("invalid id")
    }
  }

}

export const moonsService = new MoonsService();