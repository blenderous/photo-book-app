import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchPhotos, selectPhotos, selectLoadingStatus } from './homeSlice';
import "./Home.css";

function Home() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPhotos());
  }, []);

  const photosList = useAppSelector(selectPhotos);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  return (
    <>
      <h1>Photo book</h1>
      {loadingStatus === 'error' ? <p>An Error Occured!</p> : null}
      {loadingStatus === 'loading' ? <p>Loading...</p> :
      <div>
        <ul className="photo-list">
          {photosList.map((photo) => {
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