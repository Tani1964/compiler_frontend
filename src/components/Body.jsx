import Input from "./inputs/Input"
import Outputs from "./outputs/Outputs"

const Body = () => {
  return (
    <div className="flex flex-col gap-4  h-fit py-4 px-12">
        <Input/>
        <Outputs/>
    </div>
  )
}

export default Body