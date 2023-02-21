import axios from "axios";
import React from "react";

export default function Dashboard({ logOut }: { logOut: () => void }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    axios
      .get("http://localhost:8000/api/auth/logout", {
        withCredentials: true,
      })
      .then(() => logOut())
      .catch(() => {});
  };

  return (
    <div
      className="
      flex flex-col gap-4 place-items-center sm:gap-6
    "
    >
      <h1 className="text-3xl text-zinc-100 font-bold text-center sm:text-4xl">
        Welcome back, {sessionStorage.getItem("username")}
      </h1>
      <button
        onClick={handleClick}
        className="
          w-fit px-4 py-2 rounded-md text-lg text-white text-center font-semibold bg-slate-900/50
          hover:outline outline-2 outline-slate-300 sm:text-2xl sm:px-5 sm:py-3
        "
      >
        Log Out
      </button>
    </div>
  );
}
