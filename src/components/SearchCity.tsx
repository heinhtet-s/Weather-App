import { FetchCity } from "@/service/ApiService";
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const SearchCity = ({ OnSearchChange }: any) => {
  const [search, setSearch] = useState("");
  const handleOnChange = (searchData: any) => {
    setSearch(searchData);
    OnSearchChange(searchData);
  };
  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={800}
      value={search}
      onChange={handleOnChange}
      loadOptions={FetchCity}
    />
  );
};
export default SearchCity;
