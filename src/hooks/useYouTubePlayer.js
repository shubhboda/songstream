import { useEffect, useRef, useState, useCallback } from 'react';

export default function useYouTubePlayer() {
  const playerRef = useRef(null);
  const containerIdRef = useRef(`yt-player-${Math.random().toString(36).slice(2)}`);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const ensureApi = useCallback(() => {
    return new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve();
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => resolve();
    });
  }, []);

  const load = useCallback(async (videoId) => {
    if (!videoId) return;
    await ensureApi();
    if (playerRef.current) {
      playerRef.current.loadVideoById(videoId);
      return;
    }
    playerRef.current = new window.YT.Player(containerIdRef.current, {
      videoId,
      playerVars: { origin: window.location.origin, autoplay: 0, controls: 0 },
      events: {
        onReady: (e) => {
          setIsReady(true);
          setDuration(e.target.getDuration());
        },
        onStateChange: (e) => {
          const YTState = window.YT.PlayerState;
          if (e.data === YTState.PLAYING) setIsPlaying(true);
          if (e.data === YTState.PAUSED || e.data === YTState.ENDED) setIsPlaying(false);
          setDuration(e.target.getDuration());
        }
      }
    });
  }, [ensureApi]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && isReady) {
        const t = playerRef.current.getCurrentTime();
        setCurrentTime(t || 0);
        setDuration(playerRef.current.getDuration() || 0);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isReady]);

  const play = useCallback(() => playerRef.current?.playVideo(), []);
  const pause = useCallback(() => playerRef.current?.pauseVideo(), []);
  const seekTo = useCallback((sec) => playerRef.current?.seekTo(sec, true), []);
  const setVolume = useCallback((v) => playerRef.current?.setVolume(Math.round((v ?? 0) * 100)), []);

  return {
    containerId: containerIdRef.current,
    isReady,
    isPlaying,
    duration,
    currentTime,
    load,
    play,
    pause,
    seekTo,
    setVolume
  };
}


