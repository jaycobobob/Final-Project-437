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
            return result === 7;
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
            return result === 7;
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

    function testGraphCreation1() {

    }
]

let allPassed = true;
tests.forEach((foo) => {
    let retVal = foo();
    if (!retVal) {
        console.log(`${foo.name} failed`);
        allPassed = false;
    }
});

if (allPassed) {
    console.log("All test cases passed");
}