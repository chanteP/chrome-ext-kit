// storage =============
export function getLocalStorage<T>(name: string, defaultValue?: T): Promise<T> {
    return new Promise((res) => {
        chrome.storage.local.get(name, (rs) => res(rs?.[name] ?? defaultValue));
    });
}

export async function setLocalStorage<T>(name: string, value: T) {
    await chrome.storage.local.set({ [name]: value });
}

interface StorageHandler<T> {
    onExport: () => Promise<T>;
    onImport: (data: T) => Promise<unknown>;
}

const storageHandlerStore: Map<string, StorageHandler<any>> = new Map();

export function registerStorage<T>(key: string, handler: StorageHandler<T>) {
    storageHandlerStore.set(key, handler);
    console.log(`[storage] register module: ${key}`);
}

export async function getStorageExportData() {
    const data: Record<string, string> = {};
    for (let [key, handler] of storageHandlerStore) {
        if (handler) {
            data[key] = await handler.onExport();
        }
    }
    return JSON.stringify(data, null, 4);
}

export async function setStorageImportData(data: string) {
    const dataObject: Record<string, unknown> = JSON.parse(data);

    for (let [key, handler] of storageHandlerStore) {
        const importData = dataObject[key];
        if (importData) {
            await handler?.onImport(importData);
        }
    }
}
