const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get(`/api/test`, (req, res) => {
	res.json("test api 111");
});

app.post(`/api/transaction`, (req, res) => {
	// const { name, description, datetime } = req.body;
	res.json(req.body);
});

app.listen(PORT, () => {
	console.log(`server listening on port ${PORT}`);
});
