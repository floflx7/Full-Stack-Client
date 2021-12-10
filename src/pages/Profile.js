import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Image } from "cloudinary-react";

function Profile() {
  let { id } = useParams();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const ref = React.createRef();
  const [AuthState, setAuthState] = useState({
    username: authState.username,
    id: authState.id,
    status: true,
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/auth/delete/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        navigate("/registration");
        console.log(authState.status);
      });
  };

  const logout = () => {
    React.createRef();

    localStorage.removeItem("accessToken");
    setAuthState(false);
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {authState.username === username && (
          <button
            onClick={() => {
              navigate("/changepassword");
            }}
          >
            {" "}
            Changer mon mot de passe
          </button>
        )}
        <button
          onClick={() => {
            let confirm = window.confirm(
              "Voulez vous supprimer votre compte ?"
            );
            if (confirm) {
              deleteUser(authState.id);
              deleteUser(logout);
              navigate("/registration");
              console.log(authState.id);
            } else {
              console.log("WTF");
            }
          }}
        >
          Supprimer mon compte
        </button>
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  navigate(`/post/${value.id}`);
                }}
              >
                <Image
                  className="PostImage"
                  cloudName="dfhqbiyir"
                  publicId={value.image}
                />
                {value.postText}
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
