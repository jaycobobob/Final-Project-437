/*
    Contains functions necessary for displaying the board
 */

function recreateGrid() {
    // removing all existing wires
    d3.selectAll(".wire").remove();

    Board.boardSize = parseInt(d3.select("#board-size-input").property("value"));
    console.log(`set new boardsize to ${Board.boardSize}`);

    boardScalar = d3.scaleLinear()
        .domain([0, Board.boardSize])
        .rangeRound([0, SIZE]);

    board = new Board();
    graph = new IntersectionGraph();
    let transSpeed = 500;

    // shrink all existing grid cells before doing fresh databind
    let selection = boardSvg.selectAll("rect");
    selection.transition().duration(transSpeed)
        .attr("width", 0)
        .attr("height", 0)
        .end()
        .then(() => {
            // begin the new databind
            selection = boardSvg.selectAll("rect").data(board.getFlattenedGrid());
            // remove stale cells
            selection.exit().remove();
            // add new cells, if necessary
            selection = selection.enter().append("g").append("rect")
                // get all cells in position
                .merge(selection).transition().duration(0)
                .attr("x", (d,i) => {
                    return boardScalar(d.column);
                }).attr("y", (d,i) => {
                return boardScalar(d.row);
                }).attr("class", "grid-cell") // wipe any existing terminal data


                // grow all cells
                .transition().duration(transSpeed)
                .attr("width", (d,i) => {
                    return SIZE / Board.boardSize;
                }).attr("height", (d,i) => {
                return SIZE / Board.boardSize;
            });
            boardSvg.selectAll("rect").on("click", gridCellClickHandler);
        })
}

function drawWire(path) {
    console.log("drawing");
    console.log(path);
    let cellSize = SIZE / Board.boardSize;
    let wireWidth = cellSize / 5;
    for (let i = 0; i < path.length - 1; i++) {
        let wire = boardSvg.append("rect").attr("class", "wire");
        if (path[i].column < path[i+1].column) { // if the next cell is to the right
            wire.attr("x", () => {
                    let originX = boardScalar(path[i].column) + cellSize / 2;
                    return originX - wireWidth / 2;
                }).attr("y", () => {
                    let originY = boardScalar(path[i].row) + cellSize / 2;
                    return originY - wireWidth / 2;
                }).attr("width", cellSize + wireWidth)
                .attr("height", wireWidth);
        } else if (path[i].column > path[i+1].column) { // if the next cell is to the left
            wire.attr("x", () => {
                    let originX = boardScalar(path[i].column) - cellSize / 2;
                    return originX - wireWidth / 2;
                }).attr("y", () => {
                    let originY = boardScalar(path[i].row) + cellSize / 2;
                    return originY - wireWidth / 2;
                }).attr("width", cellSize + wireWidth)
                .attr("height", wireWidth);
        } else if (path[i].row < path[i+1].row) {
            wire.attr("x", () => {
                let originX = boardScalar(path[i].column) + cellSize / 2;
                return originX - wireWidth / 2;
            }).attr("y", () => {
                let originY = boardScalar(path[i].row) + cellSize / 2;
                return originY - wireWidth / 2;
            }).attr("width", wireWidth)
            .attr("height", cellSize + wireWidth);
        } else if (path[i].row > path[i+1].row) {
            wire.attr("x", () => {
                let originX = boardScalar(path[i].column) + cellSize / 2;
                return originX - wireWidth / 2;
            }).attr("y", () => {
                let originY = boardScalar(path[i].row) - cellSize / 2;
                return originY - wireWidth / 2;
            }).attr("width", wireWidth)
            .attr("height", cellSize + wireWidth);
        }
    }
}

function updateAndRedrawBoardFromGraph(graph) {
    // remove any existing wires
    d3.selectAll(".wire").remove();

    graph.forEachRegion((region) => {
        let chain = region.chain;
        drawWire(chain);
    })

    // set gridCell properties accordingly
    let selection = boardSvg.selectAll("rect").data(board.getFlattenedGrid()).filter((cell) => {
        return cell.isTerminal;
    }).attr("class", "terminal");
}