import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { triggerNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(triggerNotification(`Voted on '${anecdote.content}'`, 5))
  }

  return(
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        {
          if(filter) {
            return anecdote.content.toUpperCase().includes(filter.toUpperCase())
            ? (<div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>)
            : null
          } else {
            return(
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )
          }
          
        }
      )}
    </div>
  )
}

export default AnecdoteList;