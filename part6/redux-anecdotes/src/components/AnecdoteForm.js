import { addAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { triggerNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(addAnecdote(content))
    dispatch(triggerNotification(`Created '${content}'`, 5))
  }

  return(
    <form onSubmit={create}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm