import React, { useState } from "react";

const FirstAcc = ({ session }) => {
  const [username, setUsername] = useState("");
  const [avatar_url, setAvatar_url] = useState("");
  return (
    <div aria-live="polite" className="container mx-auto">
      {loading ? (
        "Saving ..."
      ) : (
        <form onSubmit={updateProfile} className="form-widget">
          <input type="file" />
          {/* <div>Email: {session.user.email}</div> */}
          <div class="container mx-auto w-72 py-4">
            <input
              type="text"
              name="text"
              id="username"
              class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="Your Name"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button class="w-44 h-11 rounded-full text-gray-50 bg-indigo-600 hover:bg-indigo-700">
              Update Profile
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FirstAcc;
