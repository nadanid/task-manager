// Represents a single task object structure
export interface Task {
    id: string;
    title: string;
    completed?: boolean;
}

// Props expected by the TaskCard component
export interface TaskProps{
    task: Task
    onDelete: (id: string) => void
    onUpdate: (updatedTask: Task) => void
}

// Styles for TaskCard and TaskList components
export const styles = {
    taskCard: {
        card: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
            marginBottom: '16px',
            maxWidth: '500px',
            margin: 'auto'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        title: {
            margin: 0,
            fontSize: '18px',
            fontWeight: '600'
        },
        input: {
            fontSize: '16px',
            padding: '6px',
            borderRadius: '6px',
            border: '1px solid #ccc'
        },
        body: {
            fontSize: '15px',
            marginTop: '8px',
            color: '#444'
        },
        checkboxLabel: {
            display: 'flex',
            alignItems: 'center',
            fontSize: '16px'
        },
        editBtn: {
            background: 'none',
            border: 'none',
            fontSize: '16px',
            padding: '2px 10px',
            color: '#007bff',
            cursor: 'pointer'
        },
        deleteBtn: {
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#f44336'
        }
    },
    taskList: {
        addBtn: {
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#2e7143'
        },
        saveBtn: {
            background: '#1a5f7a',
            border: 'none',
            fontSize: '16px',
            padding: '8px 16px',
            borderRadius: '8px',
            color: '#fff',
            cursor: 'pointer',
            alignSelf: 'start'
        },
        input: {
            padding: '8px',
            fontSize: '16px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            width: '100%',
            maxWidth: '400px'
        },
        filterContainer: {
            display: 'flex',
            gap: '10px',
            paddingLeft: '20px',
            marginBottom: '10px'
        },
        filterBtn: {
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            background: '#eee',
            cursor: 'pointer',
            fontSize: '14px'
        },
        activeFilterBtn: {
            padding: '6px 12px',
            borderRadius: '6px',
            border: '1px solid #007bff',
            background: '#007bff',
            color: '#fff',
            cursor: 'pointer',
            fontSize: '14px'
        },
        deleteBtn: {
            background: 'none',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            color: '#f44336'
        }
    }
};