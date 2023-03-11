import { useEffect } from "react"
import { RootState } from './redux/store'
import { useDispatch, useSelector } from "react-redux"

const App = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.todo.loading)

  useEffect(() => {
    dispatch(YourEntityActions.fetchAll())
  }, [dispatch])

  const handleDelete = (id: number) => {
    dispatch(YourEntityActions.remove(id))
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
        {yourEntities.map((yourEntity) => (
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
    const yourEntity: YourEntity = {
      id: 0,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
    }
    dispatch(YourEntityActions.create(yourEntity))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea name="description" required />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const YourEntityPage = () => {
  const dispatch = useDispatch()

  const handleRefresh = () => {
    dispatch(YourEntityActions.fetchAll())
  }

  return (
    <div>
      <h1>Your Entity</h1>
      <YourEntityTable />
      <YourEntityForm />
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  )
}

export default App
