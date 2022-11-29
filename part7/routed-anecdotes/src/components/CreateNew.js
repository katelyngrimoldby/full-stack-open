import { useState } from "react"
import { useNavigate } from'react-router-dom'

const useField = type => {
  const [value, setValue] = useState('')

  const onChange = (event, reset) =>  {
    if(reset) {
      setValue('')
    } else {
      setValue(event.target.value)
    }
    
  }

  return {
    type,
    value,
    onChange
  }
}

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author  = useField('text')
  const info = useField('text')

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = (event) => {
    content.onChange(event, 'reset')
    author.onChange(event, 'reset')
    info.onChange(event, 'reset')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew;