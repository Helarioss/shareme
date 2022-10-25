import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { feedQuery, searchQuery } from "../utils/data";
import { client } from "../client";

import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const query = categoryId ? searchQuery(categoryId) : feedQuery;

    client
      .fetch(query)
      .then((data) => setPins(data))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available</h2>;

  return <div>{pins && <MasonryLayout pins={pins} />}</div>;
};

export default Feed;
