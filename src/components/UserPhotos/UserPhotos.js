import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserPhotos.css"

function UserPhotos() {
  const { userId } = useParams()

  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw
    axios(`https://api.unsplash.com/users/${userId}/photos/?client_id=wyxA1zrV-sbBxJSPZw79l8fBB18S6wk7HCmqxkEGAkw`)
    .then(result => {
      setPhotos(result.data)
    })
    .catch((error) => {
      setError(error);
    })
    .finally(() => {
      setLoading(false);
    })
  }, [userId]);

  return (
    <>
      {error? <p>An Error Occured!</p> : null}
      {loading? <p>Loading...</p> :
      <div>
        <h1 className="UserPhotos-heading">
          <Link to={"/"}>&#8592;</Link>
          Photos of {userId}
        </h1>
        <ul className="photo-list">
          {photos.map((photo) => {
            return <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.description}/>
              <span></span>
            </li>
          })}
        </ul>
      </div>}
    </>
  )
}

export default UserPhotos;