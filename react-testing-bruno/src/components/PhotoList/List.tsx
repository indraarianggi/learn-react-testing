import React, { useEffect, useState } from "react";
import axios from "axios";
import PhotoDetail from "./PhotoDetail";
import { IPhoto } from "../../interface";
import css from "../../../styles/PhotoList.module.css";

export interface IListProps {
  refresh: number;
  name: string;
}

const List = ({ refresh, name }: IListProps) => {
  const [loading, setLoading] = useState(0);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      setLoading((prev) => prev + 1);

      try {
        const response = await axios.get<IPhoto[]>(`/api/photos?name=${name}`);
        setPhotos(response.data);
        setError("");
      } catch (e: any) {
        // eslint-disable-next-line
        setError(e.response.data.message);
      } finally {
        setLoading((prev) => prev - 1);
      }
    }

    // async function load() {
    //   setLoading((prev) => prev + 1);

    //   try {
    //     const response = await fetch(`/api/photos?name=${name}`);
    //     const json = await response.json();

    //     if (!response.ok) {
    //       throw new Error(json.message);
    //     }

    //     setPhotos(json);
    //     setError("");
    //   } catch (e: any) {
    //     setError(e.message);
    //   } finally {
    //     setLoading((prev) => prev - 1);
    //   }
    // }

    void load();
  }, [refresh, name]);

  return (
    <div>
      <div className={css.absolute}>
        {error && <div className={css.error}>{error}</div>}
        {loading && <div className={css.loading}>Loading...</div>}
      </div>

      {photos.map((photo) => (
        <PhotoDetail key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default List;
