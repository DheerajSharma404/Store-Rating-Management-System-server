import { Store } from "../models/index.js";
import CrudRepository from "./crud.repository.js";

class StoreRepository extends CrudRepository {
  constructor() {
    super(Store);
  }

  async findByEmail(email) {

    const response = await Store.findOne({ email: email });

    return response;
  }
}

export default StoreRepository;
