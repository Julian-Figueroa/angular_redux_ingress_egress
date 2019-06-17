export class IngressEgress {
    description: string;
    amount: number;
    type: string;
    uid?: string;

    constructor(obj: DataObject) {
        this.amount = obj && obj.amount || null;
        this.description = obj && obj.description || null;
        this.type = obj && obj.type || null;
        // this.uid = obj && obj.uid || null;
    }
}

interface DataObject {
    description: string;
    amount: number;
    type: string;
    uid?: string;
}
