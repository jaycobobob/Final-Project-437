class Region {
    t1;
    t2;
    terminalConfiguration;
    wiringDirection;
    chain = [];

    #t1ByY;
    #t2ByY;

    constructor(p1, p2, p3, p4, name) {
        if (p3 !== undefined && p4 !== undefined) {
            p1 = new Terminal(p1, p2);
            p2 = new Terminal(p3, p4);
        }
        if (p1.x < p2.x) {
            this.t1 = p1;
            this.t2 = p2;
        } else {
            this.t1 = p2;
            this.t2 = p1;
        }
        if (p1.y < p2.y) {
            this.#t1ByY = p1;
            this.#t2ByY = p2;
        } else {
            this.#t1ByY = p2;
            this.#t2ByY = p1;
        }
        this.terminalConfiguration = this.t1 === this.#t1ByY ? "standard" : "inverse";
        this.name = name;

        board.getCell(p1.x, p1.y).isTerminal = true;
        board.getCell(p2.x, p2.y).isTerminal = true;
    }

    containsPoint(p) {
        let xContained = this.t1.x <= p.x && p.x <= this.t2.x;
        let yContained = false;

        yContained = this.#t1ByY.y <= p.y && p.y <= this.#t2ByY.y;
        return xContained && yContained;
    }

    overlapsRegion(r) {
        return this.containsPoint(r.t1) || this.containsPoint(r.t2);
    }

    containsRegion(r) {
        return this.containsPoint(r.t1) && this.containsPoint(r.t2);
    }

    getFourVertexBoundary() {
        return [
            this.t1,
            this.t2,
            new Terminal(this.t1.x, this.t2.y),
            new Terminal(this.t2.x, this.t1.y)
        ]
    }

    countOwnOverlappingVerticesInOtherRegion(other) {
        let verticesInOtherCount = 0;
        let thisVertices = this.getFourVertexBoundary();
        thisVertices.forEach((v) => {
            if (other.containsPoint(v)) {
                verticesInOtherCount += 1;
            }
        });
        return verticesInOtherCount;
    }

    countOwnTerminalsInOtherRegion(other) {
        let containsT1 = other.containsPoint(this.t1);
        let containsT2 = other.containsPoint(this.t2);

        return + containsT1 + + containsT2;
    }

    static classifyOverlapType(r1, r2) {
        // determining if the two regions overlap
        if (r1.t1.x > r2.t2.x || r2.t1.x > r1.t2.x) { // if one region is to left of other
            return undefined;
        } else if (r1.#t1ByY.y > r2.#t2ByY.y || r2.#t1ByY.y > r1.#t2ByY.y) { // if one region is below the other
            return undefined;
        }

        // counting the number of vertices of r1 that exist in r2
        let verticesInR2Count = r1.countOwnOverlappingVerticesInOtherRegion(r2);

        // counting the number of vertices of r2 that exist in r1
        let verticesInR1Count = r2.countOwnOverlappingVerticesInOtherRegion(r1);

        /*
            D-Intersection:  An intersection is D-type if for either region, only one vertex is
            contained in the other region
         */
        if (verticesInR1Count === 1 || verticesInR2Count === 1) {
            return "D";
        }

        /*
            A-Intersection: An intersection is A-type if exactly two vertices of the first region
            are contained in the second, and no vertices of the second are contained in the first
            Additionally, the terminals of of the regions must not share x or y coords
         */
        if (((verticesInR1Count === 2 && verticesInR2Count === 0) ||
            (verticesInR1Count === 0 && verticesInR2Count === 2)) &&
            (r1.t1.x !== r2.t1.x &&
                r1.t2.x !== r2.t2.x &&
                r1.#t1ByY.y !== r2.#t1ByY.y &&
                r1.#t2ByY.y !== r2.#t2ByY.y
            )) {
            return "A";
        }

        /*
            +-Intersection:  An intersection is +-type if no vertices of either region are
            contained in the other
         */
        if (verticesInR1Count === 0 || verticesInR2Count === 0) {
            return "+";
        }

        /*
            O-Intersection:  An intersection is O-type if all four vertices of one region are
            contained in the other
         */
        if (verticesInR1Count === 4 || verticesInR2Count === 4) {
            return "O";
        }

        return "?";
    }

    static classifyDiagonalConfiguration(r1, r2) {
        let leftRegion = null;
        let rightRegion = null;

        if (r1.t1.x < r2.t1.x) {
            leftRegion = r1;
            rightRegion = r2;
        } else if (r1.t1.x > r2.t1.x) {
            leftRegion = r2;
            rightRegion = r1;
        } else {
            if (r1.t2.x < r2.t2.x) {
                leftRegion = r1;
                rightRegion = r2;
            } else {
                leftRegion = r2;
                rightRegion = r1;
            }
        }

        let topRegion = null;
        let bottomRegion = null;

        if (r1.#t1ByY.y < r2.#t1ByY.y) {
            topRegion = r1;
            bottomRegion = r2;
        } else if (r1.#t1ByY.y > r2.#t1ByY.y){
            topRegion = r2;
            bottomRegion = r1;
        } else {
            if (r1.#t2ByY.y < r2.#t2ByY.y) {
                topRegion = r1;
                bottomRegion = r2;
            } else {
                topRegion = r2;
                bottomRegion = r1;
            }
        }

        if (leftRegion == null || rightRegion == null || topRegion == null || bottomRegion == null) {
            throw new Error("Could not classify directional regions");
        }

        if (topRegion === leftRegion) {
            if (rightRegion.containsPoint(leftRegion.t2) && leftRegion.containsPoint(rightRegion.t1)) {
                return 1;
            } else if (rightRegion.containsPoint(leftRegion.t2)) {
                return 2;
            } else if (leftRegion.containsPoint(rightRegion.t1)) {
                return 3;
            } else {
                return 4;
            }
        } else if (topRegion === rightRegion) {
            if (rightRegion.containsPoint(leftRegion.t2) && leftRegion.containsPoint(rightRegion.t1)) {
                return 1;
            } else if (rightRegion.containsPoint(leftRegion.t2)) {
                return 6;
            } else if (leftRegion.containsPoint(rightRegion.t1)) {
                return 5;
            } else {
                return 4;
            }
        }

        throw new Error("Could not determine spread");
    }

    static determineD1WiringDirection(r1, r2) {
        let r1Vertices = {
            tl: (r1.terminalConfiguration === "standard") ? r1.t1 : new Terminal(r1.t1.x, r1.t2.y),
            br: (r1.terminalConfiguration === "standard") ? r1.t2 : new Terminal(r1.t2.x, r1.t1.y),
            tr: (r1.terminalConfiguration === "standard") ? new Terminal(r1.t2.x, r1.t1.y) : r1.t2,
            bl: (r1.terminalConfiguration === "standard") ? new Terminal(r1.t1.x, r1.t2.y) : r1.t1,
        }

        let r2Vertices = {
            tl: (r2.terminalConfiguration === "standard") ? r2.t1 : new Terminal(r2.t1.x, r2.t2.y),
            br: (r2.terminalConfiguration === "standard") ? r2.t2 : new Terminal(r2.t2.x, r2.t1.y),
            tr: (r2.terminalConfiguration === "standard") ? new Terminal(r2.t2.x, r2.t1.y) : r2.t2,
            bl: (r2.terminalConfiguration === "standard") ? new Terminal(r2.t1.x, r2.t2.y) : r2.t1,
        }

        if (r1.terminalConfiguration === "standard" && r2.terminalConfiguration === "standard") {
            // case 1
            if (!IntersectionGraph.doNetsIntersect([r1Vertices.tl, r1Vertices.tr, r1Vertices.br],
                [r2Vertices.tl, r2Vertices.bl, r2Vertices.br])) {
                r1.wiringDirection = 1;
                r2.wiringDirection = 2;
                return;
            }
            // case 3
            else if (!IntersectionGraph.doNetsIntersect([r1Vertices.br, r1Vertices.bl, r1Vertices.tl],
                [r2Vertices.br, r2Vertices.tr, r2Vertices.tl])) {
                r1.wiringDirection = 2;
                r2.wiringDirection = 1;
                return;
            }
        }

        if (r1.terminalConfiguration === "inverse" && r2.terminalConfiguration === "inverse") {
            // case 2
            if (!IntersectionGraph.doNetsIntersect([r1Vertices.tr, r1Vertices.br, r1Vertices.bl],
                [r2Vertices.tr, r2Vertices.tl, r2Vertices.bl])) {
                r1.wiringDirection = 4;
                r2.wiringDirection = 3;
                return;
            }
            // case 4
            else if (!IntersectionGraph.doNetsIntersect([r1Vertices.bl, r1Vertices.tl, r1Vertices.tr],
                [r2Vertices.bl, r2Vertices.br, r2Vertices.tr])) {
                r1.wiringDirection = 3;
                r2.wiringDirection = 4;
                return;
            }
        }
        throw new Error("Could not determine diagonal wiring directions");
    }

    static determineD2WiringDirection(r1, r2) {
        // counting the number of vertices of r1 that exist in r2
        let r1TerminalsInR2Count = r1.countOwnTerminalsInOtherRegion(r2);

        // counting the number of vertices of r2 that exist in r1
        let r2TerminalsInR1Count = r2.countOwnTerminalsInOtherRegion(r1);

        if (r1TerminalsInR2Count === 0 && r2TerminalsInR1Count === 0) {
            throw new Error("Could not determine D2 wiring direction");
        }

        let ambiguousRegion = r1;
        let knowableRegion = r2;
        if (r2TerminalsInR1Count === 1) {
            knowableRegion = [ambiguousRegion, ambiguousRegion = knowableRegion][0];
        }

        if (ambiguousRegion.terminalConfiguration === "standard") {
            knowableRegion.wiringDirection = knowableRegion.t1.x < ambiguousRegion.t1.x ? 3 : 4;
        } else {
            knowableRegion.wiringDirection = knowableRegion.t1.x < ambiguousRegion.t1.x ? 2 : 1;
        }
    }

    static determineD3WiringDirection(r1, r2) {
        let topRegion = r1.#t1ByY.y <= r2.#t1ByY.y ? r1 : r2;
        let bottomRegion = topRegion === r1 ? r2 : r1;

        // finding all invalid wiring configurations
        if (topRegion.terminalConfiguration === "standard" && bottomRegion.terminalConfiguration === "standard") {
            if (topRegion.wiringDirection === 2 && bottomRegion.wiringDirection === 1) {
                return 1;
            }
        } else if (topRegion.terminalConfiguration === "inverse" && bottomRegion.terminalConfiguration === "inverse") {
            if (topRegion.wiringDirection === 4 && bottomRegion.wiringDirection === 3) {
                return 1;
            }
        }

        // if top wire dir is defined and bottom is not, match the two
        if (topRegion.wiringDirection && !bottomRegion.wiringDirection) {
            bottomRegion.wiringDirection = topRegion.wiringDirection;
        }

        // if bottom wire dir is defined and top is not, match the two
        else if (bottomRegion.wiringDirection && !topRegion.wiringDirection) {
            topRegion.wiringDirection = bottomRegion.wiringDirection;
        }

        // if neither are set, arbitrarily set them to any configuration
        else if (!topRegion.wiringDirection && !bottomRegion.wiringDirection) {
            topRegion.wiringDirection = bottomRegion.wiringDirection = 1;
        }
    }

    static classifyAdjacentConfiguration(r1, r2) {
        let classification = Region.determineAdjacentIntersectionMainAndAdjacent(r1, r2);
        let mainRegion = classification[0];
        let adjacentRegion = classification[1];

        let overlapDirection = "none";
        for (let x = mainRegion.t1.x; x <= mainRegion.t2.x; x++) {
            let tUpper = new Terminal(x, mainRegion.#t1ByY.y);
            let tLower = new Terminal(x, mainRegion.#t2ByY.y);

            if (adjacentRegion.containsPoint(tUpper)) {
                overlapDirection = "up";
                break;
            }
            if (adjacentRegion.containsPoint(tLower)) {
                overlapDirection = "down";
                break;
            }
        }

        for (let y = mainRegion.#t1ByY.y; y <= mainRegion.#t2ByY.y; y++) {
            let tLeft = new Terminal(mainRegion.t1.x, y);
            let tRight = new Terminal(mainRegion.t2.x, y);

            if (adjacentRegion.containsPoint(tLeft)) {
                overlapDirection = "left";
                break;
            }
            if (adjacentRegion.containsPoint(tRight)) {
                overlapDirection = "right";
                break;
            }
        }

        if (mainRegion.terminalConfiguration === "standard") {
            if (overlapDirection === "up" || overlapDirection === "right") {
                return 1;
            } else if (overlapDirection === "down" || overlapDirection === "left") {
                return 2;
            }
        } else {
            if (overlapDirection === "up" || overlapDirection === "left") {
                return 3;
            } else if (overlapDirection === "down" || overlapDirection === "right") {
                return 4;
            }
        }
        throw new Error("Could not classify adjacent configuration");
    }

    static determineAdjacentWiringDirection(r1, r2) {
        let mainRegion = Region.determineAdjacentIntersectionMainAndAdjacent(r1, r2)[0];

        let config = Region.classifyAdjacentConfiguration(r1, r2);
        let wiringDirections = {1: 2, 2: 1, 3: 4, 4: 3};
        mainRegion.wiringDirection = wiringDirections[config];
    }

    static determineAdjacentIntersectionMainAndAdjacent(r1, r2) {
        let isR1TerminalInR2 = r2.containsPoint(r1.t1) || r2.containsPoint(r1.t2);
        let isR2TerminalInR1 = r1.containsPoint(r2.t1) || r1.containsPoint(r2.t2);

        let mainRegion = null;
        let adjacentRegion = null;

        if (isR2TerminalInR1 && !isR1TerminalInR2) {
            mainRegion = r1;
            adjacentRegion = r2;
        } else if (isR1TerminalInR2 && !isR2TerminalInR1) {
            mainRegion = r2;
            adjacentRegion = r1;
        }
        return [mainRegion, adjacentRegion];
    }

    getWirePathOfGridCells() {
        let path = [];
        let vertices = {
            tl: new Terminal(this.t1.x, this.#t1ByY.y),
            tr: new Terminal(this.t2.x, this.#t1ByY.y),
            bl: new Terminal(this.t1.x, this.#t2ByY.y),
            br: new Terminal(this.t2.x, this.#t2ByY.y),
        }

        if (this.wiringDirection === 1) {
            for (let x = vertices.tl.x; x < vertices.tr.x; x++) {
                path.push(board.getCell(x, vertices.tl.y));
                            }
            for (let y = vertices.tr.y; y <= vertices.br.y; y++) {
                path.push(board.getCell(vertices.tr.x, y));
            }
        } else if (this.wiringDirection === 2) {
            for (let y = vertices.tl.y; y < vertices.bl.y; y++) {
                path.push(board.getCell(vertices.tl.x, y));
            }
            for (let x = vertices.bl.x; x <= vertices.br.x; x++) {
                path.push(board.getCell(x, vertices.bl.y));
            }
        } else if (this.wiringDirection === 3) {
            for (let y = vertices.bl.y; y > vertices.tl.y; y--) {
                path.push(board.getCell(vertices.bl.x, y));
            }
            for (let x = vertices.tl.x; x <= vertices.tr.x; x++) {
                path.push(board.getCell(x, vertices.tl.y))
            }
        } else if (this.wiringDirection === 4) {
            for (let x = vertices.bl.x; x < vertices.br.x; x++) {
                path.push(board.getCell(x, vertices.bl.y));
            }
            for (let y = vertices.br.y; y >= vertices.tr.y; y--) {
                path.push(board.getCell(vertices.br.x, y));
            }
        }
        return path;
    }

    getHashableRepresentation() {
        return `(${this.t1.x}, ${this.t1.y}) (${this.t2.x}, ${this.t2.y})`
    }
}