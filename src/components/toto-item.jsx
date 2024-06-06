import { format } from "date-fns"; // Importing the format function from the date-fns library
import { motion } from "framer-motion"; // Importing the motion component from the framer-motion library
import toast from "react-hot-toast"; // Importing the toast function from the react-hot-toast library
import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState from the react library
import { MdDelete, MdEdit } from "react-icons/md"; // Importing the MdDelete and MdEdit components from the react-icons/md library
import { useDispatch } from "react-redux"; // Importing the useDispatch function from the react-redux library
import { deleteTodo, updateTodo } from "../redux/todoSlice"; // Importing the deleteTodo and updateTodo functions from the ../redux/todoSlice file
import styles from "../styles/modules/todoItem.module.scss"; // Importing the styles object from the ../styles/modules/todoItem.module.scss file
import { getClasses } from "../utils/getClasses"; // Importing the getClasses function from the ../utils/getClasses file
import CheckButton from "./check-button"; // Importing the CheckButton component from the ./check-button file
import TodoModal from "./todo-modal"; // Importing the TodoModal component from the ./todo-modal file

const child = {
  hidden: { y: 20, opacity: 0 }, // Animation properties for the hidden state
  visible: {
    y: 0,
    opacity: 1,
  }, // Animation properties for the visible state
};

function TodoItem({ todo }) {
  const dispatch = useDispatch(); // Creating a dispatch function using the useDispatch hook
  const [checked, setChecked] = useState(false); // Creating a checked state variable and a setChecked function using the useState hook
  const [updateModalOpen, setUpdateModalOpen] = useState(false); // Creating an updateModalOpen state variable and a setUpdateModalOpen function using the useState hook

  useEffect(() => {
    // useEffect hook to handle side effects
    if (todo.status === "complete") {
      setChecked(true); // If the todo status is "complete", set the checked state to true
    } else {
      setChecked(false); // Otherwise, set the checked state to false
    }
  }, [todo.status]); // Run the effect whenever the todo status changes

  const handleCheck = () => {
    setChecked(!checked); // Toggle the checked state
    dispatch(
      updateTodo({ ...todo, status: checked ? "incomplete" : "complete" })
    ); // Dispatch the updateTodo action with the updated todo status
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id)); // Dispatch the deleteTodo action with the todo id
    toast.success("Todo Deleted Successfully"); // Show a success toast message
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true); // Open the update modal
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        {/* Animate the div using the motion component */}
        <div className={styles.todoDetails}>
          {/* Render the todo details */}
          <CheckButton checked={checked} handleCheck={handleCheck} />
          {/* Render the CheckButton component */}
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            {/* Render the todo title */}
            <p className={styles.time}>
              {format(new Date(todo.time), "p, MM/dd/yyyy")}
            </p>
            {/* Render the formatted todo time */}
          </div>
        </div>
        <div className={styles.todoActions}>
          {/* Render the todo actions */}
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          {/* Render the delete icon */}
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
          {/* Render the edit icon */}
        </div>
      </motion.div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
      />
      {/* Render the TodoModal component */}
    </>
  );
}

export default TodoItem;
