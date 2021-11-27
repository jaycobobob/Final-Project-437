SIZE = 600;

d3.select("#board-container").append("svg").attr("id", "board");
let boardSvg = d3.select("#board");

let board = new Board();

let boardScalar = d3.scaleLinear()
    .domain([0, Board.boardSize])
    .rangeRound([0, SIZE]);

// initial creation of the grid
let data = boardSvg.selectAll("rect").data(board.getFlattenedGrid(), (d) => {
    return [d.row, d.column];
});
data.enter().append("rect")
    .on("click", function(d, i) {
        console.log(d, i);
    })
    .attr("width", (d,i) => {
        return SIZE / Board.boardSize;
    }).attr("height", (d,i) => {
        return SIZE / Board.boardSize;
    }).attr("x", (d,i) => {
        return boardScalar(d.column);
    }).attr("y", (d,i) => {
        return boardScalar(d.row);
    }).attr("class", "grid-cell");

function recreateGrid() {
    Board.boardSize = parseInt(d3.select("#board-size-input").property("value"));
    console.log(`set new boardsize to ${Board.boardSize}`);

    boardScalar = d3.scaleLinear()
        .domain([0, Board.boardSize])
        .rangeRound([0, SIZE]);

    board = new Board();
    let transSpeed = 500;

    // shrink all existing grid cells before doing fresh databind
    let selection = boardSvg.selectAll("rect");
    selection.transition().duration(transSpeed)
        .attr("width", 0)
        .attr("height", 0)
        .end()
        .then(() => {
            // begin the new databind
            selection = boardSvg.selectAll("rect").data(board.getFlattenedGrid(), (d) => {
                return [d.row, d.column];
            });
            // remove stale cells
            selection.exit().remove();
            // add new cells, if necessary
            selection.enter().append("rect")
                .attr("class", "grid-cell")
                .on("click", function(d, i) {
                    console.log(d, i);
                })

                // get all cells in position
                .merge(selection).transition().duration(0)
                .attr("x", (d,i) => {
                    return boardScalar(d.column);
                }).attr("y", (d,i) => {
                return boardScalar(d.row);
                })

                // grow all cells
                .transition().duration(transSpeed)
                .attr("width", (d,i) => {
                    return SIZE / Board.boardSize;
                }).attr("height", (d,i) => {
                return SIZE / Board.boardSize;
                });
        })
}