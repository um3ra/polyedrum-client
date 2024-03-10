import { Outlet } from "react-router-dom";
import { ProfileNav } from "./ProfileNav/ProfileNav";
import { Loader, WrapperWithNav } from "../../ui";
import { useGetUserProfileQuery } from "../../../store/user/userAPI";


export const Profile = () => {
	const { data: profileData } = useGetUserProfileQuery(null);

	if (!profileData) {
		return <Loader />;
	}
	return (
		<WrapperWithNav
			title="Profile"
			mainRender={() => <Outlet context={profileData?.data} />}
			navRender={() => (
				<ProfileNav isAdmin={profileData.data.role === "ADMIN"} />
			)}
		/>
	);
};