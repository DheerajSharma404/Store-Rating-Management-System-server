class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {

      const response = await this.model.create(data);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async get(id) {
    const response = await this.model.findById({ _id: id });
    return response;
  }

  async getAll() {
    const response = await this.model.find({});
    return response;
  }

  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }

  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return response;
  }
}

export default CrudRepository;
