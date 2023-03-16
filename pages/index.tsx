import { NextPage } from "next";
import { useUser } from "@supabase/auth-helpers-react";

import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useAuthStore } from "../stores/useAuthStore";

// export const getServerSideProps = async (ctx) => {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx);
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };

//   const { data: userData, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("id", session.user.id)
//     .single();

//   if (userData) {
//     useAuthStore.setState({
//       userStore: userData,
//     });
//   }

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//       userData: userData,
//     },
//   };
// };

const Home: NextPage = () => {
  return (
    <div>
      <h1>Main</h1>
    </div>
  );
};

export default Home;
