import { Outlet } from "react-router-dom";
import { ProfileNav } from "./ProfileNav/ProfileNav";
import { SecondLoader, WrapperWithNav } from "../../ui";
import { useGetUserProfileQuery } from "../../../store/user/userAPI";

export const Profile = () => {
    const { data: profileData } = useGetUserProfileQuery(null);

    if (!profileData) {
        return <SecondLoader />;
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
