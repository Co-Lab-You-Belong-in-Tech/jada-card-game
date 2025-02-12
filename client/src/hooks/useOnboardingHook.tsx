import { useEffect, useRef, useState } from "react";

import deepdiiveApi from "api/deepdiiveApi";
import { useToggleModalStore } from "store/modals";

export const useOnboardingHook = () => {
  // state values
  const [gameId, setGameId] = useState<any>("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const text = useRef<any>(null);

  // hooks
  const { modalIsOpen } = useToggleModalStore();

  // storage
  let username: any;

  if (typeof window !== "undefined") {
    username = localStorage.getItem("deepdiive_host");
  }

  useEffect(() => {
    const res = async () => {
      if (gameId) {
        const { data }: any = await deepdiiveApi.post(`/links/join/${gameId}`, {
          username: username,
        });
        return data;
      }
    };
    res();
  }, [username, gameId]);

  useEffect(() => {
    const getUrl = async () => {
      const { data }: any = await deepdiiveApi.get(`/links`);
      setGameId(data.gameId);
      console.log(data);
    };
      getUrl();
  }, []);

  return {
    // state values
    text,
    gameId,
    modalIsOpen,
    currentSlide,

    // functions
    setCurrentSlide,
  };
};
