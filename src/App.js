import React, {useEffect, useState} from 'react'

import Tasks from './components/Tasks/Tasks'
import NewTask from './components/NewTask/NewTask'
import useHttp from './hooks/useHttp'

const requestOptions = {
    fetchTasks: {
        url: `${process.env.REACT_APP_BASE_URL}/api/tasks`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
        },
    },
}

function App() {

    const {isLoading, error, sendRequest: fetchTasks} = useHttp(requestOptions.fetchTasks, onTasksLoaded)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetchTasks()
    }, [])

    function onTasksLoaded(data) {
        console.log('onTasksLoaded')
        setTasks(data.tasks)
    }

    function onTaskCreated() {
        // setTasks((prevTasks) => prevTasks.concat(task))
        // fetchTasks()
    }

    return (
        <React.Fragment>
            <NewTask onTaskCreated={onTaskCreated}/>
            <Tasks
                tasks={tasks}
                loading={isLoading}
                error={error}
                onFetch={fetchTasks}
            />
        </React.Fragment>
    )
}

export default App
