const Book = (props) => {
  const {
    bookTitle,
    bookAuthor,
    thumbnail,
    currentShelf,
    onUpdateShelf,
    bookData,
  } = props;

  const authors = (bookAuthor || []).map((a) => (a === undefined ? "" : a));

  const bookAuthorString = authors.join(", ");

  const updateShelfHandler = (bookData, shelf) => {
    onUpdateShelf(bookData, shelf);
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select
              value={currentShelf}
              onChange={(e) => updateShelfHandler(bookData, e.target.value)}
            >
              <option value="moveTo" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{bookTitle}</div>
        <div className="book-authors">{bookAuthorString}</div>
      </div>
    </li>
  );
};

export default Book;
