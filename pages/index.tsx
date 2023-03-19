import { NextPage } from "next";
import Hero from "../components/Hero";

import { supabase } from "../utils/supabaseClient";

export async function getServerSideProps() {
  let { data } = await supabase.from("stores").select();

  return {
    props: {
      stores: data,
    },
  };
}

const Home: NextPage = ({ stores }) => {
  // console.log(stores);
  return <Hero />;
};

export default Home;
