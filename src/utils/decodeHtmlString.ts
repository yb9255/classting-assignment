function decodeHtmlString(markup: string) {
  const doc = new DOMParser().parseFromString(markup, 'text/html');
  return doc.documentElement.textContent!;
}

export default decodeHtmlString;
