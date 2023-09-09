import React, {useEffect, useState} from 'react'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import useHttp from './hooks/useHttp'

const getRequestOptions = {
    fetchTasks(body) {
        return {
            url: `${process.env.REACT_APP_BASE_URL}`,
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
            },
            body: JSON.stringify(body),
        }
    },
}

function App() {

    const {isLoading, error, sendRequest: fetchTasks} = useHttp(getRequestOptions.fetchTasks(), onTasksLoaded)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [])

    function onTasksLoaded(data) {
        setTasks(data.tasks)
    }

    const taskAddHandler = (task) => {
        setTasks((prevTasks) => prevTasks.concat(task))
    }

    return (
        <React.Fragment>
            <NewTask onAddTask={taskAddHandler}/>
            <Tasks
                items={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    )
}

export default App
