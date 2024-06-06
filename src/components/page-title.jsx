import React from "react"; // Importing the React library
import styles from "../styles/modules/title.module.scss"; // Importing the CSS module for styles

function PageTitle({ children, ...rest }) { // Declaring a functional component called PageTitle
  return (
    <p className={styles.title} {...rest}> {/* Rendering a paragraph element with a class name of "title" */}
      {children} {/* Rendering the children passed to the component */}
    </p>
  );
}

export default PageTitle; // Exporting the PageTitle component as the default export
