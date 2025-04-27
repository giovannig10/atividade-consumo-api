"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./personagens.module.css"; 

export default function FilmList() {
  const url = "https://hp-api.onrender.com/api/characters";

  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchFilms = async () => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setFilms(response.data);
            setLoading(false);
        } catch (error) {
            console.log ("Erro ao buscar os filmes:");
            setError("Não foi possível carregar os filmes.");
            setLoading(false)
        }
    }

    fetchFilms();

  }, []);

  if (loading) {
    return (
        <div className="styles.loading">
            Carregando filmes...
        </div>
    )
}

if (error) {
    return (
        <div className={styles.error}>
            {error}
        </div>
    )
}

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personagens</h1>
      <div className={styles.filmGrid}>
        {films.map((film) => (
          <div key={film.id} className={styles.filmCard}>
            <div className={styles.imageContainer}>
              <img 
              src={film.image} 
              alt={film.title || "Imagem não disponivel"} 
              className={styles.image} />
            </div>
            <div className={styles.content}>
              <h2 className={styles.filmTitle}>{film.name}</h2>
              <p className={styles.director}>Casa: {film.house}</p>
              <p className={styles.year}>Patrono: {film.patronus}</p>
              <div className={styles.rating}>
                <span className={styles.score}>{film.rt_score}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}