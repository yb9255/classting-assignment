type Props = {
  arrayId: string;
  data: object;
};

function saveDataToLocalStorageArray({ arrayId, data }: Props) {
  const storageItem = localStorage.getItem(arrayId);
  const parsedItem = !!storageItem && JSON.parse(storageItem);

  const storageArray = Array.isArray(parsedItem) ? parsedItem : [];
  storageArray.push(data);

  localStorage.setItem(arrayId, JSON.stringify(storageArray));
}

export default saveDataToLocalStorageArray;
