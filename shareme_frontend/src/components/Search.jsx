import React, { useEffect, useState } from "react";

import MasonryLayout from "../components/MasonryLayout";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const query = searchTerm
      ? searchQuery(searchTerm.toLowerCase())
      : feedQuery;

    client
      .fetch(query)
      .then((data) => setPins(data))
      .finally(setLoading(false));
  }, [searchTerm]);

  return (
    <div>
      {loading && <Spinner message="Searching for pins" />}
      {pins?.length !== 0 && <MasonryLayout pins={pins} />}
      {pins?.length === 0 && searchTerm !== "" && !loading && (
        <div className="mt-10 text-center text-xl">No Pins Found</div>
      )}
    </div>
  );
};

export default Search;
