import React, { useState } from "react";
import SearchResult from "./SearchResult";

export default function SearchField() {
  const [code, setCode] = useState("");
  const [currentCode, setCurrentCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);

    console.log(code);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (code.length > 5) {
      setCurrentCode(code);
      setCode("");
    } else {
      alert("Code must be longer then 5 characters...");
    }
  };

  return (
    <div className="container">
      <div className="shadow-sm bg-body rounded text-center mt-3">
        <h3 className="p-2">Search for barcode:</h3>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <input
                autoFocus
                type="text"
                className="form-control searchinput"
                onChange={handleChange}
                value={code}
                onKeyPress={handleEnter}
              />
              <button
                className="btn btn-large btn-success"
                onClick={handleSubmit}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <SearchResult code={currentCode} />
    </div>
  );
}
