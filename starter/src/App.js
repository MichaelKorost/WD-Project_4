import "./App.css";
import { useEffect, useState } from "react";
import SearchBooks from "./components/SearchBooks/SearchBooks";
import NavBar from "./components/NavBar/NavBar";
import BookShelf from "./components/BookShelf/BookShelf";
import { getAll, search } from "./BooksAPI";
import SearchButton from "./components/SearchButton/SearchButton";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedBooks, setSearchedBooks] = useState([]);

  const closeSearchBooksPage = () => {
    setShowSearchpage(false);
  };

  const openSearchBookPage = () => {
    setShowSearchpage(true);
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

  {
    console.log(searchedBooks);
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBooks
          onClose={closeSearchBooksPage}
          searchedBooks={searchedBooks}
          onSearchQuery={searchQuery}
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
              />
              <BookShelf
                title={"Want To Read"}
                books={books}
                shelf={"wantToRead"}
              />
              <BookShelf title={"Read"} books={books} shelf={"read"} />
            </div>
          </div>
          <SearchButton onOpen={openSearchBookPage} />
        </div>
      )}
    </div>
  );
}

export default App;
