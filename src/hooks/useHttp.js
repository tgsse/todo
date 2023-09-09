import {useState} from 'react'

const defaultConfig = {}

const useHttp = (requestConfig, onSuccess) => {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState()

    const sendRequest = async (body = null) => {
        setIsLoading(true)
        setError(null)

        console.log({body})
        try {
            const response = await fetch(
                requestConfig.url,
                {
                    ...defaultConfig,
                    ...requestConfig,
                    body,
                }
            )
            if (!response.ok) {
                throw new Error(`Request Error! ${response.status}: ${response.statusText}`)
            }

            const data = await response.json()
            onSuccess(data)
            setIsLoading(false)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        isLoading,
        error,
        sendRequest,
    }
}

export default useHttp
