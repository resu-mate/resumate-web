import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./TopBar.css";

function TopBar() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };
  useEffect(() => {
    if (profile) {
      console.log(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div className="top-bar">
      <div className="top-left">
        <img className="website-logo" src={logo} />
      </div>
      <div className="top-right">
        {profile && profile.id ? (
          <div className="userInfo">
            <div className="userInfoPic">
              <img src={profile.picture} alt="user image" className="pic" />
            </div>
            <div className="userInfoText">
              <p>Name: {profile.name}</p>
              <p>Email Address: {profile.email}</p>
              <button onClick={logOut}>Log out</button>
            </div>
          </div>
        ) : (
          <button onClick={() => login()} className="signin">
            Sign in with Google 🚀{" "}
          </button>
        )}
      </div>
    </div>
  );
}

export default TopBar;
