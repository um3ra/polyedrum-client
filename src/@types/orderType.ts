import { IProductsItem } from "./productType";

enum OrderStatusEnum {
	NEW,
	CANCELED,
	APPROVED,
	CLOSED,
	PAID
}

interface IOrderDetailsItem {
	id: number;
	amount: number;
	sum: number;
	product: IProductsItem;
}

export interface IOrder {
	id: number;
	dateOfCreation: string;
	dateOfChange?: string;
	sum: number;
	status: OrderStatusEnum;
	orderDetails: IOrderDetailsItem[];
}
