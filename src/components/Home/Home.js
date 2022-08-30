import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw
    axios("https://api.unsplash.com/photos/?client_id=wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw")
    .then(result => {
      console.log(result.data);
      setPhotos(result.data)
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, []);

  return (
    <>
      {error? <p>An Error Occured!</p> : null}
      {loading? <p>Loading...</p> :
      <div>
        <h1>Photo book</h1>
        <ul className="photo-list">
          {photos.map((photo) => {
            return <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.description}/>
              <span><Link to={"/user-photos/" + photo.user.username}>More from {photo.user.username}</Link></span>
            </li>
          })}
        </ul>
      </div>}
    </>
  )
}

export default Home;