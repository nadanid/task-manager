import {TaskProps, styles} from "../utils";
import {JSX, useState} from "react";

/**
 * TaskCard component renders an individual task with options to mark as complete, edit, or delete.
 *
 * @component
 * @param {TaskProps} props - Props object containing the task and handler functions.
 * @param {Task} props.task - The task object to display.
 * @param {function} props.onDelete - Function to delete the task by ID.
 * @param {function} props.onUpdate - Function to update the task with new data.
 * @returns {JSX.Element} A styled task card with edit, delete, and complete functionality.
 */
function TaskCard({task, onDelete, onUpdate}: TaskProps): JSX.Element{
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);

    // Handle marking task as complete/incomplete and persist to backend
    const handleCheckboxChange = async () => {
        try {
            const response = await fetch(`http://localhost:4000/api/tasks/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: task.title,
                    completed: !task.completed,
                }),
            });

            if (!response.ok) throw new Error('Failed to update completion status');

            const updatedTask = await response.json();
            onUpdate(updatedTask);
        } catch (error) {
            console.error('Error updating task completion:', error);
        }
    };

    // Save edited title and update task
    const handleSave = () => {
        onUpdate({ ...task, title: editedTitle });
        setIsEditing(false);
    };

    return (
        <>
            <div style={styles.taskCard.card}>
                <div style={styles.taskCard.header}>
                    { isEditing ? (
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            style={styles.taskCard.input}
                        />
                    ) : (
                        <label style={styles.taskCard.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={handleCheckboxChange}
                            />
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none', marginLeft: '8px' }}>
                                {task.title}
                            </span>
                        </label>
                    )}
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {isEditing ? (
                            <>
                                <button style={styles.taskCard.editBtn} onClick={handleSave}>Save</button>
                                <button style={styles.taskCard.deleteBtn} onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <button style={styles.taskCard.editBtn} onClick={() => setIsEditing(true)}>Edit</button>
                                <button style={styles.taskCard.deleteBtn} onClick={() => onDelete(task.id)}>Delete</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}



export default TaskCard;