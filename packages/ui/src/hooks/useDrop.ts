import React, { useEffect } from 'react'

import { DragContext, DragState } from './useDrag'

export interface IDropOptions<T> {
  /**
   * The accepted type of the item that can be dropped.
   */
  accept: number
  /**
   * Whether to accept external file drops from the system (e.g. Finder/Explorer).
   */
  acceptFiles?: boolean
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
  const dropRef = React.useRef<T>(null)
  const counterRef = React.useRef(0)

  const dragItem = React.useContext(DragContext)

  const { accept, acceptFiles = false, onDrop, onLeave, onEnter, onOver, disable = false } = options

  useEffect(() => {
    const dropElement = dropRef.current
    if (!dropElement) {
      return
    }

    const isAccepted = (e: DragEvent) => {
      return (accept & dragItem.type) || (acceptFiles && e.dataTransfer?.types.includes('Files'))
    }

    const handleDragOver = (e: DragEvent) => {
      if (isAccepted(e)) {
        e.stopImmediatePropagation()
        e.preventDefault()
        e.dataTransfer!.dropEffect = 'move'
        if (onOver) {
          onOver(e, dragItem.item, dropElement)
        }
      }
    }

    const handleDragEnter = (e: DragEvent) => {
      if (isAccepted(e)) {
        e.stopImmediatePropagation()
        e.preventDefault()
        counterRef.current++
        if (counterRef.current === 1 && onEnter) {
          onEnter(e, dragItem.item, dropElement)
        }
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      if (isAccepted(e)) {
        e.preventDefault()
        e.stopImmediatePropagation()
        counterRef.current--
        if (counterRef.current === 0 && onLeave) {
          onLeave(e, dragItem.item, dropElement)
        }
      }
    }

    const handleDrop = (e: DragEvent) => {
      if (isAccepted(e)) {
        dragItem.state = DragState.Dropped
        e.preventDefault()
        e.stopImmediatePropagation()
        counterRef.current = 0
        if (onDrop) {
          onDrop(e, dragItem.item, dropElement)
        }
      }
    }

    if (!disable) {
      dropElement.addEventListener('dragleave', handleDragLeave)
      dropElement.addEventListener('dragenter', handleDragEnter)
      dropElement.addEventListener('dragover', handleDragOver)
      dropElement.addEventListener('drop', handleDrop)
    }

    return () => {
      dropElement.removeEventListener('dragenter', handleDragEnter)
      dropElement.removeEventListener('dragleave', handleDragLeave)
      dropElement.removeEventListener('dragover', handleDragOver)
      dropElement.removeEventListener('drop', handleDrop)
    }
  }, [accept, acceptFiles, onDrop, onLeave, onEnter, onOver, disable])

  return dropRef
}
