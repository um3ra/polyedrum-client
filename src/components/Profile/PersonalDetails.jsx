import React from 'react';
import {Input, Button} from '../common'
import {useForm} from "react-hook-form";
import {useUpdateUserDataMutation} from "../../store/user/userApi";
import styles from './Profile.module.css'
import {useOutletContext} from "react-router-dom";

const PersonalDetails = () => {
    const {register, formState: {errors}, handleSubmit} = useForm();
    const profileData = useOutletContext();
    const [updateProfile, {error: profileError}] = useUpdateUserDataMutation();

    const updateUserData = (formData) => {
        updateProfile({id: profileData.id, ...formData});
    }


    return (
        <div className={styles.userProfileContent}>
            <div className={styles.userProfileContentTitle}>Your personal details</div>
            <form onSubmit={handleSubmit(updateUserData)} className={styles.userProfileContentForm}>
                <div>
                    <div>First name(s)</div>
                    <Input defaultValue={profileData?.firstName} register={{
                        ...register("firstName",
                            {
                                required: 'field is required!',
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`
                                },
                            })
                    }}/>
                </div>
                <div>
                    <div>Surname</div>
                    <Input defaultValue={profileData?.lastName} register={{
                        ...register("lastName",
                            {
                                required: 'field is required!',
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`
                                },
                            }
                        )
                    }}/>
                </div>
                <div>
                    <div>E-mail address</div>

                    <div>
                        {profileData?.email}
                    </div>
                </div>

                <h4>Change Password</h4>

                <div>
                    <div>New password</div>
                    <Input register={{
                        ...register('password', {
                            minLength: {
                                value: 5,
                                message: "Password is too short (minimum is 5 characters).",
                            },
                        })
                    }} error={errors?.password?.message} type="password"/>
                </div>

                <div>
                    <div>Matching password</div>
                    <Input register={{
                        ...register('matchingPassword')
                    }} error={errors?.password?.message} type="password"/>
                </div>
                {profileError?.data?.message&& <div>{profileError.data.message}</div>}
                <Button>Update</Button>
            </form>
        </div>
    );
};

export default PersonalDetails;