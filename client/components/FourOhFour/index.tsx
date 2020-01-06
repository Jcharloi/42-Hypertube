import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import useFourOhFourStyles from "./styles";

const FourOhFour = (): ReactElement => {
  const styles = useFourOhFourStyles({});

  return (
    <>
      <Link to="/" className={styles.homeLink}>
        <svg
          height="0.8em"
          width="0.8em"
          viewBox="0 0 2 1"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#777777"
            strokeWidth="0.1"
            points="0.9,0.1 0.1,0.5 0.9,0.9"
          />
        </svg>
        Home
      </Link>
      <div className={styles.container}>
        <div className={styles.backgroundWrapper}>
          <h1 id="visual">404</h1>
        </div>
        <p className={styles.notExists}>
          The page you’re looking for does not exist.
        </p>
      </div>
    </>
  );
};

export default FourOhFour;
