import React, {useState} from "react"
import BlackPiece from "./BlackPiece.png"
import WhitePiece from "./WhitePiece.png"
import {useGlobal} from "reactn"
import "./Cell.css"
import {WHITE_PLAYER, BLACK_PLAYER} from "../common"

let Cell = ({row, col, setBoardMessage, updateCellValue}) => {
  const CELL_SIZE = 40
  const IMG_SIZE = parseInt(CELL_SIZE * 0.75)

  let [boardSize] = useGlobal("boardSize")
  let [content, setContent] = useState(null)
  let [userTurn, setUserTurn] = useGlobal("userTurn")

  // console.log("!!")
  let markCell = () => {
    if(userTurn && !content){
      setContent(userTurn)
      let newUserTurn = userTurn === WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER
      setUserTurn(newUserTurn)
      setBoardMessage(`${newUserTurn.charAt(0).toUpperCase() + newUserTurn.slice(1)} needs to make a move.`)
      updateCellValue(row, col, userTurn)
    }
  }

  let hello = () => console.log("Hello!")

  let img
  if(content)
    img = <img width={IMG_SIZE} height={IMG_SIZE} src={content=="black" ? BlackPiece : WhitePiece} style={{paddingTop:`${parseInt((CELL_SIZE - IMG_SIZE)/2-1)}px`}}/>

  return (
    <div className="cell" style={{width: `${CELL_SIZE}px`, height: `${CELL_SIZE}px`}} onClick={() => markCell()}>
      {img ? img : ""}
    </div>
  )
}

export default Cell