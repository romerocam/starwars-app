import React, { useState } from "react";
import axios from "axios";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [characters, setCharacters] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${searchValue}`
      );
      setCharacters(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("searchValue ===>", searchValue);

  return (
    <div className="bg-gray-800 p-3 flex justify-center">
      <form onSubmit={handleSearch} className="bg-white rounded-lg p-2 flex">
        <input
          className="border p-1 rounded-lg"
          type="text"
          placeholder="Search characters..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-lg p-1 ml-2"
          type="submit"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-center">
        {characters.map((character) => (
          <div
            key={character.name}
            className="bg-white p-3 m-3 rounded-lg max-w-sm"
          >
            <h2 className="text-lg font-medium">{character.name}</h2>
            <p className="text-sm">Birth year: {character.birth_year}</p>
            <p className="text-sm">Gender: {character.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
