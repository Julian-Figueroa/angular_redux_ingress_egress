export class User {
    public name: string;
    public email: string;
    public uid: string;

    constructor(obj: objData) {
        this.name = obj && obj.name || null;
        this.email = obj && obj.email || null;
        this.uid = obj && obj.uid || null;
    }
}


interface objData {
    uid: string;
    email: string;
    name: string;
}