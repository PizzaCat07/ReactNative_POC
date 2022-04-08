class HighlightItem {
  constructor(id, articleId, text, start, end) {
    (this.id = id),
      (this.articleId = articleId),
      (this.text = text),
      (this.start = start),
      (this.end = end);
  }
}

export default HighlightItem;
