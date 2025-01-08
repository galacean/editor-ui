import { RefObject, useContext, useEffect, useRef } from 'react'
import React, { createContext, createRef, PropsWithChildren } from 'react'

export enum DragState {
  None = 'none',
  Dragging = 'dragging',
  Dropped = 'dropped',
  Cancelled = 'cancelled',
}

interface IDndContextValue<T = any> {
  type: number
  item: T
  state: DragState
}

export const DragContext = createContext({ item: null } as IDndContextValue)

export function DragDropContextProvider(props: PropsWithChildren) {
  const dragItemRef = useRef<IDndContextValue>({ item: null, type: -1, state: DragState.None })

  return <DragContext.Provider value={dragItemRef.current!}>{props.children}</DragContext.Provider>
}

export interface IDragOptions<T> {
  /**
   * The type of the item that can be dropped.
   */
  type: number
  /**
   * The data item that is being dragged.
   */
  item?: T
  /**
   * The callback that is called when the item is end.
   */
  onEnd?: (e: DragEvent, item: T | undefined) => void
  /**
   * The callback that is called when the item is start.
   */
  onStart?: (e: DragEvent, item: T | undefined) => void
  /**
   * The callback that is called when the drag is canceled.
   */
  onCancel?: (e: DragEvent, item: T | undefined) => void
  /**
   * Disable the drop area.
   */
  disable?: boolean
}

type IDragElement = RefObject<any>

type IDragReturnType = [IDragElement, IDragElement]

export function useDrag<T>(options: IDragOptions<T>): IDragReturnType {
  const dragRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const { type, item, onEnd, onStart, onCancel, disable = false } = options

  const dragItem = useContext(DragContext)

  useEffect(() => {
    const { current: dragElement } = dragRef
    if (!dragElement) {
      return
    }

    const handleDragStart = (e: DragEvent) => {
      e.stopImmediatePropagation()

      const dataTransfer = e.dataTransfer!
      dataTransfer.effectAllowed = 'move'

      dragItem.state = DragState.Dragging
      dragItem.type = type
      dragItem.item = item

      if (previewRef.current) {
        dataTransfer.setDragImage(previewRef.current, 0, 0)
      }

      if (onStart) {
        onStart(e, item)
      }
    }

    const handleDragEnd = (e: DragEvent) => {
      e.preventDefault()
      e.stopImmediatePropagation()
      if (dragItem.state !== DragState.Dropped) {
        if (onCancel) {
          onCancel(e, item)
        }
      }
      if (onEnd) {
        onEnd(e, item)
      }
      dragItem.state = DragState.Cancelled
      dragItem.item = null
      dragItem.type = -1
    }

    if (!disable) {
      dragElement.setAttribute('draggable', 'true')
      dragElement.addEventListener('dragstart', handleDragStart)
      dragElement.addEventListener('dragend', handleDragEnd)
    }

    return () => {
      dragElement.removeEventListener('dragstart', handleDragStart)
      dragElement.removeEventListener('dragend', handleDragEnd)
      dragItem.state = DragState.Cancelled
      dragItem.item = null
      dragItem.type = -1
    }
  }, [])

  return [dragRef, previewRef]
}
