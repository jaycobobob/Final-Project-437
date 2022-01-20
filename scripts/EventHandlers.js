let isCustomMode = false;
let newRegion = [];
let allowDiffusion = false;

function wipeButtonHandler() {
    recreateGrid();
}

function refreshButtonHandler() {
    console.log("Refreshing");
    // wiping hightower chains
    graph.forEachRegion((region) => {
        GridCell.wipeWireData(region.chain);
        region.chain = [];
    });
    graph.classifyRegionRelationships();
    graph.determineWiringDirections();
    graph.determineAllWirePaths();

    updateAndRedrawBoardFromGraph(graph);
}

function preset1Handler() {
    graph = testGraph3();
    graph.classifyRegionRelationships();
    graph.determineWiringDirections();
    graph.determineAllWirePaths();

    updateAndRedrawBoardFromGraph(graph);
}

function preset2Handler() {
    graph = testGraph4();
    graph.forEachRegion((region) => {
        region.chain = hightower(region);
        GridCell.setWireData(region.chain);
    });

    updateAndRedrawBoardFromGraph(graph);
}

function customTerminalHandler() {
    isCustomMode = !isCustomMode;
    let button = d3.select("#custom-button").html(isCustomMode ? "Leave Custom Mode" : "Enter Custom Mode");
    newRegion = []; // wipe the existing wires to add whenever we enter or leave custom mode
}

function gridCellClickHandler(event, gridcell) {
    if (!isCustomMode) return; // only process these events if we are in custom mode

    newRegion.push(gridcell);

    if (newRegion.length === 2) {
        addNewRegion();
        newRegion = [];
    }
}

function addNewRegion() {
    let region = new Region(newRegion[0].column, newRegion[0].row, newRegion[1].column, newRegion[1].row);
    graph.addRegion(region);
    console.log(graph);

    region.chain = hightower(region);
    if (region.chain.length === 0) {
        alert("Cannot connect these terminals.  Consider refreshing.")
    }
    GridCell.setWireData(region.chain);

    updateAndRedrawBoardFromGraph(graph);
}