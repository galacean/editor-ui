import { useState, useEffect, useCallback } from 'react'

interface Params {
  asyncFunction?: () => Promise<unknown>
  propLoading?: boolean
  onClick?: (e) => void
}

function useAsyncStatus(params: Params) {
  const { propLoading, asyncFunction, onClick } = params
  const [loading, setLoading] = useState(propLoading)

  async function start() {
    if (!asyncFunction) return
    try {
      setLoading(true)
      await asyncFunction()
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleClick = useCallback(
    function handleClick(e) {
      if (loading) return
      if (onClick) {
        onClick(e)
      }
      if (asyncFunction) {
        start()
      }
    },
    [onClick, start]
  )

  useEffect(() => {
    setLoading(propLoading)
  }, [propLoading])

  return {
    loading,
    handleClick,
  }
}

export { useAsyncStatus }
