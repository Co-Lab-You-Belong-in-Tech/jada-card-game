import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Navbar from "../../components/Navbar_white/Navbar";
// import Card from "../../components/Card/Card";
import PickCard from "../../components/PickCard/PickCard";
import Players from "../../components/Players/Players";
import gameStyles from "./GameStart.module.css";
import deepdiiveApi from "../../api/deepdiiveApi";
import * as gameEvents from "../../helpers/events";
import {userIsGameHost} from "../../helpers/utils";

const customStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    top: "47%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    width: "743px",
    height: "325px",
    border: "1px solid #dedede",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
};

const GameStart = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [host, setHost] = useState("");
  const [isGameHost, setIsGameHost] = useState(false);
  const [gameContinue, setGameContinue] = useState(false);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    gameEvents.connect(gameId, () => {
      setGameContinue(true);
    });
  }, [gameId])

  // useEffect(() => {
  //   const res = async () => {
  //     const { data } = await deepdiiveApi.post(
  //       `/links/join/${gameId}`
  //     );
  //     return data;
  //   };
  //   res();
  // }, [gameId, host]);

  useEffect(() => {
    const res = async () => {
      const { data } = await deepdiiveApi.get(
        `/links/users/${gameId}`
      );
      console.log(data.player);
      console.log(gameId);
      setHost(data.player);

      const isHost = userIsGameHost(data.player);
      setIsGameHost(isHost);
      if(!isHost){
        gameEvents.onGuestGameStart(() => {
          navigate(`/v1/game/${gameId}`);
        });
      }
      return data;
    };
    res();
  }, [gameId, navigate]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Exit Modal"
      >
        <p className={gameStyles.modalText}>Are you sure you want to exit?</p>
        <div className={gameStyles.modalButtons}>
          <button onClick={closeModal}>no</button>
          <Link to="/v1/feedback">
            <button className={gameStyles.yes}>yes</button>
          </Link>
        </div>
      </Modal>
      <div className={gameStyles.gameDiv}>
        <div className={gameStyles.navDiv}>
          <Navbar openModal={openModal} />
        </div>
        {/* { isGameHost ? ( */}
          <div className={gameStyles.cardDiv}>
            <PickCard gameContinue={gameContinue} isGameHost={isGameHost}/>
          </div>
        {/* // ) : null} */}
        <div className={gameStyles.playerDiv}>
          <Players host={host} />
        </div>
      </div>
    </div>
  );
};

export default GameStart;
