class Collection {
  constructor(model) {
    this.model = model;
  }

  async read(id, options) {
    console.log(id)
    try {
      if (id) {
        return await this.model.findOne({ where: {id:id}, ...options});
      } else {
        return await this.model.findAll(options);
      }
    } catch (e) {
      console.log('COLLECTION CLASS READ ERROR', e);
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch(e) {
      console.log('COLLECTION CREATE ERROR', e);
    }
  }

  async update(id, data) {
    try {
      let updatedRecord = await this.model.update(
        data,
        {
          where: { id: id }
        });
      return updatedRecord;
    } catch (e) {
      console.log('COLLECTION UPDATE ERROR', e);
    }
  }

  async delete(id) {
    try {
      let number = await this.model.destroy({
        where: {
          id: id,
        }
      });
      return number;
    } catch(e) {
      console.log('COLLECTION DELETE ERROR: ', e);
    }
  }
}

module.exports = Collection;