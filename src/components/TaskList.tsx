import {Task, styles} from "../utils";
import TaskCard from "./TaskCard";
import {JSX, useEffect, useState} from "react";

/**
 * TaskList component displays a list of tasks with filtering, creation, editing, and deletion capabilities.
 *
 * @component
 * @returns {JSX.Element} A list of task cards with full CRUD functionality and optional filtering.
 */
function TaskList(): JSX.Element{

    const [taskList, setTaskList] = useState<Task[]>([]); // State to hold the full list of tasks
    const [newTaskTitle, setNewTaskTitle] = useState<string>(""); // State for the new task input
    const [showInput, setShowInput] = useState<boolean>(false); // Controls whether the input for adding a new task is shown
    const [filter, setFilter] = useState<"all" | "completed" | "pending">("all"); // Tracks current filter: all, completed, or pending

    // Fetch tasks from the backend on initial load
    useEffect(() => {
        fetch("http://localhost:4000/api/tasks")
            .then((res) => res.json())
            .then((data) => setTaskList(data))
            .catch((err) => console.error("Failed to fetch notes:", err));
    }, []);


    // Delete a task via API and update state
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:4000/api/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete task');

            setTaskList(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Show the new task input
    const handleAddClick = () => {
        setShowInput(true);
    };

    // Update a task via API and sync updated data
    const handleUpdate = async (updatedTask: Task) => {
        try {
            const response = await fetch(`http://localhost:4000/api/tasks/${updatedTask.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: updatedTask.title,
                    completed: updatedTask.completed,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update task');
            }

            const updatedFromServer = await response.json();

            setTaskList(prev =>
                prev.map(task => (task.id === updatedFromServer.id ? updatedFromServer : task))
            );
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    // Save a new task via API and append to state task list
    const handleSave = async () => {
        if (!newTaskTitle.trim()) return;

        try {
            const response = await fetch('http://localhost:4000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: newTaskTitle }),
            });

            if (!response.ok) throw new Error('Failed to add task');

            const savedTask = await response.json();

            setTaskList(prevTasks => [...prevTasks, savedTask]);
            setNewTaskTitle('');
            setShowInput(false);
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    // Filter tasks based on selected filter type
    const filteredTasks = taskList.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });


    return (
        <>
            <h1>My Tasks</h1>
            {/* Filter Buttons */}
            <div style={styles.taskList.filterContainer}>
                <button
                    style={filter === "all" ? styles.taskList.activeFilterBtn : styles.taskList.filterBtn}
                    onClick={() => setFilter("all")}
                >
                    Show All
                </button>
                <button
                    style={filter === "completed" ? styles.taskList.activeFilterBtn : styles.taskList.filterBtn}
                    onClick={() => setFilter("completed")}
                >
                    Completed
                </button>
                <button
                    style={filter === "pending" ? styles.taskList.activeFilterBtn : styles.taskList.filterBtn}
                    onClick={() => setFilter("pending")}
                >
                    Pending
                </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
                {filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} onDelete={handleDelete} onUpdate={handleUpdate}/>
                ))}

                {showInput && (
                    <>
                        <input
                            type="text"
                            placeholder="New task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            style={styles.taskList.input}
                        />
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={styles.taskList.saveBtn} onClick={handleSave}>Save</button>
                            <button style={styles.taskList.deleteBtn} onClick={() => setShowInput(false)}>Cancel</button>
                        </div>

                    </>
                )}

                {!showInput && (
                    <button style={styles.taskList.addBtn} onClick={handleAddClick}>Add</button>
                )}
            </div>
        </>
    );
}

export default TaskList;