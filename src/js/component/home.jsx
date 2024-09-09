import React, { useState, useEffect } from "react";

const Home = () => {
	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const baseUrl = "https://playground.4geeks.com";

	useEffect(() => {
		getTask();
	}, []);

	const getTask = () => {
		fetch(baseUrl + "/todo/users/EliannyBello", {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				if (Array.isArray(data.todos)) {
					setTasks(data.todos);
				} else {
					setTasks([]);
				}
			})
			.catch(error => {
				console.log("Error cargando las tareas:", error);
			});
	};



	const deleteTask = (id) => {
		fetch(baseUrl + "/todo/todos/" + id, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if (resp.ok) {
					getTask();
				}
			})
			.catch(error => {
				console.log("Error al eliminar la tarea:", error);
			});
	};


	const addTask = (e) => {
		e.preventDefault();
		if (task === "") return;

		const newTask = { label: task, done: false };

		fetch(baseUrl + "/todo/todos/EliannyBello", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(newTask)
		})
			.then(resp => {
				if (resp.ok) {
					getTask();
					setTask("");
				}
			})
			.catch(error => {
				console.log("Error al añadir la tarea:", error);
			});
	};


	const clearAllTasks = () => {
		setTasks([]);
	};

	return (
		<div className="container">
			<h1>To-Do List</h1>
			<form onSubmit={addTask}>
				<input
					type="text"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					placeholder="Escribe una tarea..."
				/>
			</form>
			<ul>
				{tasks.length === 0 ? (
					<li>No hay tareas pendientes</li>) : (tasks.map((task, index) => (
						<li key={index}>
							{task.label}{" "}
							<button onClick={() => deleteTask(task.id)}>X</button>
						</li>
					))
				)}
			</ul>
			{tasks.length > 0 && (
				<button className="clearTasks" onClick={clearAllTasks}>Limpiar todas las tareas</button>
			)}
		</div>
	);
};

export default Home;
