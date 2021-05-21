import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateSession, setUserSession } from "../../redux/actions";

export const Auth = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { dataSession } = state.auth;
  const { route, push } = useRouter();

  // === VALIDATE USER'S SESSION ===
  const handleValidateSession = async () => {
    if (!dataSession) {
      await validateSession()
        .then((dataUser) => {
          dispatch(setUserSession(dataUser));
          if (route === "/login") push("/layout");
        })
        .catch(() => {
          push("/login");
        });
    } else if (route === "/login") {
      push("/layout");
    }
  };

  useEffect(() => {
    console.log(dataSession, "dataSession");
    handleValidateSession();
  }, [dataSession]);
  return <></>;
};
