import { Link } from "react-router-dom";

export const Header = () => {
  const padding = {
    paddingRight: 5
  }

  return (
    <>
      <div>
        <Link to='/' style={padding}>anecdotes</Link>
        <Link to='/create-new' style={padding}>create new</Link>
        <Link to='/about' style={padding}>about</Link>
      </div>
      
    </>
  )
}

export const Footer = () => {
  return(
    <div>
      <p>Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.</p>
      <p>See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.</p>
    </div>
  )
}
