export function shuffleArray(array: string[]) {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}

export function decodeHtmlString(markup: string) {
  const doc = new DOMParser().parseFromString(markup, 'text/html');
  return doc.documentElement.textContent!;
}

export function changeMillisecondsToMinutesAndSeconds(milliseconds: number) {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);

  return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
}
