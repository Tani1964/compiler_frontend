import Logo from '../assets/logo.png'

const Header = () => {
  return (
    <div className=" border-2 px-2  h-[10%] flex items-center shadow-xl" >
        <img src={Logo} alt="" />
        <h1>COMPILER X-RAY</h1>
        </div>
  )
}

export default Header