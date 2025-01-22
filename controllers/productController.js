const Product = require("../models/Product");
const axios = require("axios");

// Initialize database
exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(response.data);
    res.status(200).send("Database initialized successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// List transactions with search and pagination
exports.getTransactions = async (req, res) => {
  try {
    const { month, page = 1, perPage = 10, search = "" } = req.query;
    const startDate = new Date(`${month} 1, 2000`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const query = {
      dateOfSale: { $gte: startDate, $lt: endDate },
      $or: [
        { title: new RegExp(search, "i") },
        { description: new RegExp(search, "i") },
        { price: new RegExp(search, "i") },
      ],
    };

    const transactions = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Statistics
exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2000`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const totalSales = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" },
          soldCount: { $sum: 1 },
        },
      },
    ]);

    const notSoldCount = await Product.countDocuments({
      dateOfSale: { $gte: startDate, $lt: endDate },
      sold: false,
    });

    res.status(200).json({
      totalSales: totalSales[0]?.totalAmount || 0,
      soldItems: totalSales[0]?.soldCount || 0,
      notSoldItems: notSoldCount,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Bar chart
exports.getBarChart = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2000`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const priceRanges = [
      { range: "0-100", min: 0, max: 100 },
      { range: "101-200", min: 101, max: 200 },
      { range: "201-300", min: 201, max: 300 },
      { range: "301-400", min: 301, max: 400 },
      { range: "401-500", min: 401, max: 500 },
      { range: "501-600", min: 501, max: 600 },
      { range: "601-700", min: 601, max: 700 },
      { range: "701-800", min: 701, max: 800 },
      { range: "801-900", min: 801, max: 900 },
      { range: "901-above", min: 901, max: Infinity },
    ];

    const chartData = await Promise.all(
      priceRanges.map(async ({ range, min, max }) => {
        const count = await Product.countDocuments({
          dateOfSale: { $gte: startDate, $lt: endDate },
          price: { $gte: min, $lte: max === Infinity ? Infinity : max },
        });
        return { range, count };
      })
    );

    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Pie chart
exports.getPieChart = async (req, res) => {
  try {
    const { month } = req.query;
    const startDate = new Date(`${month} 1, 2000`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const categories = await Product.aggregate([
      { $match: { dateOfSale: { $gte: startDate, $lt: endDate } } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
