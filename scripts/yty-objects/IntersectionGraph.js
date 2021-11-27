class IntersectionGraph {
    constructor() {
        this.nodes = {};
        this.edges = {};
    }

    addRegion(r) {
        this.nodes[r] = r;
    }

    contains(r) {
        return !!this.nodes[r];
    }

    removeNode(r) {
        if (this.contains(r)) {
            delete this.nodes[r];
        }
    }

    hasEdge(fromRegion, toRegion) {
        for (let key in this.edges) {
            let searchOne = this.edges[key][0] === fromRegion && this.edges[key][1] === toRegion;
            let searchTwo = this.edges[key][1] === fromRegion && this.edges[key][0] === toRegion;
            if (searchOne || searchTwo) {
                return true;
            }
        }
        return false;
    }

    addEdge(fromRegion, toRegion, classification) {
        this.edges[fromRegion] = [fromRegion, toRegion, classification];
    }

    removeEdge(fromRegion, toRegion) {
        if (this.hasEdge(fromRegion, toRegion)) {
            delete this.edges[fromRegion];
        }
    }

    forEachNode(callback) {
        for (let node in this.nodes) {
            callback(node);
        }
    }

    populateEdges() {
        for (let r1 in this.nodes) {
            for (let r2 in this.nodes) {
                if (r1 !== r2) {
                    let intersectionType = Region.classifyOverlapType(r1, r2);
                    if (intersectionType === "D") {
                        let intersectionSubtype = Region.classifyDiagonalConfiguration(r1, r2);
                        this.addEdge(r1, r2, new IntersectionType("D", intersectionSubtype));
                    } else if (intersectionType === "A") {
                        let intersectionSubtype = Region.classifyAdjacentConfiguration(r1, r2);
                        this.addEdge(r1, r2, new IntersectionType("A", intersectionSubtype));
                    } else if (intersectionType === "+") {
                        this.addEdge(r1, r2, new IntersectionType("+"));
                    } else if (intersectionType === "O") {
                        this.addEdge(r1, r2, new IntersectionType("O"));
                    }
                }
            }
        }
    }
}

class IntersectionType {
    constructor(type, subType) {
        this.type = type;
        this.subType = subType;
    }
}
