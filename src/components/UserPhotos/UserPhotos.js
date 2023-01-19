import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { fetchUserPhotos, selectUserPhotos, selectLoadingStatus } from './userSlice';

// import axios from "axios";
import "./UserPhotos.css"

function UserPhotos() {
  const { userId } = useParams()

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserPhotos(userId))
  }, []);

  const userPhotosList = useAppSelector(selectUserPhotos);
  const loadingStatus = useAppSelector(selectLoadingStatus);

  return (
    <>
      {loadingStatus === 'loading' ? <p>Loading...</p> :
      <div>
        <h1 className="UserPhotos-heading">
          <Link to={"/"}>&#8592;</Link>
          Photos of {userId}
        </h1>
        <ul className="photo-list">
          {userPhotosList.map((photo) => {
            return <li key={photo.id}>
              <img src={photo.urls.regular} alt={photo.description}/>
              <span></span>
            </li>
          })}
        </ul>
      </div>}
      {loadingStatus === 'error' ? <p>An Error Occured!</p> : null}
    </>
  )
}

export default UserPhotos;