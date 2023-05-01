import { useState } from "react";
import "./App.css";

function App() {
	const [name, setName] = useState("");
	const [datetime, setDatetime] = useState("");
	const [description, setDescription] = useState("");

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
		const PORT = process.env.PORT || 5000;
		const url = `http://localhost:${PORT}/api/transaction`;
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name, description, datetime }),
		})
			.then((res) => {
				res.json().then((json) => {
					console.log("result:", json);
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main>
			<h1>
				$400<span>.00</span>
			</h1>
			<form onSubmit={handleSubmit}>
				<div className="basic">
					<input
						value={name}
						onChange={onChangeName}
						placeholder="+200 new samsum tv"
						type="text"
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
				<div className="transaction">
					<div className="left">
						<div className="name">New samsum tv</div>
						<div className="description">It was time for new tv</div>
					</div>
					<div className="right">
						<div className="price red">-$500</div>
						<div className="datetime">2023/05/01 15:45</div>
					</div>
				</div>
			</div>
			<div className="transactions">
				<div className="transaction">
					<div className="left">
						<div className="name">Gig job new website</div>
						<div className="description">It was time for new tv</div>
					</div>
					<div className="right">
						<div className="price green">+$400</div>
						<div className="datetime">2023/05/01 15:45</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default App;
