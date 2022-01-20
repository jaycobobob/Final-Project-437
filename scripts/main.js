SIZE = d3.select("#board-container-inner").node().offsetWidth;

d3.select("#board-container-inner").append("svg").attr("id", "board");
let boardSvg = d3.select("#board");

let board = new Board();
let graph = new IntersectionGraph();

let boardScalar = d3.scaleLinear()
    .domain([0, Board.boardSize])
    .rangeRound([0, SIZE]);

// initial creation of the grid
let data = boardSvg.selectAll("rect").data(board.getFlattenedGrid());
data.enter().append("g").append("rect")
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
    }).attr("class", "grid-cell")
    .on("click", gridCellClickHandler);

