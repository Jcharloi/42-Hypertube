import React, { ReactElement } from "react";

import useErrorStyles from "./styles";

const Error = (): ReactElement => {
  const styles = useErrorStyles({});

  return (
    <div className={styles.container}>
      <div className={styles.errorWrapper}>
        <div className="error-container">
          <div className="error-box" />
          <p className="error-header">ERROR 500</p>
          <p className="error-highlight-container">
            Things are a little{" "}
            <span className="error-highlight">unstable</span> here
          </p>
          <p className="error-highlight-container">I suggest come back later</p>
        </div>
      </div>
    </div>
  );
};
export default Error;
