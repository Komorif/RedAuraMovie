"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";

import Video from 'next-video';
import getStarted from '/videos/get-started.mp4';
import styles from "./video.module.css";

import SearchBar from "../../../../components/search_bar";

const AnimePage = () => {
  const router = useRouter();
  const { slug } = useParams();

  // State to hold the video data
  const [videoData, setVideoData] = useState<any>(null);

  useEffect(() => {
    // Function to fetch video details from the API
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`http://localhost/api/videos/${slug}/`);
        setVideoData(response.data);  // Assuming the API response structure is correct
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    if (slug) {
      fetchVideoData();
    }
  }, [slug]);

  return (
    <div>
      <SearchBar />

        <Video src={getStarted} style={{ maxHeight: "534px", top: "100px"}} />

        <div>
            {videoData && (
              <div>
                
                <div className={styles.select_menu}>
                    <div className={styles.button_menu}>
                        <div className={styles.button_menu_text}>{videoData.season} сезон</div>
                    </div>
                    <div className={styles.button_menu}>
                        <div className={styles.button_menu_text}>{videoData.episode} эпизод</div>
                    </div>
                </div>

                <div className={styles.menu_video}>
                    <div className={styles.main_items_video}>
                        <img
                        src={`http://localhost/static/${videoData.main_genre}/${videoData.title_en.toLowerCase().replace(/ /g, "_")}.jpg`}
                        alt={videoData.title_en}
                        className={styles.video_image}/>
                        <div className={styles.title_video}>{videoData.title_ru}</div>
                    </div>

                    <div className={styles.items_video}>
                        <div>
                            <div className={styles.video_main_text}>Описание</div>
                            <div>{videoData.description}</div>
                        </div>
                        
                        <div className={styles.select_menu}>
                            <div>
                                <div className={styles.video_main_text}>ДАТА ВЫХОДА</div>
                                <div>{videoData.date}</div>
                            </div>

                            <div>
                                <div className={styles.video_main_text}>ВРЕМЯ</div>
                                <div>{videoData.time}</div>
                            </div>
                            <div>
                                <div className={styles.video_main_text}>ВОЗРАСТ</div>
                                <div>{videoData.age}</div>
                            </div>


                        </div>

                        <div className={styles.select_menu}>
                            <div>
                                <div className={styles.video_main_text}>ОСНОВНОЙ ЖАНР</div>
                                <div>{videoData.main_genre}</div>
                            </div>
                            <div>
                                <div className={styles.video_main_text}>ЖАНРЫ</div>
                                <div>{videoData.main_genre[0]}</div>
                            </div>
                        </div>
                        
                    </div>
                </div>
              </div>
            )}
        </div>

    </div>
    
  );
};

export default AnimePage;