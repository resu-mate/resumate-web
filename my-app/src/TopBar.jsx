import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./TopBar.css";

function TopBar({ setAuth }) {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login Failed:", error),
    });
    const logOut = () => {
        googleLogout();
        setProfile(null);
        setAuth(false);
    };
    useEffect(() => {
        if (profile) {
            console.log(profile);
        }
    }, [profile]);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    setProfile(res.data);
                    setAuth(true);
                })
                .catch((err) => console.log(err));
        }
    }, [user]);

    return (
        <div className="top-bar">
            <div className="top-left">
                <img className="website-logo" alt="ResuMate" src={logo} />
            </div>
            <div className="top-right">
                {profile && profile.id ? (
                    <div className="userInfo">
                        <div className="userInfoPic">
                            <img src={profile.picture} alt="user image" className="pic" />
                        </div>
                        <div className="userInfoTextBox">
                            <p className="userInfoText">Name: {profile.name}</p>
                            <p className="userInfoText">Email Address: {profile.email}</p>
                            <button onClick={logOut} className="button-light">Log out</button>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => login()} className="button-light">
                        Sign in with Google{" "}
                        {/* <a title="Google Inc., Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Google_%22G%22_Logo.svg"> */}
                        <img
                            className="logo-img"
                            width="12"
                            alt="Google Logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/16px-Google_%22G%22_logo.svg.png"
                        />
                        {/* </a> */}
                    </button>
                )}
            </div>
        </div>
    );
}

export default TopBar;
