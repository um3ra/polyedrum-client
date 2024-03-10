import { Outlet } from "react-router-dom";
import { useGetUserProfileQuery } from "../../store/user/userAPI";
import { ProfileNav } from "./ProfileNav/ProfileNav";

import { WrapperWithNav, Loader } from "../ui";

const Profile = () => {
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

export default Profile;
