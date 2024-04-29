const { MongoClient, ObjectId } = require('mongodb');

// Function to connect to the database
async function connectToDatabase(url) {
  const client = new MongoClient(url);
  await client.connect();
  console.log('Connected to MongoDB Atlas');
  return client;
}

// Functions for interacting with the foods collection
const FoodModel = {
  async getAllFoods(database) {
    const collection = database.collection('foods');
    return await collection.find().toArray();
  },

  async getTodaysSpecial(database) {
    const collection = database.collection('foods');
    return await collection.find({ todaySpecial: true }).limit(6).toArray();
  },

  async getPopularFoods(database) {
    const collection = database.collection('foods');
    return await collection.find().sort({ noOfOrders: -1 }).limit(6).toArray();
  },

  async updateTodaysSpecial(database, id, value) {
    const collection = database.collection('foods');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $set: { todaySpecial: value } });
  },

  async incrementOrders(database, id, count) {
    const collection = database.collection('foods');
    return await collection.updateOne({ _id: new ObjectId(id) }, { $inc: { todaysOrder: count, noOfOrders: count } });
  },

  async deleteFood(database, id) {
    const collection = database.collection('foods');
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }
};

module.exports = { connectToDatabase, FoodModel };
