import { v4 as uuidv4 } from 'uuid'
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { GUIItemConfig, GUIRoot, GUIItemTypeEnum, type GUIDefineItem } from '../GUIRoot';
import { darkTheme, lightTheme } from '../../../design-system';

export { type GUIItemConfig };
export { GUIItemTypeEnum }

const themeMap = {
  light: lightTheme.className,
  dark: darkTheme.className
} as const;

class GUI {
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

    const container = document.createElement('div');
    container.id = `galacean-gui-${uuidv4()}`;
    container.style.position = 'fixed';
    container.style.top = '32px';
    container.style.right = '32px';

    if(document.body) {
      document.body.appendChild(this._container = container);
    }
    this.render();
  }

  render() {
    let root = this.root;
    if(!this.root) {
      root = createRoot(this.container);
      this._root = root;
    }

    this.root.render(React.createElement(GUIRoot, { data: this.data, items: this.items }));
  }

  add(keyName: string, item: any) {
    if(keyName in this.data) {
      this.items.push([this.data, keyName, item]);
      this.update();
    }
  }


  update() {
    this.dispose();
    this.render();
  }

  dispose() {
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