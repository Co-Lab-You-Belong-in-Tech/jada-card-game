"use client";
// core
import React from "react";
import Link from "next/link";
import Image from "next/image";

// libraries
import { motion } from "framer-motion";

// components
import SocialMedia from "../../components/SocialMedia/SocialMedia";

// constants
import { RoutePath } from "routes";

// assets
import { Logo } from "assets/svgs";
import logoIcon from "../../assets/logo_circle.png";

// styles
import feedbackStyles from "./Feedback.module.css";

const Feedback:React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={feedbackStyles.row}>
        <div className={feedbackStyles.column}>
          <div className={feedbackStyles.navDiv}>
            <Image className={feedbackStyles.icon} src={logoIcon} alt="logo" />
            <Link href={RoutePath.Game}><Logo color="#94B1EB" /></Link>
          </div>
        </div>
        <div className={feedbackStyles.column}>
          <h1>
            Hope you had fun, <br /> see you again soon!
          </h1>
          <button
            className={feedbackStyles.rbutton}
            onClick={() => {
              window.open(
                "https://survey.typeform.com/to/aABypw3e?typeform-source=trello.com",
                "_blank"
              );
            }}
          >
            LEAVE A REVIEW
          </button>
          <hr />
          <h2>
            Tell your workmates <br /> about DeepDiive!
          </h2>
          <div className={feedbackStyles.social}>
            <SocialMedia />
          </div>
        </div>
        <div className={feedbackStyles.column}>
        </div>
      </div>
    </motion.div>
  );
};

export default Feedback;
