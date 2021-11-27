class Region {
    t1;
    t2;
    #t1ByY;
    #t2ByY;
    #terminalConfiguration;

    constructor(p1, p2, p3, p4) {
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
        this.#terminalConfiguration = this.t1 === this.#t1ByY ? "standard" : "inverse";
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

    static classifyOverlapType(r1, r2) {
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
         */
        if ((verticesInR1Count === 2 && verticesInR2Count === 0)
            || verticesInR1Count === 0 && verticesInR2Count === 2) {
            return "A";
        }

        /*
            +-Intersection:  An intersection is +-type if no vertices of either region are
            contained in the other
         */
        if (verticesInR1Count === 0 && verticesInR2Count === 0) {
            return "+";
        }

        /*
            O-Intersection:  An intersection is O-type if all four vertices of one region are
            contained in the other
         */
        if (verticesInR1Count === 4 || verticesInR2Count === 4) {
            return "O";
        }

        throw new Error("Could not classify intersection type");
    }

    static classifyDiagonalConfiguration(r1, r2) {
        let leftRegion = null;
        let rightRegion = null;

        if (r1.t1.x < r2.t1.x) {
            leftRegion = r1;
            rightRegion = r2;
        } else {
            leftRegion = r2;
            rightRegion = r1;
        }

        let topRegion = null;
        let bottomRegion = null;

        if (r1.#t1ByY.y < r2.#t1ByY.y) {
            topRegion = r1;
            bottomRegion = r2;
        } else {
            topRegion = r2;
            bottomRegion = r1;
        }

        if (leftRegion == null || rightRegion == null || topRegion == null || bottomRegion == null) {
            throw new Error("Could not classify directional regions");
        }

        if (topRegion === leftRegion) {
            if (rightRegion.containsPoint(leftRegion.t2) && leftRegion.containsPoint(rightRegion.t1)) {
                if (leftRegion.t2.y === rightRegion.t1.y) {
                    return 8;
                } else {
                    return 1;
                }
            } else if (rightRegion.containsPoint(leftRegion.t2)) {
                return 2;
            } else if (leftRegion.containsPoint(rightRegion.t1)) {
                return 3;
            } else {
                return 4;
            }
        } else if (topRegion === rightRegion) {
            if (rightRegion.containsPoint(leftRegion.t2) && leftRegion.containsPoint(rightRegion.t1)) {
                if (leftRegion.t2.y === rightRegion.t1.y) {
                    return 9;
                } else {
                    return 7;
                }
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

    static classifyAdjacentConfiguration(r1, r2) {
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

        if (mainRegion == null || adjacentRegion == null) {
            throw new Error("Could not classify main and adjacent regions");
        }

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

        if (mainRegion.#terminalConfiguration === "standard") {
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
}