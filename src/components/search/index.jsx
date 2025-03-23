import React, { useCallback } from "react";
import { IoMdSearch } from "react-icons/io";

const Search = ({ search, setSearch, handleSearch }) => {

    const memoizedHandleSearch = useCallback(() => {
        handleSearch();
        setSearch("")
    } ,[handleSearch])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            memoizedHandleSearch();
        }
    };

  return (
    <div className="search w-full flex justify-around items-center mb-[30px] mt-[10px]">
      <input
        type="text"
        className="w-[70%] h-[45px] border rounded px-0.5 py-3.5 text-xl outline-none bg-white text-[#555555]"
        placeholder="Enter City Name"
        name="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      />
      <button
        className="rounded-full bg-black text-white text-2xl outline-none cursor-pointer p-3 ml-[-20px]"
        onClick={memoizedHandleSearch}
      >
       <IoMdSearch />
      </button>
    </div>
  );
};

export default Search;
