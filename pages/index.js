import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { route, push } = useRouter();

  const { dataSession } = state.auth;

  useEffect(() => {
    if (dataSession) {
      push("/layout");
    }
  }, [dataSession]);

  return <main className="home-page"></main>;
};

export default HomePage;
