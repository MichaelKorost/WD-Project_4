import "./App.css";
import { useEffect, useState } from "react";
import SearchBooks from "./components/SearchBooks/SearchBooks";
import NavBar from "./components/NavBar/NavBar";
import BookShelf from "./components/BookShelf/BookShelf";
import { getAll, search, update } from "./BooksAPI";
import SearchButton from "./components/SearchButton/SearchButton";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const toggleSearchBooksPage = () => {
    setShowSearchpage(!showSearchPage);
  };

  const searchQuery = (searchTerm) => {
    setQuery(searchTerm);
  };

  useEffect(() => {
    getAll().then((data) => {
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    search(query).then((result) => {
      setSearchedBooks(
        Array.isArray(result) &&
          result.map((searchedBook) => {
            const isExist = books.find((book) => book.id === searchedBook.id);
            searchedBook.shelf = isExist ? isExist.shelf : "none";
            return searchedBook;
          })
      );
    });
  }, [query]);

  const updateShelf = (book, shelf) => {
    update(book, shelf).then(() => {
      const updatedBooksArray = [...books];

      const duplicateBookIndex = updatedBooksArray.findIndex(
        (newBook) => newBook.id === book.id
      );
      duplicateBookIndex !== -1 &&
        updatedBooksArray.splice(duplicateBookIndex, 1);

      //adding all book attr + new shelf to a new obj then, pushing into the array.
      shelf !== "none" && updatedBooksArray.push({ ...book, shelf: shelf });

      setBooks(updatedBooksArray);

      setSearchedBooks(
        Array.isArray(searchedBooks) &&
          searchedBooks.map((searchedBook) => {
            searchedBook.id === book.id && (searchedBook.shelf = shelf);
            return searchedBook;
          })
      );
    });
  };

  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBooks
          onClose={toggleSearchBooksPage}
          searchedBooks={searchedBooks}
          onSearchQuery={searchQuery}
          updateShelf={updateShelf}
        />
      ) : (
        <div className="list-books">
          <NavBar />
          <div className="list-books-content">
            <div>
              <BookShelf
                title={"Currently Reading"}
                books={books}
                shelf={"currentlyReading"}
                updateShelf={updateShelf}
              />
              <BookShelf
                title={"Want To Read"}
                books={books}
                shelf={"wantToRead"}
                updateShelf={updateShelf}
              />
              <BookShelf
                title={"Read"}
                books={books}
                shelf={"read"}
                updateShelf={updateShelf}
              />
            </div>
          </div>
          <SearchButton onOpen={toggleSearchBooksPage} />
        </div>
      )}
    </div>
  );
}

export default App;
