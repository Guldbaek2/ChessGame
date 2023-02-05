class piece {
    constructor(color) {
        this.color = color;
    }
}

class rook extends piece {
    constructor(color) {
        super(color)
        this.identifier = "R"
        this.has_moved = false
    }
}

class bishop extends piece {
    constructor(color) {
        super(color)
        this.identifier = "B"
    }
}

class queen extends piece {
    constructor(color) {
        super(color)
        this.identifier = "Q"
    }
}

class king extends piece {
    constructor(color) {
        super(color)
        this.identifier = "K"
        this.has_moved = false
    }
}

class knight extends piece {
    constructor(color) {
        super(color)
        this.identifier = "H"
    }
}

class pawn extends piece {
    constructor(color) {
        super(color)
        this.identifier = "P"
        this.has_moved = false;
    }
}
function create_board() {
    let board = [[7], [7], [7], [7], [7], [7], [7], [7]]
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            board[i][j] = null
        }
    }
    let bishops = [new bishop("W"), new bishop ("W"), new bishop ("B"), new bishop ("B")]
    board[2][0] = bishops[0]
    board[5][0] = bishops[1]
    board[2][7] = bishops[2]
    board[5][7] = bishops[3]
    let rooks = [new rook ("W"), new rook ("W"), new rook ("B"), new rook ("B")]
    board[0][0] = rooks[0]
    board[7][0] = rooks[1]
    board[0][7] = rooks[2]
    board[7][7] = rooks[3]
    let knights = [new knight("W"), new knight("W"), new knight("B"), new knight("B")]
    board[1][0] = knights[0]
    board[6][0] = knights[1]
    board[1][7] = knights[2]
    board[6][7] = knights[3]
    let kings = [new king ("W"), new king ("B")]
    board[4][0] = kings[0]
    board[4][7] = kings[1]
    let queens = [new queen ("W"), new queen ("B")]
    board[3][0] = queens[0]
    board[3][7] = queens[1]
    let pawns = []
    for (let i = 0; i < 16; i++) {
        if (i < 8) {
            pawns[i] = new pawn("W", false)
            board[i][1] = pawns[i]
        } else {
            pawns[i] = new pawn("B", false)
            board[i - 8][6] = pawns[i]
        }
    }
    return board;
}

function print_board(board) {
    let temp = "8"
    for (let i = 7; i >= 0; i--) {
        temp += "  "
        for (let j = 0; j <= 7; j++) {
            if (board[j][i] != null) {
                temp += board[j][i].color
                temp += board[j][i].identifier + " "
            } else {
                temp += "0  "
            }
        }
        console.log(temp)
        temp = "8  " - (8 - i)
    }
    console.log("   A  B  C  D  E  F  G  H\n")
}

function move_piece(board, input) {
    let fail = false
    let start_column = input[0].charCodeAt(0) - 65
    let start_row = parseInt(input[1]) - 1
    let end_column = input[2].charCodeAt(0) - 65
    let end_row = parseInt(input[3]) - 1
    switch (board[start_column][start_row].identifier) {
        case "R":
            if (start_column !== end_column && start_row !== end_row) {
                console.log("Rooks can not move this way\n")
                fail = true
            } else if (start_column === end_column) {
                if (start_row < end_row) {
                    for (let i = start_row + 1; i < end_row; i++) {
                        if (board[start_column][i] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                } else {
                    for (let i = start_row - 1; i > end_row; i--) {
                        if (board[start_column][i] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                }
            } else if (start_row === end_row) {
                if (start_column < end_column) {
                    for (let i = start_column + 1; i < end_column; i++) {
                        if (board[i][start_row] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                } else {
                    for (let i = start_column - 1; i > end_column; i--) {
                        if (board[i][start_row] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                }
            }
            break
        case "B":
            if (Math.abs(start_column - end_column) !== Math.abs(start_row - end_row)) {
                console.log("The bishop can not move that way\n")
                fail = true
            } else if (start_column < end_column && start_row < end_row) {
                for (let i = 1; i < end_row - start_row; i++) {
                    if (board[start_column + i][start_row + i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column > end_column && start_row < end_row) {
                for (let i = 1; i < end_row - start_row; i++) {
                    if (board[start_column - i][start_row + i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column < end_column && start_row > end_row) {
                for (let i = 1; i < start_row - end_row; i++) {
                    if (board[start_column + i][start_row - i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else {
                for (let i = 1; i < start_row - end_row; i++) {
                    if (board[start_column - i][start_row - i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            }
            break
        case "H":
            if ((Math.abs(start_column - end_column) === 2 && Math.abs(start_row - end_row) !== 1) ||
                (Math.abs(start_column - end_column) === 1 && Math.abs(start_row - end_row) !== 2)) {
                console.log("The knight can not move that way\n")
                fail = true
            }
            break
        case "Q":
            if ((Math.abs(start_column - end_column) !== Math.abs(start_row - end_row)) &&
                ((start_column !== end_column) || (start_row !== end_row))) {
                console.log("The queen can not move that way\n")
                fail = true
            }else if (start_column < end_column && start_row < end_row) {
                for (let i = 1; i < end_row - start_row; i++) {
                    if (board[start_column + i][start_row + i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column > end_column && start_row < end_row) {
                for (let i = 1; i < end_row - start_row; i++) {
                    if (board[start_column - i][start_row + i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column < end_column && start_row > end_row) {
                for (let i = 1; i < start_row - end_row; i++) {
                    if (board[start_column + i][start_row - i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column > end_column && start_row > end_row) {
                for (let i = 1; i < start_row - end_row; i++) {
                    if (board[start_column - i][start_row - i] !== null) {
                        console.log("Piece in the way\n")
                        fail = true
                    }
                }
            } else if (start_column === end_column && start_row < end_row) {
                    for (let i = start_row + 1; i < end_row; i++) {
                        if (board[start_column][i] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                } else if (start_column === end_column && start_row > end_row) {
                    for (let i = start_row - 1; i > end_row; i--) {
                        if (board[start_column][i] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                } else if (start_row === end_row && start_column < end_column) {
                    for (let i = start_column + 1; i < end_column; i++) {
                        if (board[i][start_row] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                } else {
                    for (let i = start_column - 1; i > end_column; i--) {
                        if (board[i][start_row] !== null) {
                            console.log("Piece in the way\n")
                            fail = true
                        }
                    }
                }
            break
        case "K":
            if (Math.abs(start_column - end_column) !== 1 || Math.abs(start_row - end_row) !== 1) {
                console.log("The king can not move that way\n")
                fail = true
            }
            break
        case "P":
            if (Math.abs(end_row - start_row) > 2) {
                console.log("The pawn can not move that way\n")
                fail = true
            } else if (Math.abs(end_row - start_row) === 2 && Math.abs(start_column - end_column) > 0) {
                console.log("The pawn can not move that way\n")
                fail = true
            } else if (Math.abs(end_row - start_row) !== 1 && board[start_column][start_row].has_moved === true) {
                console.log("The pawn can not move that way\n")
                fail = true
            } else if (Math.abs(start_column - end_column) > 1) {
                console.log("The pawn can not move that way\n")
                fail = true
            } else if (Math.abs(start_column - end_column) === 1 &&
                      (board[end_column][end_row] === null ||
                       board[start_column][start_row].color === board[end_column][end_row].color)) {
                console.log("There is no piece for the pawn to take\n")
                fail = true
            }
            break
        default:
            break
    }
    if (fail !== true && board[end_column][end_row] != null &&
        board[start_column][start_row].color === board[end_column][end_row].color) {
        console.log("You already have a piece on that square\n")
        fail = true
    }
    if (fail === false) {
        board[end_column][end_row] = board[start_column][start_row]
        board[start_column][start_row] = null
        if (board[end_column][end_row].has_moved !== null && board[end_column][end_row].has_moved === false) {
            board[end_column][end_row].has_moved = true
        }
    }
}

function swap_player(player) {
    Math.abs(player - 1)
}

function make_move(move, player, board) {
    let fail = false
    do {

        fail = false
        let start_column = move[0].charCodeAt(0) - 65
        let start_row = parseInt(move[1]) - 1
        let end_column = move[2].charCodeAt(0) - 65
        let end_row = parseInt(move[3]) - 1
        if (board[start_column][start_row] === null) {
            console.log("There is no piece for you to move")
            fail = true
        } else if (player === 1 && board[start_column][start_row].color === "B") {
            console.log("wrong color piece")
            fail = true
        } else if (player === 2 && board[start_column][start_row].color === "W") {
            console.log("wrong color piece")
            fail = true
        } else if (start_column < 0 || start_column > 7 ||
                   start_row < 0 || start_row > 7 ||
                   end_column < 0 || end_column > 7 ||
                   end_row < 0 || end_column > 7) {
            console.log("Move is out of bounds")
            fail = true
        }
    } while (fail === true)
    return move
}

let player = 1
let move = null
let board = create_board()
while(true) {
    print_board(board)
    make_move(move, player, board)
    move_piece(board, move)
    swap_player(player)
}

// TODO Insert player input
// TODO insert check/checkmate
// TODO insert en passant
// TODO insert castling