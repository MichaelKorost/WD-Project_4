const Book = (props) => {
  const { bookTitle, bookAuthor, thumbnail, currentShelf } = props;

  const authors = (bookAuthor || []).map((a) =>
    a === undefined ? "unknown author" : a
  );

  const bookAuthorString = authors.join(", ");

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
            <select value={currentShelf}>
              <option value="-none-" disabled>
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
