import React from "react";
import Image from "next/image";
import { LoaderProps } from "components/types";
import loadingStyles from "./Loader.module.css";
import { DEEPDIIVE_IMAGES } from "constants/gallery";

export const Loader: React.FC<LoaderProps> = ({ hasText }) => {
  return (
    <div className={loadingStyles.loader}>
      <Image
        src={DEEPDIIVE_IMAGES.logoIcon}
        alt=""
        className={loadingStyles.rotate}
        width={192}
        height={192}
        priority
      />
      {hasText && <p>Your Room Is Loading</p>}
    </div>
  );
};