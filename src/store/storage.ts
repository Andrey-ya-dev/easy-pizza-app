export function loadStorageData(key: string) {
  try {
    const storageData = localStorage.getItem(key);

    if (storageData) {
      return JSON.parse(storageData);
    }

    return undefined;
  } catch (err) {
    console.error(`Storage ошибка ${err}`);
    return undefined;
  }
}

export function saveInStorageData<T>(key: string, data: T) {
  const correctData = JSON.stringify(data);
  localStorage.setItem(key, correctData);
}
