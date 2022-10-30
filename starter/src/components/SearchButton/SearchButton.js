const SearchButton = (props) => {
  const { onOpen } = props;

  const openSearchPageHandler = () => {
    onOpen();
  };
  return (
    <div className="open-search">
      <a onClick={openSearchPageHandler}>Add a book</a>
    </div>
  );
};

export default SearchButton;
