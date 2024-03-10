import { useGetUserOrdersQuery } from "../../store/order/orderAPI";
import styles from "./Profile.module.css";

const OrdersHistory = () => {
	const { data: orderData } = useGetUserOrdersQuery(null);

	if (!orderData) {
		return <div>Loading</div>;
	}

	return (
		<div className={styles.userProfileContent}>
			<h2 className={styles.title}>Orders History</h2>

			{!orderData.data.length && <h3>You have no orders yet</h3>}

			<ul className={styles.userProfileContentOrders}>
				{orderData.data.map((order) => {
					return (
						<li key={order.id}>
							<ul className={styles.ordersItem}>
								<li>
									<strong>Id: </strong>
									{order.id}
								</li>
								<li>
									<strong>Status: </strong>
									{order.status}
								</li>
								<li>
									<strong>Date: </strong>
									{order.dateOfCreation}
								</li>
								<li>
									<strong>Sum: </strong>
									{order.sum} $
								</li>
							</ul>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default OrdersHistory;
