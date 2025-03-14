const { sequelize, ...models } = require('../models');

class Api_Controller {

  constructor(modelName) {
    this.modelName = modelName;
    this.getAll  = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create  = this.create.bind(this);
    this.update  = this.create.bind(this);
    this.delete  = this.create.bind(this);
  }

  async getAll(req, res) {
    try {            
      
      const model = models[this.modelName]; 
      //valores da URL      
      const { 
        page = 1, 
        limit = 40, 
        orderBy = 'dtinclusao', 
        order = 'ASC', 
        groupBy, 
        filters = {}, 
        include 
      } = req.query;      
      
      //prepara query
      const offset = (page - 1) * limit;
      const orderArray = orderBy.split(',').map((field, index) => [field, order.split(',')[index] || 'ASC']);
      const whereClause = { ...filters };
      const group = groupBy ? groupBy.split(',') : [];
      
      //pega a o relacionamento incluido na url
      const associations = include ? include.split(',').map(assoc => {
        const association = model.associations[assoc];
        if (!association) {
          throw new Error(`Associação ${assoc} não encontrada no modelo ${this.modelName}`);
        }
        return { association: association.as };
      }): [];
     
      const records = await model.findAll({
        where: whereClause, // Filtros adicionais
        order: orderArray, // Ordenação dinâmica
        limit: parseInt(limit), // Limite de registros por página
        offset: offset, // Paginação
        group: group,
        include: associations // Incluir relações dinamicamente
      });

      res.json(records);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar os registros' });
    }
  }

  async getById(req, res) {
    try {

      console.log("Models disponíveis:", Object.keys(models));
      const { id } = req.params;      
      const model = models[this.modelName];

      // Para incluir associações, se necessário
      const { include } = req.query; 
      // Verifica se o include é passado na query, caso contrário, define vazio
      const associations = include ? include.split(',').map(assoc => {
        const association = model.associations[assoc];
        if (!association) {
          throw new Error(`Associação ${assoc} não encontrada no modelo ${this.modelName}`);
        }
        return { association: association.as };
      }): [];

      const record = await model.findByPk(id, {
      include: associations
      });

      if (!record) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
      res.json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao buscar o registro' });
    }
  }

  async create(req, res) {
    try {      
      const model = models[this.modelName];  // Acessa o modelo dinamicamente pelo nome
      const newRecord = await model.create(req.body);
      res.status(201).json(newRecord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao criar o registro' });
    }
  }

  async update(req, res) {
    try {

      const { id } = req.params;      
      const model = models[this.modelName];

      const [updated] = await model.update(req.body, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
      res.json({ message: 'Registro atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar o registro' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;     
      const model = models[this.modelName];

      const deleted = await model.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Registro não encontrado' });
      }
      res.json({ message: 'Registro excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir o registro' });
    }
  }
}

module.exports = Api_Controller;
