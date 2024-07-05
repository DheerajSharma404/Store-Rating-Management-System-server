import { Rating } from "../models/index.js";
import CrudRepository from "./crud.repository.js";

class RatingRepository extends CrudRepository {
  constructor() {
    super(Rating);
  }
}

export default RatingRepository;
