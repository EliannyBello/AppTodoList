import React, { useState, useEffect } from "react";

const Home = () => {

	const [task, setTask] = useState("");
	const [tasks, setTasks] = useState([]);

	const baseUrl = https://playground.4geeks.com/todo/users/EliannyBello

	useEffect(() => {
		fetch(baseUrl, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => resp.json())
			.then(data => {
				if (Array.isArray(data)) {
					setTasks(data);
				} else {
					setTasks([]);
				}
			})
			.catch(error => {
				console.log("Error cargando las tareas:", error);
			});
	}, []);

	const putTask = (todo) => {
		fetch(baseUrl, {
			method: "PUT",
			body: JSON.stringify(todo),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				// console.log(resp.ok); // Será true si la respuesta es exitosa
				// console.log(resp.status); // El código de estado 200, 300, 400, etc.
				// console.log(resp.text()); // Intentará devolver el resultado exacto como string
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(data => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}

	const addTask = (e) => {
		e.preventDefault();
		if (task === "") return;
		setTasks([...tasks, task]);
		setTask("");
		putTask(addTask)
	};

	const deleteTask = (i) => {
		const updatedTasks = tasks.filter(task => task !== i);
		setTasks(updatedTasks);
		putTask(updatedTasks)
	};
	const clearAllTasks = () => {
		setTasks([]); 
		putTask([]); 
	};


	return (
		<div className="container">
			<h1>To-Do List</h1>
			<form onSubmit={addTask}>
				<input
					type="text"
					value={task}
					onChange={(e) => setTask(e.target.value)}
					onKeyUp={(e) => setTask(e.target.value)}
					placeholder="Escribe una tarea..."
				/>
			</form>
			<ul>
				{tasks.length === 0 ? (
					<li>No hay tareas pendientes</li>) : (tasks.map((task, index) => (
						<li key={index}>
							{task}{" "}
							<button onClick={() => deleteTask(task)}>X</button>
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
