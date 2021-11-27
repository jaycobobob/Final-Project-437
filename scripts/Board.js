class Board {
    size;

    #grid;

    static boardSize = 8;

    constructor() {
        this.size = Board.boardSize;
        this.#constructGrid();
    }

    #constructGrid() {
        this.#grid = []
        for (let i = 0; i < this.size; i++) {
            let buff = []
            for (let j = 0; j < this.size; j++) {
                buff.push(new GridCell(i, j));
            }
            this.#grid.push(buff);
        }

        for (let rowNum = 0; rowNum < this.size; rowNum++) {
            for (let colNum = 0; colNum < this.size; colNum++) {
                if (rowNum !== 0)
                    this.#grid[rowNum][colNum].up = this.#grid[rowNum - 1][colNum]
                if (rowNum !== this.size - 1)
                    this.#grid[rowNum][colNum].down = this.#grid[rowNum + 1][colNum]
                if (colNum !== 0)
                    this.#grid[rowNum][colNum].left = this.#grid[rowNum][colNum - 1]
                if (colNum !== this.size - 1)
                    this.#grid[rowNum][colNum].right = this.#grid[rowNum][colNum + 1]
            }
        }
    }

    getFlattenedGrid() {
        return [].concat(...this.#grid);
    }
}

class GridCell {
    // identifiers
    row;
    column;

    // neighbors
    up;
    down;
    left;
    right;

    constructor(row, column) {
        this.row = row;
        this.column = column;
    }
}