interface IBucketDetails {
	title: string;
	productId: number;
	price: number;
	amount: number;
	sum: number;
	imageURL: string;
}

export interface ICart {
	amountProducts: number;
	sum: number;
	bucketDetails: Array<IBucketDetails>;
}
