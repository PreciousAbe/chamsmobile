import { useEffect } from "react"
import { RootState } from './redux/store'
import { useDispatch, useSelector } from "react-redux"
import { addTodos, getTodos, removeTodo } from "./redux/actions"


const TodosTable= () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state?.todos?.loading)
  const todos = useSelector((state: RootState) => state?.todos?.data)
  console.log({todos})

  useEffect(() => {
    dispatch(getTodos() as any)
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(removeTodo(id) as any)
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.length > 0 && todos?.map((yourEntity) => (
          <tr key={yourEntity.id}>
            <td>{yourEntity.id}</td>
            <td>{yourEntity.name}</td>
            <td>{yourEntity.description}</td>
            <td>
              <button>Edit</button>
              <button onClick={() => handleDelete(yourEntity.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
        {loading && (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

const YourEntityForm = () => {
  const dispatch = useDispatch()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const yourEntity = {
      id: 0,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }
    dispatch(addTodos(yourEntity) as any)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input placeholder='name' type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea placeholder='description' name="description" required />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const dispatch = useDispatch()

  const handleRefresh = () => {
    dispatch(getTodos() as any)
  }

  return (
    <div>
      <h1>Your Entity</h1>
      <TodosTable />
      <YourEntityForm />
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  )
}

export default App
