const express = require('express');
const router = express.Router();

module.exports = (database, FoodModel) => {
  router.get('/', async (req, res) => {
    try {
      const foods = await FoodModel.getAllFoods(database);
      res.json(foods);
    } catch (err) {
      console.error('Error fetching foods:', err);
      res.status(500).json({ message: 'Error fetching foods' });
    }
  });

  router.get('/todays-special', async (req, res) => {
    try {
      const foods = await FoodModel.getTodaysSpecial(database);
      res.json(foods);
    } catch (err) {
      console.error('Error fetching foods:', err);
      res.status(500).json({ message: 'Error fetching foods' });
    }
  });

  router.get('/popular', async (req, res) => {
    try {
      const foods = await FoodModel.getPopularFoods(database);
      res.json(foods);
    } catch (err) {
      console.error('Error fetching foods:', err);
      res.status(500).json({ message: 'Error fetching foods' });
    }
  });

  router.put('/update-todays-special', async (req, res) => {
    try {
      const { id, value } = req.body;
      const result = await FoodModel.updateTodaysSpecial(database, id, value);
      res.json(result);
    } catch (err) {
      console.error('Error updating today\'s special:', err);
      res.status(500).json({ message: 'Error updating today\'s special' });
    }
  });

  router.put('/add-order', async (req, res) => {
    try {
      const { id, count } = req.body;
      const result = await FoodModel.incrementOrders(database, id, count);
      res.json(result);
    } catch (err) {
      console.error('Error adding orders:', err);
      res.status(500).json({ message: 'Error adding orders' });
    }
  });

  router.delete('/delete-food', async (req, res) => {
    try {
      const { id } = req.body;
      const result = await FoodModel.deleteFood(database, id);
      res.json(result);
    } catch (err) {
      console.error('Error deleting food:', err);
      res.status(500).json({ message: 'Error deleting food' });
    }
  });

  return router;
};
