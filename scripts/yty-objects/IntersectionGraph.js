class IntersectionGraph {
    constructor() {
        this.adjacencyList = new Map();
        this.regions = [];
    }

    addRegion() {
        for (let r of arguments) {
            this.adjacencyList.set(r.getHashableRepresentation(), []);
            this.regions.push(r);
        }
    }

    addEdge(r1, r2, intersectionType, intersectionSubtype) {
        this.adjacencyList.get(r1.getHashableRepresentation()).push([r2, new IntType(intersectionType, intersectionSubtype)]);
    }

    printGraph() {
        // get all the vertices
        let get_keys = this.adjacencyList.keys();

        // iterate over the vertices
        for (let i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            let get_values = this.adjacencyList.get(i);
            let conc = "";

            // iterate over the adjacency list
            // concatenate the values into a string
            for (let j of get_values) {
                let temp = ""
                if (j[0].name !== undefined) {
                    temp += `${j[0].name}: ${j[1].type}`
                    if (j[1].subType !== undefined) {
                        temp += `.${j[1].subType}`;
                    }
                    temp = temp.padEnd(7) + "| ";
                    conc += temp;
                } else {
                    conc += JSON.stringify(j) + " ";
                }
            }

            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }

    forEachRegion(callback) {
        this.regions.forEach((value) => {
            callback(value);
        });
    }

    forEachEdge(callback) {
        this.forEachRegion((region) => {
            let edges = this.adjacencyList.get(region.getHashableRepresentation());
            edges.forEach((edge) => {
                let otherRegion = edge[0];
                let intType = edge[1];
                callback(region, otherRegion, intType);
            })
        })
    }

    classifyRegionRelationships() {
        this.forEachRegion((r1) => {
            this.forEachRegion((r2) => {
                if (r1 !== r2) {
                    let intersectionType = Region.classifyOverlapType(r1, r2);
                    if (intersectionType) {
                        let intersectionSubtype;
                        if (intersectionType === "D") {
                            intersectionSubtype = Region.classifyDiagonalConfiguration(r1, r2);
                        } else if (intersectionType === "A") {
                            intersectionSubtype = Region.classifyAdjacentConfiguration(r1, r2);
                        }
                        this.addEdge(r1, r2, intersectionType, intersectionSubtype);
                    }
                }
            })
        })
    }

    determineWiringDirections() {
        // setting the D1 and some D2 and A Wire directions
        this.forEachEdge((r1, r2, intType) => {
            if (intType.type === "D" && (intType.subType === 1)) {
                Region.determineD1WiringDirection(r1, r2);
            } else if (intType.type === "D" &&
                (intType.subType === 2 || intType.subType === 3 || intType.subType === 5 || intType.subType === 6)) {
                Region.determineD2WiringDirection(r1, r2);
            } else if (intType.type === "A") {
                Region.determineAdjacentWiringDirection(r1, r2);
            }
        });
        // setting the ambiguous D2 Intersections
        this.setAmbiguousD2IntersectionWireDirections();
        // setting the D3 wire directions
        this.forEachEdge((r1, r2, intType) => {
            if (intType.type === "D" && intType.subType === 4) {
                Region.determineD3WiringDirection(r1, r2);
            }
        });

        // setting the rest of the wire directions to be -1
        // these should be routed with hightower's algo
        this.forEachRegion((region) => {
            if (!region.wiringDirection) {
                region.wiringDirection = -1;
            }
        })
    }

    getIntersectionClassification(r1, r2) {
        let edges = this.adjacencyList.get(r1.getHashableRepresentation());
        let retVal;
        edges.forEach((edge) => {
            if (edge[0].getHashableRepresentation() === r2.getHashableRepresentation()) {
                retVal = edge[1];
            }
        });
        if (retVal) return retVal;
        return new IntType();
    }

    static doNetsIntersect(net1, net2) {
        return !!(IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(net1[0], net1[1], net2[0], net2[1]) ||
            IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(net1[0], net1[1], net2[1], net2[2]) ||
            IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(net1[1], net1[2], net2[0], net2[1]) ||
            IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(net1[1], net1[2], net2[1], net2[2]));

    }

    static doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2) {
        if (p1.y === q1.y && p2.y === q2.y) { // both lines are horizontal
            if (p1.y === p2.y) { // if the 4 points are collinear
                return ((Math.min(p2.x, q2.x) < p1.x && p1.x < Math.max(p2.x, q2.x)) ||
                    (Math.min(p2.x, q2.x) < q1.x && q1.x < Math.max(p2.x, q2.x)))
            }
            return false; // if they are not collinear, they cannot overlap
        } else if (p1.x === q1.x && p2.x === q2.x) { // both lines are vertical
            if (p1.x === p2.x) { // if the 4 points are collinear
                return ((Math.min(p2.y, q2.y) < p1.y && p1.y < Math.max(p2.y, q2.y)) ||
                    (Math.min(p2.y, q2.y) < q1.y && q1.y < Math.max(p2.y, q2.y)))
            }
            return false; // if they are not collinear, they cannot overlap
        }
        if (p1.x !== q1.x) { // if l1 is the horizontal line
            // swap l1 and l2
            p2 = [p1, p1 = p2][0]
            q2 = [q1, q1 = q2][0]
        }
        // at this point, l1 is the vertical line and l2 is the horizontal line
        if (Math.min(p2.x, q2.x) <= p1.x && p1.x <= Math.max(p2.x, q2.x)) { // if the vertical line is in bounds of horizontal line
            if (Math.min(p1.y, q1.y) <= p2.y && p2.y <= Math.max(p1.y, q1.y)) { // if the horizontal line is in bounds of vertical line
                return !(p1 === p2 || p1 === q2 || q1 === p2 || q1 === q2);
            }
        }
        return false;
    }

    setAmbiguousD2IntersectionWireDirections() {
        this.forEachEdge((r1, r2, intType) => {
            if (intType.type === "D" &&
                (intType.subType === 2 || intType.subType === 3 || intType.subType === 5 || intType.subType === 6)) {
                if (!r1.wiringDirection && !r2.wiringDirection) {
                    throw new Error("Somehow neither region received a wiring direction");
                } else if (!r1.wiringDirection) {
                    r1.wiringDirection = r1.terminalConfiguration === "standard" ? 2 : 3;
                } else if (!r2.wiringDirection) {
                    r2.wiringDirection = r2.terminalConfiguration === "standard" ? 2 : 3;
                }
            }
        });
    }

    determineAllWirePathsNoHightower() {
        this.forEachRegion((region) => {
            region.chain = region.getWirePathOfGridCells();
        })
    }

    determineAllWirePaths() {
        this.forEachRegion((region) => {
            let edges = this.adjacencyList.get(region.getHashableRepresentation());

            // determining if we can automatically plot this wire
            let isBadType = region.wiringDirection === -1;
            edges.forEach((edge) => {
                if (edge[1].type === "+" || edge[1].type === "O" || edge[1].type === "?") {
                    isBadType = true;
                }
            });

            if (!isBadType) {
                console.log(`region ${region.name} is good`)
                region.chain = region.getWirePathOfGridCells();

                region.chain.forEach((cell) => {
                    cell.isWire = true;
                })
            }
        });

        // bfs all hightower path orders to find one that works
        let regionsToBeRouted = new Set();
        this.forEachRegion((region) => {
            let edges = this.adjacencyList.get(region.getHashableRepresentation());

            // if this edge doesn't intersect anything, just hightower link it
            if (edges.length === 0) {
                regionsToBeRouted.add(region);
            }
            // determining if this is one of the wires that was not auto plotted
            edges.forEach((edge) => {
                if (edge[1].type !== "D" && edge[1] !== "A") {
                    console.log(`using hightower for ${region.name}`);
                    regionsToBeRouted.add(region);
                }
            });
        });

        findWorkingOrder(Array.from(regionsToBeRouted));
    }
}

class IntType {
    constructor(type, subType) {
        this.type = type;
        this.subType = subType;
    }
}

function testGraph1() {
    let graph = new IntersectionGraph();

    let r9 = new Region(5, 3, 6, 6, 9);
    let r8 = new Region(5, 0, 7, 2, 8);
    let r7 = new Region(6, 2, 4, 3, 7);
    let r6 = new Region(3, 2, 6, 4, 6);
    let r5 = new Region(5, 1, 4, 5, 5);

    graph.addRegion(r5);
    graph.addRegion(r6);
    graph.addRegion(r7);
    graph.addRegion(r8);
    graph.addRegion(r9);

    return graph;
}

function testGraph2() {
    let graph = new IntersectionGraph();

    let r1 = new Region(2, 0, 0, 2, 1);
    let r2 = new Region(1, 2, 0, 3, 2);
    let r3 = new Region(0, 5, 2, 7, 3);
    let r4 = new Region(1, 6, 5, 5, 4);
    let r5 = new Region(5, 1, 4, 5, 5);
    let r6 = new Region(3, 2, 6, 4, 6);
    let r7 = new Region(6, 2, 4, 3, 7);
    let r8 = new Region(5, 0, 7, 2, 8);
    let r9 = new Region(5, 3, 6, 6, 9);
    let r0 = new Region(7, 6, 5, 7, 0);

    graph.addRegion(r1, r2, r3, r4, r5, r6, r7, r8, r9, r0);

    return graph;
}

function testGraph3() {
    let graph = new IntersectionGraph();

    let r1 = new Region(2, 0, 0, 2, 1);
    let r2 = new Region(1, 2, 0, 3, 2);
    let r3 = new Region(0, 5, 2, 7, 3);
    let r4 = new Region(1, 6, 5, 5, 4);
    let r5 = new Region(5, 1, 4, 5, 5);
    let r6 = new Region(3, 2, 6, 4, 6);
    let r7 = new Region(6, 2, 4, 3, 7);
    let r8 = new Region(5, 0, 7, 2, 8);
    let r9 = new Region(5, 3, 7, 5, 9);
    let r0 = new Region(7, 6, 5, 7, 0);

    graph.addRegion(r1, r2, r3, r4, r5, r6, r7, r8, r9, r0);

    return graph;
}

function testGraph4() {
    let graph = new IntersectionGraph();

    let r1 = new Region(7, 5, 4, 7, 1);
    let r2 = new Region(6, 6, 4, 4, 2);
    let r3 = new Region(3, 7, 5, 5, 3);
    let r4 = new Region(1, 3, 5, 1, 4);
    let r5 = new Region(0, 0, 2, 2, 5);
    let r6 = new Region(1, 0, 3, 2, 6);
    let r7 = new Region(1, 4, 1, 6, 7);

    graph.addRegion(r7, r1, r2, r3, r4, r5, r6);

    return graph;
}