import Section from '../UI/Section'
import TaskForm from './TaskForm'
import useHttp from '../../hooks/useHttp'

const createTaskConfig = {
    url: `${process.env.REACT_APP_BASE_URL}/api/tasks`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`
    },
}

const NewTask = (props) => {
    const {isLoading, error, sendRequest: createTask} = useHttp(createTaskConfig, onTaskCreated)

    const onTaskSubmit = async (title) => {
        createTask({title})
    }

    function onTaskCreated(data) {
        props.onTaskCreated()
    }

    return (
        <Section>
            <TaskForm onTaskSubmit={onTaskSubmit} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    )
}

export default NewTask
