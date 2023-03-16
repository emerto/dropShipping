import { supabase } from "../../utils/supabaseClient";

export async function getServerSideProps() {
  let { data } = await supabase.from("products").select();

  return {
    props: {
      products: data,
    },
  };
}

const Test = ({ products }) => {
  return <div>Test</div>;
};

export default Test;
