"use client";

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './video.module.css';

import Layout from '../components/video.layout';

import SearchBar from "../components/search_bar";


interface Video {
  image: string;
  title_en: string;
  title_ru: string;
  season: number;
  episode: number; 
  age: number;
  time: number;
  date: number;
  description: string;
  main_genre: string;
  genre: string[];
}

function groupByGenre(videos: Video[]): Record<string, Video[]> {
  return videos.reduce((acc: Record<string, Video[]>, video: Video) => {
    if (!acc[video.main_genre]) {
      acc[video.main_genre] = [];
    }
    acc[video.main_genre].push(video);
    return acc;
  }, {});
}

const genreDetails = {
  anime: {
    title: 'ЛЮБИМЫЕ АНИМЕ',
    description: 'Вам понравятся эти аниме! Приятного просмотра!',
  },
  series: {
    title: 'СЕРИАЛЫ НА ВЕЧЕР',
    description: 'Вы найдете среди них что-то по душе!',
  },
  films: {
    title: 'ФИЛЬМЫ',
    description: 'Каждый фильм может оставить разнообразные эмоции и впечатления у зрителей.',
  },
};

const getGenreInfo = (genre: string) => {
  const normalizedGenre = genre.toLowerCase();
  return genreDetails[normalizedGenre as keyof typeof genreDetails] || { title: genre, description: '' };
};

const AnimeVideoComponent: React.FC = () => {
  const [animeVideos, setAnimeVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchAnimeVideos = useCallback(async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      router.push('/authorization');
      return;
    }

    try {
      const response = await axios.get<Video[]>('http://localhost:80', {
        headers: { 'Authorization': `Bearer ${accessToken}` },
      });

      const updatedVideos = response.data.map((video) => ({
        ...video,
        image: `http://localhost/static/${video.main_genre.toLowerCase()}/${video.title_en.toLowerCase().replace(/ /g, "_")}.jpg`,
      }));
      
      setAnimeVideos((prevVideos) => [...updatedVideos, ...prevVideos]);
      setLoading(false);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          router.push('/authorization');
        } else {
          setError('Ошибка при получении данных');
        }
      } else {
        setError('Произошла ошибка. Попробуйте еще раз.');
      }
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAnimeVideos();
  }, [fetchAnimeVideos]);

  const handleViewButton = (main_genre: string, title: string) => {
    const formattedGenre = main_genre.replace(/ /g, '_');
    const formattedTitle = title.replace(/ /g, '_');
    router.push(`/videos/${encodeURIComponent(formattedGenre)}/${encodeURIComponent(formattedTitle)}`);
  };

  if (loading) return <p>Загрузка страницы</p>;
  if (error) return <p>Ошибка: {error}</p>;

  const groupedVideos = groupByGenre(animeVideos);

  return (
    <Layout>
      <SearchBar />
      <div className={styles.video_menu}>
        <section>
          <div className={styles.genreContainer}>
            {Object.entries(groupedVideos).map(([main_genre, videos]) => {
              const genreInfo = getGenreInfo(main_genre);

              return (
                <div key={main_genre} className={styles.genreBlock}>
                  <div className={styles.title_genre}>
                    <h2 className={styles.genreTitle}>{genreInfo.title}</h2>
                    <p className={styles.genreDescription}>{genreInfo.description}</p>
                  </div>

                  <div className={styles.container}>
                      <ul className={styles.genreVideos}>

                        {videos.slice(0, 6).map((video, index) => (
                          <li key={index}>
                            <div className={styles.card}>

                              <div className={styles.imgBx}>

                                {video.image && (
                                  <img
                                    className={styles.animeImage}
                                    src={video.image}
                                    alt={video.title_ru}
                                    />
                                  )}


                                <div className={styles.contentBx}>

                                    <div className={styles.color} onClick={() => handleViewButton(video.main_genre, video.title_en)} style={{ cursor: 'pointer' }}>
                                      <h3>{video.episode} эпизод</h3>
                                    </div>

                                    <div className={styles.size}>
                                      <span>{video.date}</span>
                                    </div>

                                    <div className={styles.size}>
                                      <span>{video.genre[0]}</span>
                                      <span>{video.genre[1]}</span>
                                      <span>{video.genre[2]}</span>
                                    </div>

                                    <div onClick={() => handleViewButton(video.main_genre, video.title_en)} style={{ cursor: 'pointer' }}>
                                      <a href="#">смотреть</a>
                                    </div>

                                </div>

                                <div>
                                  <h2>{video.title_ru}</h2>
                                </div>

                              </div>
                            </div>

                            <div className={styles.contentBx}>
                              <h2>{video.title_ru}</h2>
                            </div>
                          </li>
                        ))}
                      </ul>
                  </div>
                </div>

              );
            })}
          </div>
        </section>
      </div>
    </Layout>

  );
};

export default AnimeVideoComponent;