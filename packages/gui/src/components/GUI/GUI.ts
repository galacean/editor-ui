import { v4 as uuidv4 } from 'uuid'
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { GUIItemConfig, GUIRoot, GUIItemTypeEnum, type GUIDefineItem } from '../GUIRoot';
import { darkTheme, lightTheme } from '@galacean/editor-ui';

export { type GUIItemConfig };
export { GUIItemTypeEnum }

const themeMap = {
  light: lightTheme.className,
  dark: darkTheme.className
} as const;

abstract class GUIBase {

  abstract render(): void;
  abstract add(keyName: string, item: any): void;
  abstract add(data: object, keyName: string, item: any): void;
}

class GUI implements GUIBase {
  private  _container: HTMLDivElement = null;
  private _root: Root = null;
  private _data: Record<string, any> = null;
  private _items: GUIDefineItem[] = [];
  private _theme: any = 'dark';

  get container() {
    return this._container;
  }

  get root() {
    return this._root;
  }

  get data() {
    return this._data;
  }

  get items() {
    return this._items;
  }

  get theme() {
    return this._theme;
  }

  constructor(data: Record<string, any>, items: GUIItemConfig[] = []) {
    this._data = data;
    this._items = items.map(item => [data, item.bindPath, item]);

    const container = this._createContainer();

    if(document.body) {
      document.body.appendChild(this._container = container);
    }
    if(data && items.length) {
      this.render();
    }
  }

  private _createContainer() {
    const container = document.createElement('div');
    container.id = `galacean-gui-${uuidv4()}`;
    container.style.position = 'fixed';
    container.style.top = '32px';
    container.style.right = '32px';
    return container
  }

  private _disposeContainer() {
    if(this.container) {
      document.body.removeChild(this.container);
    }
  }

  render(container = this.container) {
    let root = this.root;
    if(!container) {
      container = this._createContainer();
      this._container = container;
    }
    if(!this.root) {
      root = createRoot(container);
      this._root = root;
    }

    this.root.render(React.createElement(GUIRoot, { data: this.data, items: this.items }));
  }

  add(sourceDataOrKeyName: object | string, keyNameOrItem: string | GUIItemConfig, item?: GUIItemConfig) {
    if(typeof sourceDataOrKeyName === 'string') {
      if(sourceDataOrKeyName in this.data) {
        this.items.push([this.data, sourceDataOrKeyName, keyNameOrItem as GUIItemConfig]);
        this._update();
      }
      return;
    }
    if(typeof sourceDataOrKeyName === 'object' ) {
      if(typeof keyNameOrItem === 'string' && item) {
        this.items.push([sourceDataOrKeyName, keyNameOrItem, item]);
        this._update();
      }
    }
  }

  // addGroup(groupName: string, items: GUIItemConfig[]) {
  //   this.items.push([
  //     this.data,
  //     groupName,
  //     {
  //       type: GUIItemTypeEnum.Group,
  //       items: items,
  //     }
  //   ]);
  //   this._update();
  // }

  private _update() {
    this.dispose();
    this.render();
  }

  dispose() {
    this._disposeContainer();
    // document.body.removeChild(this.container);
    this.root.unmount();
  }

  setTheme(theme?: keyof typeof themeMap) {
    this._theme = theme;
    const html = document.documentElement;
    html.classList.remove(themeMap.dark, themeMap.light);
    html.classList.add(themeMap[theme]);
  }
}

export {
  GUI
};