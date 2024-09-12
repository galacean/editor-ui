import { v4 as uuidv4 } from 'uuid'
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { GUIItemConfig, GUIRoot, type GUIDefineItem } from './GUIRoot';

class GUI {
  private  _container: HTMLDivElement = null;
  private _root: Root = null;
  private _data: Record<string, any> = null;
  private _items: GUIDefineItem[] = [];

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

  constructor(data: Record<string, any>, items?: any[]) {
    this._data = data;
    this._items = items || [];

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
}

export default GUI;