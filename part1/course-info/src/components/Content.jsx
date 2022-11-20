const Content = ({content}) => {

  return(
    <div>
      {content.map((item, index) => {
        return <p key={index}>{item.part} {item.exercises}</p>
      })}
    </div>
  )
}

export default Content;