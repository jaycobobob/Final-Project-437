tests = [
    function testRegionPointAssignment() {
        let p1 = new Terminal(6, 6);
        let p2 = new Terminal(2, 2);

        let r = new Region(p1, p2);

        return r.t1 === p2 && r.t2 === p1;
    },


    function testPointContainment1() {
        let p = new Terminal(4, 4);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === true;
    },
    function testPointContainment2() {
        let p = new Terminal(2, 4);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === true;
    },
    function testPointContainment3() {
        let p = new Terminal(1, 4);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === false;
    },
    function testPointContainment4() {
        let p = new Terminal(7, 4);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === false;
    },
    function testPointContainment5() {
        let p = new Terminal(4, 1);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === false;
    },
    function testPointContainment6() {
        let p = new Terminal(1, 4);
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r = new Region(p1, p2);

        return r.containsPoint(p) === false;
    },


    function testRegionOverlap1() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(4, 4);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.overlapsRegion(r2) === true;
    },
    function testRegionOverlap2() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(6, 6);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.overlapsRegion(r2) === true;
    },
    function testRegionOverlap3() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(3, 3);
        let p4 = new Terminal(4, 4);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.overlapsRegion(r2) === true;
    },
    function testRegionOverlap4() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(7, 7);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.overlapsRegion(r2) === false;
    },

    function testRegionContains1() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(4, 4);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.containsRegion(r2) === false;
    },
    function testRegionContains2() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(6, 6);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.containsRegion(r2) === false;
    },
    function testRegionContains3() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(3, 3);
        let p4 = new Terminal(4, 4);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.containsRegion(r2) === true;
    },
    function testRegionContains4() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);
        let p3 = new Terminal(7, 7);
        let p4 = new Terminal(8, 8);

        let r1 = new Region(p1, p2);
        let r2 = new Region(p3, p4);

        return r1.containsRegion(r2) === false;
    },

    function testGetFourVertexBounds() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(4, 4);

        let p3 = new Terminal(1, 4);
        let p4 = new Terminal(4, 1);

        let r = new Region(p1, p2);
        let actual = new Set(r.getFourVertexBoundary().map((terminal) => {
            return [terminal.x, terminal.y];
        }));

        let expected = new Set([p1, p2, p3, p4].map((terminal) => {
            return [terminal.x, terminal.y];
        }));

        actual.forEach((terminal) => {
            if (!expected.has(terminal)) {
                return false;
            }
        });
        return true;
    },

    // A intersection
    function testCountContainedVertices1() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(3, 1);
        let p4 = new Terminal(5, 4);

        let r2 = new Region(p3, p4);
        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 2;
    },
    // A intersection
    function testCountContainedVertices2() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(3, 3);
        let p4 = new Terminal(1, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 2;
    },
    // A intersection
    function testCountContainedVertices3() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(3, 5);
        let p4 = new Terminal(5, 7);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 2;
    },
    // A intersection
    function testCountContainedVertices4() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(6, 6);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(3, 5);
        let p4 = new Terminal(7, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 2;
    },
    // D intersection
    function testCountContainedVertices5() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(4, 4);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(3, 3);
        let p4 = new Terminal(5, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 1;
    },
    // D intersection
    function testCountContainedVertices6() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(4, 4);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(2, 4);
        let p4 = new Terminal(5, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 1;
    },
    // D intersection
    function testCountContainedVertices7() {
        let p1 = new Terminal(2, 2);
        let p2 = new Terminal(4, 4);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(2, 4);
        let p4 = new Terminal(3, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 2;
    },
    // + intersection
    function testCountContainedVertices8() {
        let p1 = new Terminal(3, 1);
        let p2 = new Terminal(5, 7);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(1, 3);
        let p4 = new Terminal(7, 5);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 0;
    },
    // O intersection
    function testCountContainedVertices9() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(7, 7);

        let r1 = new Region(p1, p2);

        let p3 = new Terminal(1, 1);
        let p4 = new Terminal(4, 4);

        let r2 = new Region(p3, p4);

        let result = r2.countOwnOverlappingVerticesInOtherRegion(r1);
        return result === 4;
    },

    function testDiagonalClassConfig1() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(3, 3, 8, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig2() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(6, 1, 8, 4);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 4;
        }
    },
    function testDiagonalClassConfig3() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(3, 3, 1, 1);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig4() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(1, 5, 5, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 4;
        }
    },
    function testDiagonalClassConfig5() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 4, 8, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 3;
        }
    },
    function testDiagonalClassConfig6() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(5, 1, 8, 4);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 6;
        }
    },
    function testDiagonalClassConfig7() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(1, 1, 4, 4);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 2;
        }
    },
    function testDiagonalClassConfig8() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(1, 5, 4, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 5;
        }
    },
    function testDiagonalClassConfig9() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(8, 3, 3, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 2;
        }
    },
    function testDiagonalClassConfig10() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(8, 1, 6, 4);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 5;
        }
    },
    function testDiagonalClassConfig11() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(1, 3, 3, 1);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 3;
        }
    },
    function testDiagonalClassConfig12() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(5, 5, 1, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 6;
        }
    },
    function testDiagonalClassConfig13() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(8, 3, 3, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 4;
        }
    },
    function testDiagonalClassConfig14() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(8, 1, 6, 4);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig15() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(1, 3, 3, 1);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 4;
        }
    },
    function testDiagonalClassConfig16() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(5, 5, 1, 8);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig17() {
        let r1 = new Region(0, 0, 4, 4);
        let r2 = new Region(3, 4, 6, 6);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig18() {
        let r1 = new Region(0, 8, 4, 4);
        let r2 = new Region(3, 4, 6, 1);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testDiagonalClassConfig19() {
        let r1 = new Region(2, 0, 0, 2, 1);
        let r2 = new Region(0, 3, 1, 1, 2);

        if (Region.classifyOverlapType(r1, r2) === "D" && Region.classifyOverlapType(r2, r1) === "D") {
            let result = Region.classifyDiagonalConfiguration(r1, r2);
            return result === 1;
        }
    },

    function testAdjacentClassConfig1() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 3, 8, 5);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testAdjacentClassConfig2() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 3, 3, 1);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 1;
        }
    },
    function testAdjacentClassConfig3() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 4, 1, 5);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 2;
        }
    },
    function testAdjacentClassConfig4() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 4, 3, 8);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 2;
        }
    },
    function testAdjacentClassConfig5() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 3, 8, 5);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 4;
        }
    },
    function testAdjacentClassConfig6() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 3, 3, 1);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 3;
        }
    },
    function testAdjacentClassConfig7() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 4, 1, 5);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 3;
        }
    },
    function testAdjacentClassConfig8() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 4, 3, 8);

        if (Region.classifyOverlapType(r1, r2) === "A" && Region.classifyOverlapType(r2, r1) === "A") {
            let result = Region.classifyAdjacentConfiguration(r1, r2);
            return result === 4;
        }
    },

    function testMultipleClassification1() {
        let graph = testGraph1();
        graph.classifyRegionRelationships();

        let i56 = graph.getIntersectionClassification(graph.regions[0], graph.regions[1]);
        let i57 = graph.getIntersectionClassification(graph.regions[0], graph.regions[2]);
        let i58 = graph.getIntersectionClassification(graph.regions[0], graph.regions[3]);
        let i59 = graph.getIntersectionClassification(graph.regions[0], graph.regions[4]);

        let i65 = graph.getIntersectionClassification(graph.regions[1], graph.regions[0]);
        let i67 = graph.getIntersectionClassification(graph.regions[1], graph.regions[2]);
        let i68 = graph.getIntersectionClassification(graph.regions[1], graph.regions[3]);
        let i69 = graph.getIntersectionClassification(graph.regions[1], graph.regions[4]);

        let i75 = graph.getIntersectionClassification(graph.regions[2], graph.regions[0]);
        let i76 = graph.getIntersectionClassification(graph.regions[2], graph.regions[1]);
        let i78 = graph.getIntersectionClassification(graph.regions[2], graph.regions[3]);
        let i79 = graph.getIntersectionClassification(graph.regions[2], graph.regions[4]);

        let i85 = graph.getIntersectionClassification(graph.regions[3], graph.regions[0]);
        let i86 = graph.getIntersectionClassification(graph.regions[3], graph.regions[1]);
        let i87 = graph.getIntersectionClassification(graph.regions[3], graph.regions[2]);
        let i89 = graph.getIntersectionClassification(graph.regions[3], graph.regions[4]);

        let flag = false;

        if (i56.type !== "+") {
            console.log("i56");
            console.log(i56);
            flag = true;
        }
        if (i57.type !== "+") {
            console.log("i57");
            console.log(i57);
            flag = true;
        }
        if (i58.type !== "D" || i58.subType !== 6) {
            console.log("i58");
            console.log(i58);
            flag = true;
        }
        if (i59.type !== "D" || i59.subType !== 3) {
            console.log("i59");
            console.log(i59);
            flag = true;
        }
        if (i65.type !== "+") {
            console.log("i65");
            console.log(i65);
            flag = true;
        }
        if (i67.type !== "D" || i67.subType !== 5) {
            console.log("i67");
            console.log(i67);
            flag = true;
        }
        if (i68.type !== "D" || i68.subType !== 4) {
            console.log("i68");
            console.log(i68);
            flag = true;
        }
        if (i69.type !== "D" || i69.subType !== 1) {
            console.log("i69");
            console.log(i69);
            flag = true;
        }
        if (i75.type !== "+") {
            console.log("i75");
            console.log(i75);
            flag = true;
        }if (i76.type !== "D" || i76.subType !== 5) {
            console.log("i76");
            console.log(i76);
            flag = true;
        }
        if (i78.type !== "D" || i78.subType !== 6) {
            console.log("i78");
            console.log(i78);
            flag = true;
        }
        if (i79.type !== "D" || i79.subType !== 3) {
            console.log("i79");
            console.log(i79);
            flag = true;
        }
        if (i85.type !== "D" || i85.subType !== 6) {
            console.log("i85");
            console.log(i85);
            flag = true;
        }
        if (i86.type !== "D" || i86.subType !== 4) {
            console.log("i86");
            console.log(i86);
            flag = true;
        }
        if (i87.type !== "D" || i87.subType !== 6) {
            console.log("i87");
            console.log(i87);
            flag = true;
        }
        if (i89.type !== undefined) {
            console.log("i89")
            console.log(i89);
            flag = true;
        }
        return !flag;
    },

    function testMultipleClassification2() {
        let graph = testGraph2();
        graph.classifyRegionRelationships();
        let expected = [
            {
                r1: 1,
                r2: 2,
                type: "D",
                subType: 1
            },
            {
                r1: 3,
                r2: 4,
                type: "D",
                subType: 5
            },
            {
                r1: 4,
                r2: 5,
                type: "D",
                subType: 1
            },
            {
                r1: 4,
                r2: 9,
                type: "D",
                subType: 6
            },
            {
                r1: 4,
                r2: 10,
                type: "D",
                subType: 4
            },
            {
                r1: 5,
                r2: 6,
                type: "+",
                subType: undefined
            },
            {
                r1: 5,
                r2: 7,
                type: "+",
                subType: undefined
            },
            {
                r1: 5,
                r2: 8,
                type: "D",
                subType: 6
            },
            {
                r1: 5,
                r2: 9,
                type: "D",
                subType: 3
            },
            {
                r1: 5,
                r2: 8,
                type: "D",
                subType: 6
            },
            {
                r1: 6,
                r2: 7,
                type: "D",
                subType: 5
            },
            {
                r1: 6,
                r2: 8,
                type: "D",
                subType: 4
            },
            {
                r1: 6,
                r2: 9,
                type: "D",
                subType: 1
            },
            {
                r1: 7,
                r2: 8,
                type: "D",
                subType: 6
            },
            {
                r1: 7,
                r2: 9,
                type: "D",
                subType: 3
            },
            {
                r1: 9,
                r2: 10,
                type: "D",
                subType: 2
            },
        ];
        let flag = true;

        for (let test of expected) {
            let r1 = graph.regions[test.r1 - 1];
            let r2 = graph.regions[test.r2 - 1];

            let classification = graph.getIntersectionClassification(r1, r2);
            let inverseClassification = graph.getIntersectionClassification(r2, r1);

            if (classification.type !== test.type ||
                inverseClassification.type !== test.type ||
                classification.subType !== test.subType ||
                inverseClassification.subType !== test.subType) {
                    console.log(r1, r2, classification, inverseClassification);
                    flag = false;
            }
        }
        return flag;
    },

    function testDoLinesIntersect1() {
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(6, 2);
        let p2 = new Terminal(4, 0);
        let q2 = new Terminal(4, 8);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect2() {
        let p2 = new Terminal(2, 2);
        let q2 = new Terminal(6, 2);
        let p1 = new Terminal(4, 0);
        let q1 = new Terminal(4, 8);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect3() {
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(6, 2);
        let p2 = new Terminal(0, 0);
        let q2 = new Terminal(0, 8);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect4() {
        let p1 = new Terminal(2, 0);
        let q1 = new Terminal(6, 0);
        let p2 = new Terminal(4, 1);
        let q2 = new Terminal(4, 8);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect5() {
        let p1 = new Terminal(0, 2);
        let q1 = new Terminal(6, 2);
        let p2 = new Terminal(0, 0);
        let q2 = new Terminal(0, 8);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect6() {
        let p1 = new Terminal(2, 0);
        let q1 = new Terminal(6, 0);
        let p2 = new Terminal(4, 0);
        let q2 = new Terminal(4, 8);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect7() {
        // L touching tips lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(2, 8);
        let q2 = new Terminal(8, 2);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p1, q2);
    },
    function testDoLinesIntersect8() {
        // vertical non intersecting lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(2, 6);
        let p2 = new Terminal(4, 2);
        let q2 = new Terminal(4, 6);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect9() {
        // vertical touching tips lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(2, 4);
        let q2 = new Terminal(2, 6);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, q1, q2);
    },
    function testDoLinesIntersect10() {
        // vertical overlapping lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(2, 5);
        let p2 = new Terminal(2, 4);
        let q2 = new Terminal(2, 6);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect11() {
        // horizontal non intersecting lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(6, 2);
        let p2 = new Terminal(2, 4);
        let q2 = new Terminal(6, 4);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },
    function testDoLinesIntersect12() {
        // horizontal touching tips lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(4, 2);
        let q2 = new Terminal(6, 2);

        return !IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, q1, q2);
    },
    function testDoLinesIntersect13() {
        // horizontal overlapping lines
        let p1 = new Terminal(2, 2);
        let q1 = new Terminal(5, 2);
        let p2 = new Terminal(4, 2);
        let q2 = new Terminal(6, 2);

        return IntersectionGraph.doLinesIntersectNotAtMutualEndpoints(p1, q1, p2, q2);
    },

    function testDoNetsIntersect1() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(7, 1);
        let p3 = new Terminal(7, 7);

        let q2 = new Terminal(1, 7);

        return !IntersectionGraph.doNetsIntersect([p1, p2, p3], [p1, q2, p3]);
    },
    function testDoNetsIntersect2() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(7, 1);
        let p3 = new Terminal(7, 7);

        let q1 = new Terminal(0, 0);
        let q2 = new Terminal(8, 0);
        let q3 = new Terminal(8, 8);

        return !IntersectionGraph.doNetsIntersect([p1, p2, p3], [q1, q2, q3]);
    },
    function testDoNetsIntersect3() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(1, 7);
        let p3 = new Terminal(7, 7);

        let q2 = new Terminal(7, 1);
        let q3 = new Terminal(7, 8);

        return IntersectionGraph.doNetsIntersect([p1, p2, p3], [p1, q2, q3]);
    },
    function testDoNetsIntersect4() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(1, 7);
        let p3 = new Terminal(7, 7);

        let q1 = new Terminal(0, 2);
        let q2 = new Terminal(6, 2);
        let q3 = new Terminal(6, 6);

        return IntersectionGraph.doNetsIntersect([p1, p2, p3], [q1, q2, q3]);
    },
    function testDoNetsIntersect5() {
        let p1 = new Terminal(1, 1);
        let p2 = new Terminal(1, 7);
        let p3 = new Terminal(7, 7);

        let q1 = new Terminal(3, 3);
        let q2 = new Terminal(5, 3);
        let q3 = new Terminal(5, 5);

        return !IntersectionGraph.doNetsIntersect([p1, p2, p3], [q1, q2, q3]);
    },
    function testDoNetsIntersect6() {
        let p1 = new Terminal(0, 8);
        let p2 = new Terminal(4, 8);
        let p3 = new Terminal(4, 3);

        let q1 = new Terminal(4, 4);
        let q2 = new Terminal(4, 0);
        let q3 = new Terminal(8, 0);

        return IntersectionGraph.doNetsIntersect([p1, p2, p3], [q1, q2, q3]);
    },
    function testDoNetsIntersect7() {
        let p1 = new Terminal(4, 4);
        let p2 = new Terminal(4, 8);
        let p3 = new Terminal(0, 8);

        let q1 = new Terminal(8, 0);
        let q2 = new Terminal(4, 0);
        let q3 = new Terminal(4, 5);

        return IntersectionGraph.doNetsIntersect([p1, p2, p3], [q1, q2, q3]);
    },

    function testD1WireDirectionClassification1() {
        let r1 = new Region(0, 0, 4, 4, 1);
        let r2 = new Region(3, 3, 8, 8, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 2 && r2.wiringDirection === 1) ||
            (r1.wiringDirection === 1 && r2.wiringDirection === 2);
    },
    function testD1WireDirectionClassification2() {
        let r1 = new Region(0, 0, 4, 4, 1);
        let r2 = new Region(4, 3, 8, 8, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 2 && r2.wiringDirection === 1);
    },
    function testD1WireDirectionClassification3() {
        let r1 = new Region(0, 0, 4, 4, 1);
        let r2 = new Region(3, 4, 8, 8, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 1 && r2.wiringDirection === 2);
    },
    function testD1WireDirectionClassification4() {
        let r1 = new Region(0, 8, 4, 4, 1);
        let r2 = new Region(3, 5, 8 ,0, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 3 && r2.wiringDirection === 4) ||
            (r1.wiringDirection === 4 && r2.wiringDirection === 3);
    },
    function testD1WireDirectionClassification5() {
        let r1 = new Region(0, 8, 4, 4, 1);
        let r2 = new Region(4, 5, 8 ,0, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 3 && r2.wiringDirection === 4);
    },
    function testD1WireDirectionClassification6() {
        let r1 = new Region(0, 8, 4, 4, 1);
        let r2 = new Region(3, 4, 8 ,0, 2);

        Region.determineD1WiringDirection(r1, r2);

        return (r1.wiringDirection === 4 && r2.wiringDirection === 3);
    },

    function testAdjacentWireDirectionClassification1() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 3, 8, 5);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 2;
    },
    function testAdjacentWireDirectionClassification2() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 3, 3, 1);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 2;
    },
    function testAdjacentWireDirectionClassification3() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 4, 1, 5);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 1;
    },
    function testAdjacentWireDirectionClassification4() {
        let r1 = new Region(2, 2, 6, 6);
        let r2 = new Region(4, 4, 3, 8);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 1;
    },
    function testAdjacentWireDirectionClassification5() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 3, 8, 5);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 3;
    },
    function testAdjacentWireDirectionClassification6() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 3, 3, 1);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 4;
    },
    function testAdjacentWireDirectionClassification7() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 4, 1, 5);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 4;
    },
    function testAdjacentWireDirectionClassification8() {
        let r1 = new Region(6, 2, 2, 6);
        let r2 = new Region(4, 4, 3, 8);

        Region.determineAdjacentWiringDirection(r1, r2);

        return r1.wiringDirection === 3;
    },

    function testD2WireDirectionClassification1() {
        let r1 = new Region(0, 0, 4, 4, 1);
        let r2 = new Region(4, 8, 8, 4, 2);

        Region.determineD2WiringDirection(r1, r2);
        return !r1.wiringDirection && r2.wiringDirection === 4;
    },

    function testD2WireDirectionClassification2() {
        let r1 = new Region(4, 4, 8, 8, 1);
        let r2 = new Region(0, 4, 4, 0, 2);

        Region.determineD2WiringDirection(r1, r2);
        return !r1.wiringDirection && r2.wiringDirection === 3;
    },

    function testD2WireDirectionClassification3() {
        let r1 = new Region(0, 8, 4, 4, 1);
        let r2 = new Region(4, 0, 8, 4, 2);

        Region.determineD2WiringDirection(r1, r2);
        return !r1.wiringDirection && r2.wiringDirection === 1;
    },

    function testD2WireDirectionClassification4() {
        let r1 = new Region(4, 4, 8, 0, 1);
        let r2 = new Region(0, 4, 4, 8, 2);

        Region.determineD2WiringDirection(r1, r2);
        return !r1.wiringDirection && r2.wiringDirection === 2;
    },

    function testD3WireDirectionDetectBadConfiguration1() {
        let r1 = new Region(0, 4, 4, 0, 1);
        r1.wiringDirection = 4;
        let r2 = new Region(4, 8, 8, 4, 2);
        r2.wiringDirection = 3;

        return Region.determineD3WiringDirection(r1, r2) === 1;
    },
    function testD3WireDirectionDetectBadConfiguration2() {
        let r1 = new Region(0, 4, 4, 8, 1);
        r1.wiringDirection = 1;
        let r2 = new Region(4, 0, 8, 4, 2);
        r2.wiringDirection = 2;

        return Region.determineD3WiringDirection(r1, r2) === 1;
    },
    function testD3WireDirectionDetectBadConfiguration3() {
        let r1 = new Region(0, 4, 4, 0, 1);
        r1.wiringDirection = 4;
        let r2 = new Region(4, 8, 8, 4, 2);
        r2.wiringDirection = 3;

        return Region.determineD3WiringDirection(r2, r1) === 1;
    },
    function testD3WireDirectionDetectBadConfiguration4() {
        let r1 = new Region(0, 4, 4, 8, 1);
        r1.wiringDirection = 1;
        let r2 = new Region(4, 0, 8, 4, 2);
        r2.wiringDirection = 2;

        return Region.determineD3WiringDirection(r2, r1) === 1;
    },

    function testD3WireDirectionClassification1() {
        let r1 = new Region(0, 4, 4, 0, 1);
        r1.wiringDirection = 3;
        let r2 = new Region(4, 8, 8, 4, 2);

        Region.determineD3WiringDirection(r1, r2);
        return r1.wiringDirection === 3 && r2.wiringDirection === 3;
    },
    function testD3WireDirectionClassification2() {
        let r1 = new Region(0, 4, 4, 0, 1);
        let r2 = new Region(4, 8, 8, 4, 2);
        r2.wiringDirection = 4;

        Region.determineD3WiringDirection(r1, r2);
        return r1.wiringDirection === 4 && r2.wiringDirection === 4;
    },
    function testD3WireDirectionClassification3() {
        let r1 = new Region(0, 4, 4, 8, 1);
        r1.wiringDirection = 1;
        let r2 = new Region(4, 0, 8, 4, 2);

        Region.determineD3WiringDirection(r1, r2);
        return r1.wiringDirection === 1 && r2.wiringDirection === 1;
    },
    function testD3WireDirectionClassification4() {
        let r1 = new Region(0, 4, 4, 8, 1);
        let r2 = new Region(4, 0, 8, 4, 2);
        r2.wiringDirection = 2;

        Region.determineD3WiringDirection(r1, r2);
        return r1.wiringDirection === 2 && r2.wiringDirection === 2;
    },

    function testGetWirePath1() {
        let r = new Region(0, 0, 3, 3);
        r.wiringDirection = 1;

        let actual = r.getWirePathOfGridCells(board);
        let expected = [
            board.getCell(0, 0),
            board.getCell(1, 0),
            board.getCell(2, 0),
            board.getCell(3, 0),
            board.getCell(3, 1),
            board.getCell(3, 2),
            board.getCell(3, 3),
        ]
        return actual.length === expected.length && actual.every((val, index) => val === expected[index]);
    },
    function testGetWirePath2() {
        let r = new Region(0, 0, 3, 3);
        r.wiringDirection = 2;

        let actual = r.getWirePathOfGridCells(board);
        let expected = [
            board.getCell(0, 0),
            board.getCell(0, 1),
            board.getCell(0, 2),
            board.getCell(0, 3),
            board.getCell(1, 3),
            board.getCell(2, 3),
            board.getCell(3, 3),
        ]
        return actual.length === expected.length && actual.every((val, index) => val === expected[index]);
    },
    function testGetWirePath3() {
        let r = new Region(0, 0, 3, 3);
        r.wiringDirection = 3;

        let actual = r.getWirePathOfGridCells(board);
        let expected = [
            board.getCell(0, 3),
            board.getCell(0, 2),
            board.getCell(0, 1),
            board.getCell(0, 0),
            board.getCell(1, 0),
            board.getCell(2, 0),
            board.getCell(3, 0),
        ]
        return actual.length === expected.length && actual.every((val, index) => val === expected[index]);
    },
    function testGetWirePath4() {
        let r = new Region(0, 0, 3, 3);
        r.wiringDirection = 4;

        let actual = r.getWirePathOfGridCells(board);
        let expected = [
            board.getCell(0, 3),
            board.getCell(1, 3),
            board.getCell(2, 3),
            board.getCell(3, 3),
            board.getCell(3, 2),
            board.getCell(3, 1),
            board.getCell(3, 0),
        ]
        return actual.length === expected.length && actual.every((val, index) => val === expected[index]);
    },

    function testDetermineAllWiringDirections1() {
        let graph = testGraph3();
        graph.classifyRegionRelationships();
        graph.determineWiringDirections();
        let expectedWiringDirections = {
            1: 3,
            2: 4,
            3: 2,
            4: 4,
            5: 3,
            6: 2,
            7: 3,
            8: 1,
            9: 1,
            10: 4
        };

        for (let regionNumber of Object.keys(expectedWiringDirections)) {
            if (graph.regions[regionNumber - 1].wiringDirection !== expectedWiringDirections[regionNumber]) {
                console.log(graph.regions[regionNumber - 1], expectedWiringDirections[regionNumber])
                return false;
            }
        }
        return true;
    },

    function testHightower() {
        board = new Board();
        let r = new Region(2, 2, 7, 7);
        let path = hightower(r);
        console.log(path);
    }
]

let allPassed = true;
tests.forEach((foo) => {
    let retVal = foo();
    if (!retVal && foo.name !== "playground") {
        console.log(`${foo.name} failed`);
        allPassed = false;
    }
});

if (allPassed) {
    console.log("All test cases passed");
}