import styles from "./Profile.module.css";
import { useOutletContext } from "react-router-dom";
import { useGetUserOrdersQuery } from "../../store/order/orderAPI";
import { IProfile, IUser } from "../../@types/userType";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../ui";
import { useUpdateUserDataMutation } from "../../store/user/userAPI";

const MyAccount = () => {
	const profileData = useOutletContext<IProfile>();
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm<IUser>();
	const { data: ordersData } = useGetUserOrdersQuery(null);

	const [updateProfile, { error: profileError }] =
		useUpdateUserDataMutation();

	const updateUserData: SubmitHandler<IUser> = (formData) => {
		updateProfile({ id: profileData.id, body: formData });
	};

	return (
		<div className={styles.userProfileContent}>
			<h2 className={styles.title}>Personal information</h2>
			<form
				className={styles.myAccountForm}
				onSubmit={handleSubmit(updateUserData)}
			>
				<div>
					<Input
						label="First name(s):"
						className={styles.transparentField}
						defaultValue={profileData?.firstName || ""}
						{...register("firstName", {
							required: "field is required!",
							maxLength: {
								value: 25,
								message: `maximum field length 25 characters`
							}
						})}
					/>
				</div>

				<div>
					<Input
						label="Last name:"
						className={styles.transparentField}
						defaultValue={profileData?.lastName}
						{...register("lastName", {
							required: "field is required!",
							maxLength: {
								value: 25,
								message: `maximum field length 25 characters`
							}
						})}
					/>
				</div>
				<div>
					<Input
						className={styles.transparentField}
						label="Role:"
						defaultValue={profileData?.role.toLowerCase()}
						disabled
					/>
				</div>

				<div>
					<div>
						<Input
							className={styles.transparentField}
							label="Email:"
							defaultValue={profileData?.email}
							disabled
						/>
					</div>
				</div>

				<div>
					<div>
						<Input
							className={styles.transparentField}
							label="Total orders count:"
							defaultValue={ordersData?.data.length}
							disabled
						/>
					</div>
				</div>
				<h4>Change Password</h4>
				<div>
					<Input
						className={styles.transparentField}
						label="New password"
						{...register("password", {
							minLength: {
								value: 5,
								message:
									"Password is too short (minimum is 5 characters)."
							}
						})}
						error={errors?.password?.message}
						type="password"
					/>
				</div>

				<div>
					<Input
						label="Matching password"
						className={styles.transparentField}
						{...register("matchingPassword")}
						error={errors?.password?.message}
						type="password"
					/>
				</div>
				{profileError && "data" in profileError && (
					<div>
						<span className={"errorMessage"}>
							{profileError.data.message}
						</span>
					</div>
				)}

				<Button>Update</Button>
			</form>
		</div>
	);
};

export default MyAccount;
