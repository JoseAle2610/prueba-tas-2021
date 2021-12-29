import theme from 'theme'

const Badge = ({text, color}) => {
  const colorB = theme.color[color] || theme.color.primary
  return (
    <span className='badge' style={{backgroundColor: colorB}}>{text}</span>
  )
}

export default Badge
