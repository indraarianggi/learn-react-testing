import React, { useEffect, useState } from "react";
import { IPhoto } from "../../interface";
import css from "../../../styles/PhotoList.module.css";
import axios from "axios";

export interface IPhotoDetailProps {
  photo: IPhoto;
}

const PhotoDetail = ({ photo }: IPhotoDetailProps) => {
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    setFavourite(false);
  }, [photo]);

  const clickHandler = () => {
    void axios
      .post<IPhoto>("/api/favourite", { ...photo, favourite })
      .then((response) => {
        setFavourite(response.data.favourite);
      });
  };

  return (
    <div className={css.listItem}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.thumbnailUrl}
        alt={photo.title}
        aria-label={photo.title}
        className={css.photo}
      />
      <div>
        <h2>{photo.title}</h2>
        <h3>PhotoId: {photo.id}</h3>

        <button onClick={clickHandler}>
          {favourite ? "Remove from Favourites" : "Add to Favourites"}
        </button>
      </div>
    </div>
  );
};

export default PhotoDetail;
