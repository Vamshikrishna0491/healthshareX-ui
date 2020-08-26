
export class PageRequest {

    pageIndex: number;
    pageSize: number;

    constructor(pageIndex: number = 0, pageSize: number = 5) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
    }
}

