import { useState } from 'react'

export function useCycleSwitch<T>(modes: readonly T[], defaultMode?: T) {
  const [mode, setMode] = useState<(typeof modes)[number]>(defaultMode || modes[0])

  function switchMode() {
    const index = modes.indexOf(mode)
    const nextIndex = index + 1 > modes.length - 1 ? 0 : index + 1
    setMode(modes[nextIndex])
  }

  return [mode, switchMode] as const
}
