import Book from "../Book/Book";

const BookShelf = (props) => {
  const { title, books, shelf, updateShelf } = props;

  const filteredBooks = books.filter((book) => book.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredBooks.map((book) => (
            <Book
              bookTitle={book.title}
              bookAuthor={book.authors}
              thumbnail={
                book.imageLinks?.smallThumbnail ||
                "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
              }
              key={book.id}
              currentShelf={shelf}
              onUpdateShelf={updateShelf}
              bookData={book}
            />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
