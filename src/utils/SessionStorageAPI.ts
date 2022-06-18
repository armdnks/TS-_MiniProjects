// INTERFACE
interface IData {
  id?: number | string;
  data?: object;
}

// CLASS
export default class SessionStorageAPI<T> {
  private storageName: string; // Storage key name

  constructor(storageName: string) {
    this.storageName = storageName;
  }

  get<T>(): T[] {
    const items: T[] = this.read();
    return items;
  }

  // .post( id, {data: { data }} )
  post<T extends IData>(id: number | string, data: T) {
    let items: T[] = this.read();
    data = data.data as T;
    let item: IData = { id, data };
    items.push(item as T);
    this.save(items);
    return item;
  }

  // .update( id, {data: { newData }} )
  update<T extends IData>(itemID: number | string, newData: T) {
    let items: T[] = this.read();
    let existing = items.find((item: T) => item.id === itemID);

    if (!existing) throw new Error("Item not found");
    else existing.data = newData.data;

    this.save(items);
  }

  // .delete(id)
  delete<T extends IData>(itemID: number | string) {
    let items: T[] = this.read();
    items = items.filter((item: T) => {
      if (item.id !== itemID) return item;
    });
    this.save(items);
  }

  clearStorage() {
    localStorage.removeItem(this.storageName);
  }

  private read<T>() {
    return JSON.parse(sessionStorage.getItem(this.storageName) || "[]") as T[];
  }

  private save<T>(data: T) {
    sessionStorage.setItem(this.storageName, JSON.stringify(data));
  }
}
