import { v4 as uuidv4 } from 'uuid'
import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { GUIComponent } from './GUIComponent';

class GUI {
  private  _container: HTMLDivElement = null;
  private _root: Root = null;
  private _data: Record<string, any> = null;
  items: any[] = [];

  get container() {
    return this._container;
  }

  get root() {
    return this._root;
  }

  get data() {
    return this._data;
  }

  constructor(data: Record<string, any>, items?: any[]) {
    this._data = data;

    const container = document.createElement('div');
    container.id = `galacean-gui-${uuidv4()}`;
    container.style.position = 'fixed';
    container.style.top = '32px';
    container.style.right = '32px';

    if(document.body) {
      document.body.appendChild(this._container = container);
    }
    const root = createRoot(container);
    this._root = root;
    root.render(React.createElement(GUIComponent, { data: this.data, items: this.items }));
  }

  add(item) {
    this.items.push(item);
    this.update();
  }

  update() {
    this.dispose();
    this.root.render(React.createElement(GUIComponent, { items: this.items }));
  }

  dispose() {
    // document.body.removeChild(this.container);
    this.root.unmount();
  }
}