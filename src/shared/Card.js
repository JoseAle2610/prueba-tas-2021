const Card = ({header, children}) => {
  return (
    <section className='card mb-3'>
      <header className='card-header'>{header}</header>
      <div className='card-body'>{children}</div>
    </section>
  )
}

export default Card
