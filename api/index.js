const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const Transaction = require("./models/transaction");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get(`/api/test`, (req, res) => {
	res.json("test api 111");
});

app.post(`/api/transaction`, async (req, res) => {
	await mongoose.connect(process.env.MONGO_URL);
	const { name, price, description, datetime } = req.body;
	const transaction = await Transaction.create({
		name,
		price,
		description,
		datetime,
	});
	res.json(transaction);
});

app.get("/api/transactions", async (req, res) => {
	await mongoose.connect(process.env.MONGO_URL);
	const transactions = await Transaction.find();
	res.json(transactions);
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
