export class SortInfo {

    prop: string |undefined;
    dir: string |undefined;

    constructor(prop?: string, dir?: string){
        this.prop = prop;
        this.dir = dir;
    }
}
