import { motion, useMotionValue, useTransform } from "framer-motion"; // Importing necessary modules from framer-motion library
import React from "react"; // Importing React module
import styles from "../styles/modules/todoItem.module.scss"; // Importing styles from todoItem.module.scss file

const checkVariants = {
  initial: {
    color: "#fff", // Initial color of the check mark
  },
  checked: { pathLength: 1 }, // Animation variant for checked state
  unchecked: { pathLength: 0 }, // Animation variant for unchecked state
};

const boxVariants = {
  checked: {
    background: "var(--primaryPurple)", // Background color when checked
    transition: { duration: 0.1 }, // Transition duration for background color change
  },
  unchecked: {
    background: "var(--gray-2)", // Background color when unchecked
    transition: { duration: 0.1 }, // Transition duration for background color change
  },
};

/**
 * CheckButton component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.checked - Indicates whether the button is checked or not.
 * @param {Function} props.handleCheck - The function to handle the check event.
 * @returns {JSX.Element} The CheckButton component.
 */
function CheckButton({ checked, handleCheck }) {
  const pathLength = useMotionValue(0); // Motion value for controlling the length of the check mark path
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]); // Motion value for controlling the opacity of the check mark

  return (
    <motion.div
      animate={checked ? "checked" : "unchecked"} // Animation variant to use based on the checked state
      className={styles.svgBox} // CSS class for the container div
      variants={boxVariants} // Variants for the container div animation
      onClick={() => handleCheck()} // Event handler for click event
    >
      <motion.svg
        className={styles.svg} // CSS class for the SVG element
        viewBox="0 0 53 38" // Viewbox for the SVG element
        fill="none" // Fill color for the SVG element
        xmlns="http://www.w3.org/2000/svg" // XML namespace for the SVG element
      >
        <motion.path
          variants={checkVariants} // Variants for the check mark animation
          animate={checked ? "checked" : "unchecked"} // Animation variant to use based on the checked state
          style={{ pathLength, opacity }} // Inline style for the check mark path
          fill="none" // Fill color for the check mark path
          strokeMiterlimit="10" // Stroke miter limit for the check mark path
          strokeWidth="6" // Stroke width for the check mark path
          d="M1.5 22L16 36.5L51.5 1" // Path data for the check mark
          strokeLinejoin="round" // Stroke line join for the check mark path
          strokeLinecap="round" // Stroke line cap for the check mark path
        />
      </motion.svg>
    </motion.div>
  );
}

export default CheckButton; // Exporting the CheckButton component
