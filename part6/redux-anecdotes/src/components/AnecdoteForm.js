import { addAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { triggerNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({addAnecdote, triggerNotification}) => {
  const create = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    addAnecdote(content)
    triggerNotification(`Created '${content}'`, 5)
  }

  return(
    <form onSubmit={create}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  addAnecdote,
  triggerNotification
}

const ConnectedAnecdoteForm = connect(mapStateToProps, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm