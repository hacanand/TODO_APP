import { createSlice } from '@reduxjs/toolkit';

// Function to get the initial todo list from local storage
const getInitialTodo = () => {
  // Getting todo list from local storage
  const localTodoList = window.localStorage.getItem('todoList');
  
  // If todo list is not empty
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  
  // If todo list is empty, set it to an empty array in local storage
  window.localStorage.setItem('todoList', []);
  return [];
};

// Initial value for the todo slice
const initialValue = {
  filterStatus: 'all', // Initial filter status
  todoList: getInitialTodo(), // Initial todo list obtained from local storage
};

// Create the todo slice using createSlice function from Redux Toolkit
export const todoSlice = createSlice({
  name: 'todo', // Name of the slice
  initialState: initialValue, // Initial state
  reducers: {
    // Reducer to add a new todo
    addTodo: (state, action) => {
      // Add the new todo to the todo list in state
      state.todoList.push(action.payload);
      
      // Get the current todo list from local storage
      const todoList = window.localStorage.getItem('todoList');
      
      // If todo list exists in local storage
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        
        // Add the new todo to the todo list in local storage
        todoListArr.push({
          ...action.payload,
        });
        
        // Update the todo list in local storage
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
      } else {
        // If todo list does not exist in local storage, create a new one
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload,
            },
          ])
        );
      }
    },
    // Reducer to update a todo
    updateTodo: (state, action) => {
      // Get the current todo list from local storage
      const todoList = window.localStorage.getItem('todoList');
      
      // If todo list exists in local storage
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        
        // Find the todo with the matching id and update its status and title
        todoListArr.forEach((todo) => {
          if (todo.id === action.payload.id) {
            todo.status = action.payload.status;
            todo.title = action.payload.title;
          }
        });
        
        // Update the todo list in local storage
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        
        // Update the todo list in state
        state.todoList = [...todoListArr];
      }
    },
    // Reducer to delete a todo
    deleteTodo: (state, action) => {
      // Get the current todo list from local storage
      const todoList = window.localStorage.getItem('todoList');
      
      // If todo list exists in local storage
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        
        // Find the todo with the matching id and remove it from the todo list
        todoListArr.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        
        // Update the todo list in local storage
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        
        // Update the todo list in state
        state.todoList = todoListArr;
      }
    },
    // Reducer to update the filter status
    updateFilterStatus: (state, action) => {
      // Update the filter status in state
      state.filterStatus = action.payload;
    },
  },
});

// Export the action creators
export const { addTodo, updateTodo, deleteTodo, updateFilterStatus } =
  todoSlice.actions;

// Export the reducer
export default todoSlice.reducer;
