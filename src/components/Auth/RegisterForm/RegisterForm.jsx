import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {setAuthData, setMessage} from "../../../store/auth/authSlice";
import {Button, Input} from "../../common";
import styles from "../Auth.module.css";
import {useRegisterMutation} from "../../../store/user/userApi";
import {useDispatch} from "react-redux";

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onChange"});
    const [userRegister, {data: authData, error: authError}] = useRegisterMutation();


    const onSubmit = (data) => {
        userRegister({
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password,
        });
    }

    useEffect(() => {
        if (authData?.data?.token){
            dispatch(setAuthData(authData.data.token));
            reset();
            navigate("/");
        }
        return () => {
            dispatch(setMessage(null))
        }
    }, [authData, reset, navigate])

    return (
        <div className={`fix-wrapper`}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <div className={styles.loginFormTitle}>
                    Register
                </div>

                <div className={styles.loginFormItem}>
                    <Input register={{
                        ...register('firstname',
                            {
                                required: 'field is required!',
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`
                                }
                            },
                        )
                    }} error={errors?.firstname?.message} placeholder={"firstname"}/>
                </div>

                <div className={styles.loginFormItem}>
                    <Input register={{
                        ...register('lastname',
                            {
                                required: 'field is required!',
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`
                                }
                            },
                        )
                    }} error={errors?.lastname?.message} placeholder={"lastname"}/>
                </div>

                <div className={styles.loginFormItem}>
                    <Input register={{
                        ...register('email',
                            {
                                required: 'field is required!',
                                pattern: {
                                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                    message: 'Email is invalid!'
                                }
                            },
                        )
                    }} error={errors?.email?.message} placeholder={"email"}/>
                </div>
                <div className={styles.loginFormItem}>
                    <Input register={{
                        ...register('password', {
                            required: "field is required!", minLength: {
                                value: 5,
                                message: "Password is too short (minimum is 5 characters).",
                            },
                        })
                    }} error={errors?.password?.message} type="password" placeholder={"password"}/>
                </div>

                {authError?.data?.message && <span className={'errorMessage'}>{authError.data.message}</span>}

                <div className={styles.loginFormLinks}>
                    <Link to={"/login"}>A have an account</Link>
                </div>
                <div className={styles.loginFormItem}>
                    <Button>Register</Button>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;