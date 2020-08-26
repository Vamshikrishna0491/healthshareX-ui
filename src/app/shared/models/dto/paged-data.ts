import { PageInfo } from "./page-info";
import { SortInfo } from "./sort-info";

export class PagedData<T> {

    constructor(public data: T[], 
                public pageInfo: PageInfo, 
                public sortInfo: SortInfo) {}
    
}