// Credit: https://github.com/woofers/use-eye-dropper/blob/main/packages/use-eye-dropper/src/use-eye-dropper.js
import { useState, useCallback, useMemo, useEffect, useRef } from 'react'

// https://github.com/whatwg/fetch/issues/905#issuecomment-491970649
const anySignal = (signals) => {
  const controller = new AbortController()
  const onAbort = () => {
    controller.abort()
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort)
    }
  }
  for (const signal of signals) {
    if (signal.aborted) {
      onAbort()
      break
    }
    signal.addEventListener('abort', onAbort)
  }
  return controller.signal
}

const isSupported = () => typeof window !== 'undefined' && 'EyeDropper' in window

const resolveError = () => {
  throw new Error('Unsupported browser.')
}

const createInstance = () => isSupported() && new (window as any).EyeDropper!()

const bindFunc = (key, instance) => {
  if (!instance) return resolveError
  return (window as any).EyeDropper!.prototype[key].bind(instance)
}

const useIsSupported = () => {
  const mounted = useRef(false)
  const [data, setData] = useState(false)
  useEffect(() => {
    mounted.current = true
    setData(isSupported())
    return () => {
      mounted.current = false
    }
  }, [])
  const supported = useCallback(() => data, [data])
  return [mounted, supported] as const
}

const createHelpers = () => {
  const dropper = createInstance()
  const open = bindFunc('open', dropper)
  return open
}

export const useEyeDropper = () => {
  const openPicker = useMemo(() => createHelpers(), [])
  const [mounted, isSupported] = useIsSupported()
  const controller = useRef<AbortController>()
  const close = useCallback(() => {
    if (typeof controller.current === 'undefined') return
    controller.current.abort()
  }, [controller])
  const open = useCallback(
    async (options: any = {}) => {
      close()
      const { signal, ...rest } = options
      const newController = new AbortController()
      controller.current = newController
      const unionSignal =
        typeof signal !== 'undefined' ? anySignal([signal, newController.signal]) : newController.signal
      try {
        const results = await openPicker({ ...rest, signal: unionSignal })
        return results
      } catch (e) {
        if (!mounted.current) (e as any).canceled = true
        throw e
      }
    },
    [controller, mounted, close, openPicker]
  )
  useEffect(() => close, [close])
  return { open, close, isSupported }
}
