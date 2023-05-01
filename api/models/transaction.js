const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TransactionSchema = new Schema({
	name: { type: String, require: true },
	price: { type: Number, require: true },
	description: { type: String, require: true },
	datetime: { type: String, require: true },
});

const TransactionModel = model("Transaction", TransactionSchema);

module.exports = TransactionModel;
