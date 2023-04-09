import React from "react";

export async function getServerSideProps(context) {
  const query = context.query.q;
  const category = context.query.category;

  console.log(query);
  console.log(category);
  return {
    props: {
      query,
    },
  };
}

const SearchPage = () => {
  return <div>SearchPage</div>;
};

export default SearchPage;
