import {useState} from 'react'

const defaultConfig = {}

const useHttp = (requestConfig, onSuccess) => {
    const [isLoading, setIsLoading] = useState()
    const [error, setError] = useState()

    const sendRequest = async () => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(
                requestConfig.url,
                {
                    ...defaultConfig,
                    ...requestConfig,
                }
            )
            if (!response.ok) {
                throw new Error(`Request Error! ${response.status}: ${response.statusText}`)
            }

            const data = response.json()
            onSuccess(data)

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
