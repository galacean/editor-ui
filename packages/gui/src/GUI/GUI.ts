import React from 'react'
import { createRoot, Root } from 'react-dom/client'
import { GUIItemConfig, GUIRoot, GUIItemTypeEnum, type GUIDefineItem } from '../components/GUIRoot'
import { darkTheme, lightTheme } from '@galacean/editor-ui'

export { type GUIItemConfig }
export { GUIItemTypeEnum }

const themeMap = {
  light: lightTheme.className,
  dark: darkTheme.className,
} as const

abstract class GUIBase {
  abstract render(): void
  abstract add(keyName: string, item: GUIItemConfig): void
  abstract add(data: object, keyName: string, item: GUIItemConfig): void
  abstract add(sourceDataOrKeyName: object | string, keyNameOrItem: string | GUIItemConfig, item?: GUIItemConfig): void
}

const initContainerStyle = {
  position: 'fixed',
  top: '32px',
  right: '32px',
} as const

class GUI implements GUIBase {
  private _containerId = 'galacean-gui-container'
  private _container: HTMLDivElement = null
  private _root: Root = null
  private _data: Record<string, any> = null
  private _items: GUIDefineItem[] = []
  private _theme: any = 'dark'

  get container() {
    return this._container
  }

  get root() {
    return this._root
  }

  get data() {
    return this._data
  }

  get items() {
    return this._items
  }

  get theme() {
    return this._theme
  }

  constructor(data: Record<string, any>, items: GUIItemConfig[] = []) {
    this._data = data
    this._items = items.map((item) => [data, item.bindPath, item])

    this._prepareContainer()

    if (data && items.length) {
      this.render()
    }
  }

  private _prepareContainer() {
    const checkContainer = document.getElementById(this._containerId)
    if (checkContainer) {
      return checkContainer as HTMLDivElement
    }
    const container = document.createElement('div')
    container.id = this._containerId
    Object.assign(container.style, initContainerStyle)
    if (document.body) {
      document.body.appendChild((this._container = container))
    }
    return container
  }

  render(container = this.container) {
    let root = this.root
    if (!container) {
      container = this._prepareContainer()
      this._container = container
    }
    if (!this.root) {
      root = createRoot(container)
      this._root = root
    }

    this.root.render(React.createElement(GUIRoot, { data: this.data, items: this.items }))
  }

  add(keyName: string, item: GUIItemConfig): void
  add(data: object, keyName: string, item: GUIItemConfig): void
  add(sourceDataOrKeyName: object | string, keyNameOrItem: string | GUIItemConfig, item?: GUIItemConfig): void {
    if (typeof sourceDataOrKeyName === 'string') {
      const keyName = sourceDataOrKeyName
      const itemConfig = keyNameOrItem as GUIItemConfig

      if (keyName in this.data) {
        this.items.push([this.data, keyName, itemConfig])
        this._update()
      } else {
        console.warn(`Key "${keyName}" not found in data object`)
      }
      return
    }

    if (typeof sourceDataOrKeyName === 'object' && sourceDataOrKeyName !== null) {
      const data = sourceDataOrKeyName
      const keyName = keyNameOrItem as string
      const itemConfig = item

      if (typeof keyName === 'string' && itemConfig) {
        if (keyName in data) {
          this.items.push([data, keyName, itemConfig])
          this._update()
        } else {
          console.warn(`Key "${keyName}" not found in provided data object`)
        }
      } else {
        console.warn('Invalid parameters for add method')
      }
      return
    }

    console.warn('Invalid parameters for add method')
  }

  addGroup(groupName: string, items: GUIItemConfig[]) {
    this.items.push([
      this.data,
      groupName,
      {
        type: 'Group',
        items: items,
      },
    ])
    this._update()
  }

  private _update() {
    this.dispose()
    this.render()
  }

  dispose() {
    this._container = null
    if (this.root) {
      this.root.unmount()
    }
    this._root = null
    if (this.container) {
      document.body.removeChild(this.container)
    }
  }

  setTheme(theme?: keyof typeof themeMap) {
    this._theme = theme
    const html = document.documentElement
    html.classList.remove(themeMap.dark, themeMap.light)
    html.classList.add(themeMap[theme])
  }
}

export { GUI }
