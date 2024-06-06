import React, { useState } from "react";
import { useDispatch, useSelector }  from 'react-redux'
import Button, { SelectButton } from "./button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./todo-modal";
import { updateFilterStatus } from "../redux/todoSlice";

function AppHeader() {
  // State for controlling the visibility of the modal
  const [modalOpen, setModalOpen] = useState(false);

  // Get the initial filter status from the Redux store
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);

  // State for storing the current filter status
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);

  // Redux dispatch function for updating the filter status
  const dispatch = useDispatch();

  // Function to update the filter status and dispatch the action
  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  return (
    <div className={styles.appHeader}> 
      {/* Button component for adding a task */}
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      {/* Select button component for filtering tasks */}
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      {/* TodoModal component for displaying the modal */}
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader; 
