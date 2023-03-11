import axios from "axios"
import { AppDispatch } from "./store"
import * as types from "./types"
const apiUrl = "http://localhost:3001/your-entity"

const fetchTodos = async () => {
  return await axios
    .post(apiUrl, {})
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const getTodos = () => async (dispatch) => {
  try {
    await dispatch({ type: types.GET_TODOS_BEGIN })
    const todos: any = await fetchTodos()
    dispatch({ type: types.GET_TODOS_SUCCESS, payload: todos.data })
  } catch (error: any) {
    dispatch({ type: types.GET_TODOS_FAILURE, message: error.message })
  }
}

const createTodo = async (todoInfo: any) => {
  console.log(todoInfo)
  return await axios
    .post(apiUrl, todoInfo, {})
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const addTodos = (todoInfo: any) => async (dispatch) => {
  try {
    await dispatch({ type: types.CREATE_TODOS_BEGIN })
    const create: any = await createTodo(todoInfo)
    dispatch({ type: types.CREATE_TODOS_SUCCESS, payload: create.data })
  } catch (error: any) {
    dispatch({ type: types.CREATE_TODOS_FAILURE, message: error.message })
  }
}

const editTodo = async (id: any, todoInfo: any) => {
  console.log(todoInfo)
  return await axios
    .put(`${apiUrl}/${id}`, todoInfo, {})
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const updateTodos = (todoInfo: any, id: any) => async (dispatch) => {
  try {
    await dispatch({ type: types.EDIT_TODOS_BEGIN })
    const update: any = await editTodo(todoInfo, id)
    dispatch({ type: types.EDIT_TODOS_SUCCESS, payload: update.data })
  } catch (error: any) {
    dispatch({ type: types.EDIT_TODOS_FAILURE, message: error.message })
  }
}

const deleteTodo = async (id: any) => {
  return await axios
    .delete(`${apiUrl}/${id}`, {})
    .then((res) => {
      return res
    })
    .catch((error) => {
      throw error
    })
}

export const removeTodo = (id: any) => async (dispatch) => {
  try {
    await dispatch({ type: types.DELETE_TODOS_BEGIN })
    const todo: any = await deleteTodo(id)
    dispatch({ type: types.DELETE_TODOS_SUCCESS, payload: todo.data })
  } catch (error: any) {
    dispatch({ type: types.DELETE_TODOS_FAILURE, message: error.message })
  }
}

