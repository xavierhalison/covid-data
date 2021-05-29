import React, { useState } from "react";
import "./style.css";

const Search = ({ data, text, id, placeholder, onSelect }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = (query) => {
    setValue(query);

    if (!query) {
      setResults([]);
    } else {
      const filteredData = data.filter((d) =>
        d[text].toLowerCase().includes(query.toLowerCase())
      );
      if (filteredData.length === 0) {
        const result = {};
        result[text] = "Nenhum resultado encontrado";
        result[id] = "ISO2";
        setResults([result]);
      } else {
        setResults(filteredData);
      }
    }
  };

  const handleClick = ({ value, id }) => {
    setValue(value);

    if (onSelect) onSelect({ value, id });
    setResults([]);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={value}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        className="field"
      />
      {results && results.length > 0 && (
        <div className="results">
          {results.map((d) => (
            <div
              className="results__item"
              key={d[id]}
              onClick={() => handleClick({ value: d[text], id: d[id] })}
            >
              {d[text]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
