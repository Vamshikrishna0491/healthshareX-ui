
export class QueryFilter  {

    attributeName: string;
    attributeValue: any;
    attributeType: string;
    filterCondition: string;
    constructor(attributeName: string, attributeValue: any, attributeType: string, filterCondition: string) {
        this.attributeName = attributeName;
        this.attributeValue = attributeValue;
        this.attributeType = attributeType;
        this.filterCondition = filterCondition;
    }
}

