class Terminal {
    x;
    y;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    valueOf() {
        return this.x * 1000 + this.y;
    }
}