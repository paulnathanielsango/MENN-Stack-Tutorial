import React from "react";
import { CgSpinner } from "react-icons/cg";
import Layout from "@components/layout";
import Login from "@components/login";
import Dashboard from "@components/dashboard"

export default function Home() {
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isLoading, setLoading] = React.useState(false);

  const logOut = () => {
    setLoading(true);
    setLoggedIn(false);
    sessionStorage.clear();
    setTimeout(() => setLoading(false), 750);
  };

  const refreshAccessToken = () => {
    fetch("http://localhost:8000/api/auth/refresh", {
      method: "GET",
      credentials: "include",
    }).then((res) => {
      if (res.ok) setLoggedIn(true);
    });
  };

  const fetchAccessToken = () => {
    setLoading(true);

    fetch("http://localhost:8000", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
        } else {
          refreshAccessToken();
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 750);
      });
  };

  React.useEffect(() => {
    fetchAccessToken();
  }, []);

  return (
    <>
      <Layout>
        <section
          className="
        min-w-full min-h-screen bg-cover bg-[url('/images/newyork.png')]
        grid place-items-center"
        >
          {isLoading ? (
            <CgSpinner className="animate-spin w-20 h-20 rounded-full text-white m-auto sm:w-24 sm:h-24" />
          ) : isLoggedIn ? (
            <Dashboard logOut={logOut} />
          ) : (
            <div className="grid gap-8">
              <h1 className="text-3xl font-serif text-white text-center sm:text-4xl">
                Company Logo
              </h1>
              <Login setLoggedIn={setLoggedIn} />
            </div>
          )}
        </section>
      </Layout>
    </>
  );
}
