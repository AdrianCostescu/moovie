import React from "react";

const Search = () => {
  return (
    <SearchBox>
      <SearchBar
        placeholder="Search for a movie..."
        type="text"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <AiOutlineSearch
        style={{ fontSize: "25px", paddingRight: "24px" }}
      ></AiOutlineSearch>
    </SearchBox>
  );
};

const SearchBox = styled.div`
  width: 368px;
  height: 56px;
  display: flex;
  align-items: center;
  background-color: ${color.shark};
`;

const SearchBar = styled.input`
  appearance: none;
  background: none;
  border: none;
  outline: none;
  width: 320px;
  height: 56px;
  background-color: ${color.shark};
  border-radius: 5px;
  color: white;
  padding-left: 24px;

  ::placeholder {
    color: white;
    line-height: 22px;
    font-weight: bold;
  }
`;

export default Search;
