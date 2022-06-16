// CLASS
export default class SessionStorageAPI {
    constructor(storageName) {
        this.storageName = storageName;
    }
    get() {
        const items = this.read();
        return items;
    }
    // .post(id, { data })
    post(id, data) {
        let items = this.read();
        let item = { id, data };
        items.push(item);
        this.save(items);
        return item;
    }
    // .update( id, {data: { newData }} )
    update(itemID, newData) {
        let items = this.read();
        let existing = items.find((item) => item.id === itemID);
        if (!existing)
            throw new Error('Item not found');
        else
            existing.data = newData.data;
        this.save(items);
    }
    // .delete(id)
    delete(itemID) {
        let items = this.read();
        items = items.filter((item) => {
            if (item.id !== itemID)
                return item;
        });
        this.save(items);
    }
    clearStorage() {
        localStorage.removeItem(this.storageName);
    }
    read() {
        return JSON.parse(sessionStorage.getItem(this.storageName) || '[]');
    }
    save(data) {
        sessionStorage.setItem(this.storageName, JSON.stringify(data));
    }
}
