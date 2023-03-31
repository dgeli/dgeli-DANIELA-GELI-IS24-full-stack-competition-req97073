export class ProductModel {
    productId!: number;
    productName!: string;
    productOwnerName!: string;
    Developers: String[] = [];
    scrumMasterName!: string;
    startDate!: string;
    methodology!: string;

    constructor() {
    }
}
