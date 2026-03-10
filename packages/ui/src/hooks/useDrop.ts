import { useContext, useEffect, useRef } from 'react'

import { DragContext, DragState } from './useDrag'

export interface IDropOptions<T> {
  /**
   * The accepted type of the item that can be dropped.
   */
  accept: number
  /**
   * The callback that is called when drop the item.
   */
  onDrop?: (e: DragEvent, item: T, dropElement: HTMLElement) => void
  /**
   * The callback that is called when item is leaving the drop area.
   */
  onLeave?: (e: DragEvent, item: T, dropElement: HTMLElement) => void
  /**
   * The callback that is called when item is entering the drop area.
   */
  onEnter?: (e: DragEvent, item: T, dropElement: HTMLElement) => void
  /**
   * The callback that is called when item is over the drop area.
   */
  onOver?: (e: DragEvent, item: T, dropElement: HTMLElement) => void
  /**
   * Disable the drop area.
   */
  disable?: boolean
}

export function useDrop<T extends HTMLElement, U = any>(options: IDropOptions<U>) {
  const dropRef = useRef<T>(null)
  const optionsRef = useRef(options)
  optionsRef.current = options

  const dragItem = useContext(DragContext)

  useEffect(() => {
    const dropElement = dropRef.current
    if (!dropElement) {
      return
    }

    const handleDragOver = (e: DragEvent) => {
      const { accept, onOver, disable } = optionsRef.current
      if (!disable && accept & dragItem.type) {
        e.stopImmediatePropagation()
        e.preventDefault()
        e.dataTransfer!.dropEffect = 'move'
        if (onOver) {
          onOver(e, dragItem.item, dropElement)
        }
      }
    }

    let counter = 0

    const handleDragEnter = (e: DragEvent) => {
      const { accept, onEnter, disable } = optionsRef.current
      if (!disable && accept & dragItem.type) {
        e.stopImmediatePropagation()
        e.preventDefault()
        counter++
        if (counter === 1 && onEnter) {
          onEnter(e, dragItem.item, dropElement)
        }
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      const { accept, onLeave, disable } = optionsRef.current
      if (!disable && accept & dragItem.type) {
        e.preventDefault()
        e.stopImmediatePropagation()
        counter--
        if (counter === 0 && onLeave) {
          onLeave(e, dragItem.item, dropElement)
        }
      }
    }

    const handleDrop = (e: DragEvent) => {
      const { accept, onDrop, disable } = optionsRef.current
      if (!disable && accept & dragItem.type) {
        dragItem.state = DragState.Dropped
        e.preventDefault()
        e.stopImmediatePropagation()
        counter = 0
        if (onDrop) {
          onDrop(e, dragItem.item, dropElement)
        }
      }
    }

    dropElement.addEventListener('dragleave', handleDragLeave)
    dropElement.addEventListener('dragenter', handleDragEnter)
    dropElement.addEventListener('dragover', handleDragOver)
    dropElement.addEventListener('drop', handleDrop)

    return () => {
      dropElement.removeEventListener('dragenter', handleDragEnter)
      dropElement.removeEventListener('dragleave', handleDragLeave)
      dropElement.removeEventListener('dragover', handleDragOver)
      dropElement.removeEventListener('drop', handleDrop)
    }
  }, [])

  return dropRef
}
