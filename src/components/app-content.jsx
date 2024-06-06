import { AnimatePresence, motion } from "framer-motion"; // Importing necessary components from framer-motion library
import React from "react"; // Importing React
import { useSelector } from "react-redux"; // Importing useSelector hook from react-redux library
import styles from "../styles/modules/app.module.scss"; // Importing styles from app.module.scss file
import TodoItem from "./toto-item"; // Importing TodoItem component

const container = {
  hidden: { opacity: 1 }, // Initial opacity of container is 1
  visible: {
    opacity: 1, // Opacity of container when it becomes visible is 1
    scale: 1, // Scale of container when it becomes visible is 1
    transition: {
      staggerChildren: 0.2, // Stagger the children with a delay of 0.2 seconds
    },
  },
};
const child = {
  hidden: { y: 20, opacity: 0 }, // Initial position and opacity of child is defined
  visible: {
    y: 0, // Position of child when it becomes visible is 0
    opacity: 1, // Opacity of child when it becomes visible is 1
  },
};

function AppContent() {
  const todoList = useSelector((state) => state.todo.todoList); // Accessing todoList from Redux store using useSelector hook
  const filterStatus = useSelector((state) => state.todo.filterStatus); // Accessing filterStatus from Redux store using useSelector hook

  const sortedTodoList = [...todoList]; // Creating a copy of todoList array
  sortedTodoList.sort((a, b) => new Date(b.time) - new Date(a.time)); // Sorting the todoList array based on the time property

  const filteredTodoList = sortedTodoList.filter((item) => {
    if (filterStatus === "all") {
      return true; // If filterStatus is "all", return all items
    }
    return item.status === filterStatus; // Return items that match the filterStatus
  });

  return (
    <motion.div
      className={styles.content__wrapper} // Applying styles from app.module.scss to the div
      variants={container} // Applying container variants to the div
      initial="hidden" // Initial animation state is "hidden"
      animate="visible" // Animation state when component is visible is "visible"
    >
      <AnimatePresence> // Component for animating presence of elements
        {filteredTodoList && filteredTodoList.length > 0 ? ( // Checking if filteredTodoList is not empty
          filteredTodoList.map((todo) => (
            // <motion.div key={todo.id} variants={child}> // Commented out motion.div component
            <TodoItem key={todo.id} todo={todo} /> // Rendering TodoItem component for each todo in filteredTodoList
            // </motion.div> // Commented out motion.div component
          ))
        ) : (
          <motion.p variants={child} className={styles.emptyText}> // Paragraph element with emptyText styles
            No Todos
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AppContent; // Exporting AppContent component
