"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Video from "next-video";

interface VideoPlayerProps {
  slug: string;
}

const VideoPlayer = ({ slug }: VideoPlayerProps) => {
  const [videoData, setVideoData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/videos/${slug}.mp4`);
        setVideoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке данных видео:", error);
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [slug]);

  if (loading) return <p>Загрузка видео...</p>;
  if (!videoData) return <p>Видео не найдено.</p>;

  return (
    <div style={{ position: "relative", maxHeight: "534px", marginTop: "20px" }}>
      <Video
        src={videoData.sources[0]?.src}
        style={{
          width: "100%",
          borderRadius: "8px",
        }}
        poster={videoData.poster}
      />
    </div>
  );
};

export default VideoPlayer;