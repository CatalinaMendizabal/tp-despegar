export default class IResponse {
    statusId: Status | undefined;
    data: any;

    status (number: number): Status{
        this.statusId = new Status(number);
        return this.statusId;
    }

    constructor(data: any){
        this.data = data;
    }
}

class Status {
    status: number | undefined;
    data: any;

    json (data: any): Status{
        this.data = data;
        return this;
    }

    constructor(id: number){
        this.status = id;
    }
}
