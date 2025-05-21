import IntermediateCode from "./IntermediateCode"
import Interpreter from "./Interpreter"
import Lexemes from "./Lexemes"
import MachineCode from "./MachineCode"
import ParseTree from "./ParseTree"

const Outputs = () => {
  return (
    <div className="h-[80%] flex flex-col gap-[5px]">
        <Lexemes/>
        <ParseTree/>
        <IntermediateCode/>
        <MachineCode/>
    </div>
  )
}

export default Outputs