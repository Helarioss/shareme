import React from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import video from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { gapi } from "gapi-script";

import { client } from "../client";

const { REACT_APP_GOOGLE_API_TOKEN } = process.env;

gapi.load("client:auth2", () => {
  gapi.client.init({
    clientId: REACT_APP_GOOGLE_API_TOKEN,
    plugin_name: "chat",
  });
});

const Login = () => {
  const navigate = useNavigate();

  const responseGoogle = async (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));

    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };

    await client.createIfNotExists(doc);
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={video}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        ></video>
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={`${REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-point outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-3 shrink-0" /> Sign in with Google
                </button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
