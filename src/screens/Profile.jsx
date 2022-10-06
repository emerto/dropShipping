import React from "react";
import supabase from "../config/supaBaseClient";

const FirstAcc = () => {
  const updateProfile = async (e) => {
    try {
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username: "kazik",
        website: "kazik.com",
        avatar_url: "https://kazik.com",
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(updates, { returning: "minimal" });

      if (error) {
        throw error;
      }
    } catch (err) {
      alert(err);
    }
  };

  return <button onClick={updateProfile}>Update</button>;
};

export default FirstAcc;
