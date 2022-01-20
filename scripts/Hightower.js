function hightower(region) {
    board.wipeHightowerData();
    let t1 = board.getCell(region.t1.x, region.t1.y);
    let t2 = board.getCell(region.t2.x, region.t2.y);
    let current = t1;
    current.weight = 1;

    let queue = []
    addAdjacent(current, queue, t2);

    while (queue.length !== 0) {
        current = queue.shift();

        if (current === t2) {
            return traceback(t1, t2);
        }

        addAdjacent(current, queue, t2);
    }
    return [];
}

function traceback(t1, t2) {
    let chain = [t2];
    let current = t2;
    while (current !== t1) {
        current = getSmallerNeighbor(current);
        chain.push(current);
    }
    return chain;
}

function addAdjacent(current, queue, target) {

    // the neighbor exists and has not been visited, add it
    if ((current.left && current.left.weight === 0 && !current.left.isTerminal && !current.left.isWire) ||
        current.left === target) {
            current.left.weight = current.weight + 1;
            queue.push(current.left);
    }
    if ((current.right && current.right.weight === 0 && !current.right.isTerminal && !current.right.isWire) ||
        current.right === target) {
            current.right.weight = current.weight + 1;
            queue.push(current.right);
    }
    if ((current.up && current.up.weight === 0 && !current.up.isTerminal && !current.up.isWire) ||
        current.up === target) {
            current.up.weight = current.weight + 1;
            queue.push(current.up);
    }
    if ((current.down && current.down.weight === 0 && !current.down.isTerminal && !current.down.isWire) ||
        current.down === target) {
            current.down.weight = current.weight + 1;
            queue.push(current.down);
    }
}

function getSmallerNeighbor(current) {
    if (current.left && current.left.weight < current.weight && current.left.weight !== 0) return current.left;
    if (current.right && current.right.weight < current.weight && current.right.weight !== 0) return current.right;
    if (current.up && current.up.weight < current.weight && current.up.weight !== 0) return current.up;
    if (current.down && current.down.weight < current.weight && current.down.weight !== 0) return current.down;
}

function findWorkingOrder(regionsToAdd) {
    let potential = findPotential(regionsToAdd);
    for (let order of potential) {
        let chainWorks = true;
        let chains = [];

        // try this order
        for (let region of order) {
            let chain = hightower(region);
            chains.push(chain);
            GridCell.setWireData(chain);

            if (chain.length === 0) {
                chainWorks = false;
            }
        }

        if (chainWorks) {
            for (let i = 0; i < order.length; i++) {
                order[i].chain = chains[i];
            }
            return order;
        } else {
            for (let chain of chains) {
                GridCell.wipeWireData(chain);
            }
        }
    }
}

function findPotential(inputArr) {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }
    permute(inputArr)
    return result;
}