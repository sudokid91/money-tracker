import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [name, setName] = useState("");
	const [datetime, setDatetime] = useState("");
	const [description, setDescription] = useState("");

	const [transactions, setTransactions] = useState([]);

	useEffect(() => {
		getTransactions();
	}, []);

	const getTransactions = async () => {
		const url = "http://localhost:5000/api/transactions";
		axios({
			method: "get",
			url: url,
		})
			.then((response) => {
				const { data, status } = response;
				if (status === 200) {
					setTransactions(data);
				}
			})
			.catch((err) => console.error(err));
	};

	const onChangeName = (e) => {
		setName(e.target.value);
	};

	const onChangeDatetime = (e) => {
		setDatetime(e.target.value);
	};

	const onChangeDescription = (e) => {
		setDescription(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const url = "http://localhost:5000/api/transaction";
		const price = name.split(" ")?.[0];
		axios({
			method: "post",
			url: url,
			data: {
				name: name.substring(price.length + 1),
				price,
				description,
				datetime,
			},
		})
			.then((response) => {
				const { data, status } = response;
				if (status === 200) {
					console.log(`response: `, { data });
					setDatetime("");
					setDescription("");
					setName("");
				}
				getTransactions();
			})
			.catch((err) => console.error(err));
	};

	let balance = 0;

	for (const transaction of transactions) {
		balance = balance + transaction.price;
	}

	balance = balance.toFixed(2);

	const fraction = balance.split(".")[1];
	balance = balance.split(".")[0];

	return (
		<main>
			<h1>
				${balance}.<span>{fraction}</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="basic">
					<input
						value={name}
						onChange={onChangeName}
						placeholder="+200 new samsum tv"
						type="text"
						pattern="[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))"
					/>
					<input
						type="datetime-local"
						value={datetime}
						onChange={onChangeDatetime}
					/>
				</div>
				<div className="description">
					<input
						value={description}
						onChange={onChangeDescription}
						placeholder="description"
						type="text"
					/>
				</div>
				<button type="submit">Add new transactions</button>
			</form>
			<div className="transactions">
				{transactions && transactions.length > 0 ? (
					transactions.map((item, index) => {
						return (
							<div className="transaction" key={`${index}`}>
								<div className="left">
									<div className="name">{item.name}</div>
									<div className="description">{item.description}</div>
								</div>
								<div className="right">
									<div className={`price ${item.price > 0 ? "green" : "red"}`}>
										{item.price}
									</div>
									<div className="datetime">{item.datetim}</div>
								</div>
							</div>
						);
					})
				) : (
					<div />
				)}
			</div>
		</main>
	);
}

export default App;
