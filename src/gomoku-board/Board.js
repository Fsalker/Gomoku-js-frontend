import React, {useState, useRef, useEffect} from "react"
import {useGlobal} from "reactn"
import Cell from "./Cell.js"
import Button from '@material-ui/core/Button';
import {WHITE_PLAYER, BLACK_PLAYER, WINNING_LENGTH} from "../common"

let Board = () => {
  const STARTING_PLAYER = BLACK_PLAYER

  let [boardSize] = useGlobal("boardSize")
  let [message, setMessage] = useState("")
  let [userTurn, setUserTurn] = useGlobal("userTurn")
  let [cells, setCells] = useState(null)
  let [cellValues, setCellValues] = useState(null)

  // useEffect(() => {
  //   console.log("-->")
  //   console.log(cellValues)
  // })

  //let cells = new Array(boardSize*boardSize).fill(null).map((val, index) => <Cell key={index}/>)
  let startGame = () => {
    if(!cells)
      initialiseCells()
    else
      resetCells()
    setMessage(`${STARTING_PLAYER.charAt(0).toUpperCase() + STARTING_PLAYER.slice(1)} needs to make a move.`)
  }

  let initialiseCells = () => {
    cellValues = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null))
    setCellValues(cellValues)
    setCells(new Array(boardSize).fill(null).reduce((acc, val, row_index) => {
      let cells = new Array(boardSize).fill(null).map((val, col_index) => <Cell key={1 ? Math.random() : col_index * boardSize + row_index} updateCellValue={updateCellValue} setBoardMessage={setMessage} row={row_index} col={col_index}/>)
      let currentRow = (
        <div key={row_index} style={{marginBottom: "-4px"}}>
          {cells}
        </div>
      )

      return acc.concat(currentRow)
    }, []))
    setUserTurn(STARTING_PLAYER)
  }

  let resetCells = () => {
    // lazy solution
    initialiseCells()

    // console.log("Resetting cells...")
    // console.log(cells)
    // for(let cells_row of cells)
    //   for(let cell of cells_row.props.children)
    //      console.log(cell)
  }

  let checkForGameOver = (row, col) => {
    const CELL_COLOR = cellValues[row][col]

    let dir_add_col = [0, 1, 1, 1, 0, -1, -1, -1]
    let dir_add_row = [1, 1, 0, -1, -1, -1, 0, 1]
    const NUM_DIRECTIONS = dir_add_col.length

    for(let direction = 0; direction < NUM_DIRECTIONS; ++direction){
      let final_row = row + dir_add_row[direction] * (WINNING_LENGTH-1)
      let final_col = col + dir_add_col[direction] * (WINNING_LENGTH-1)

      if(!(final_row >= 0 && final_row < boardSize && final_col >= 0 && final_row < boardSize)) continue

      let winning = true
      for(let index=1; index<WINNING_LENGTH; ++index){
        let current_row = row + dir_add_row[direction] * index
        let current_col = col + dir_add_col[direction] * index
        const CURR_CELL_COLOR = cellValues[current_row][current_col]
        if(CURR_CELL_COLOR != CELL_COLOR) {
          winning = false
          break // old school algorithmics optimisations ftw :D
        }
      }
      if(winning){
        setMessage(`Game over! ${CELL_COLOR.charAt(0).toUpperCase() + CELL_COLOR.slice(1)} is victorious!`)
        setUserTurn(null)
      }
    }
  }

  let updateCellValue = (row, col, newValue) => {
    cellValues[row][col] = newValue
    setCellValues(cellValues)
    checkForGameOver(row, col)
    // console.log(cellValues)
  }

  return (
    <div style={{textAlign:"center", marginTop: "4px"}}>
      <Button variant="contained" color={"primary"} disabled={!!userTurn} onClick={() => startGame()}>Start Game</Button>

      {userTurn || cells ?
        <div>
          <p>{message}</p>
          {cells?<h3>Here goes the board</h3>:""}
          {cells}
        </div>
      : ""}
    </div>
  )
}

export default Board