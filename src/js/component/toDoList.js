import React, { useState, useEffect } from "react";
import Body from "./Body";
//import { saveToLocalStorage, getFromLocalStorage } from "./saveToLocalStorage";

const ToDo = props => {
	const [toDos, setToDos] = useState([]);
	//the following useEffect hook will run only once
	useEffect(() => {
		initTodos();
	}, []); // component

	function requestAPI(requestType, bodyType) {
		let resp = [],
			data = "",
			error = "";

		fetch("https://assets.breatheco.de/apis/fake/todos/user/amafjarkasi", {
			method: `${requestType}`,
			body: bodyType, //JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok);
				if (!resp.ok) throw Error(resp.statusText);
				console.log(resp.status);
				return resp.json();
			})
			.then(data => {
				initTodos();
			})
			.catch(error => {
				console.log(error);
			});
	}

	const initTodos = () => {
		let resp = [],
			data = "",
			error = "";
		fetch("https://assets.breatheco.de/apis/fake/todos/user/amafjarkasi")
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log("datafromAPI");
				console.log(data);
				setToDos(data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	//using the fetch() api, write code to fetch data from API, upon resolved Promise, initialize toDos (state)
	//by using it's setter function (setToDos) -- see line 4
	//delete the following 2 lines - this is just to get you started with an initial value of items;
	//setToDelete(hideDelete);

	// addTask method is 1/2 way there - you need to hook it up with the API, so the values that are being changed (locally) also get updated (remotely)
	// you'll also need to write code to delete items from the list and update the tasks on the API
	//Following will add tasks to toDos by updating it's state value
	const addTask = e => {
		if (e.keyCode === 13) {
			const task = e.target.value.trim();
			const newList = [
				...toDos,
				{
					label: task,
					done: false
				}
			];

			e.target.value = "";

			// setToDos(newList);

			let myJSON = JSON.stringify(newList);

			requestAPI("PUT", myJSON);
		}
	};
	const deleteTask = taskIndex => {
		const newList = toDos.filter((item, index) => taskIndex != index);
		console.log(newList);

		let myJSON = JSON.stringify(newList);

		requestAPI("PUT", myJSON);
	};

	//component still needs a way to remove the items
	//make it work!
	return (
		<>
			<Body />
			<div className="container-fluid w-50">
				<div className="text-center shadow-sm border mt-3 pt-2 rounded-lg">
					<h1 className="pb-4">To-Do List App</h1>
					<input
						type="text"
						placeholder="Add a task (press enter to save)"
						name="task"
						className="w-50"
						onKeyDown={addTask}
					/>
					<div className="container w-50 pt-4 pb-3">
						<ul className="list-group">
							{toDos.map((arrayElement, arrayIndex) => {
								return (
									<li
										key={arrayIndex}
										className="list-group-item d-flex justify-content-between align-items-center py-1">
										{arrayElement.label}
										<span
											className="badge badge-danger"
											onClick={() =>
												deleteTask(arrayIndex)
											}>
											<i
												className="fas fa-times"
												onClick={() =>
													deleteTask(arrayIndex)
												}
											/>
										</span>
									</li>
								);
							})}
							{/* <ul className="align-content-center">
					{toDos.map((arrayElement, arrayIndex) => {
						return (
							<li
								key={arrayIndex}
								className="justify-content-start">
								{arrayElement.label}
								<i
									className="far fa-trash-alt justify-content-end"
									onClick={() => deleteTask(arrayIndex)}
								/>
							</li>
						); */}
						</ul>
					</div>
					<div className="d-flex justify-content-center pt-3">
						<p className="alert alert-warning w-25 rounded py-0 font-weight-bold">
							{toDos.length} items total
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export { ToDo as default };
