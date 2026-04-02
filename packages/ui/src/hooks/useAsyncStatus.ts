import { useState, useEffect, useCallback } from 'react'

interface Params {
  asyncFunction?: () => Promise<unknown>
  propLoading?: boolean
  onClick?: (e) => void
}

function useAsyncStatus(params: Params) {
  const { propLoading, asyncFunction, onClick } = params
  const [loading, setLoading] = useState(Boolean(propLoading))

  const start = useCallback(
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
    },
    [asyncFunction]
  )

  const handleClick = useCallback(
    function handleClick(e) {
      if (loading) return
      onClick?.(e)
      if (e?.defaultPrevented) return
      if (asyncFunction) {
        void start()
      }
    },
    [onClick, start]
  )

  useEffect(() => {
    setLoading(Boolean(propLoading))
  }, [propLoading])

  return {
    loading,
    handleClick,
  }
}

export { useAsyncStatus }
