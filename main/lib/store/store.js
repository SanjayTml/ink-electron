import electronStore from 'electron-store';

export class Store {
  constructor(documentName, objectName, defaultValue) {
    this.store = new electronStore({ name: documentName });
    this.objectName = objectName;
    this.defaultValue = defaultValue;
  }

  get() {
    return this.store.get(this.objectName, this.defaultValue);
  }
  
  set(newValue) {
    return this.store.set(this.objectName, newValue);
  }

  delete() {
    return this.store.delete(this.objectName);
  }

}
