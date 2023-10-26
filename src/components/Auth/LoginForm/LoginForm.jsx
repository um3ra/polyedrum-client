import React, {useEffect} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {setMessage, setAuthData} from "../../../store/auth/authSlice";
import {Button, Input} from "../../common";
import styles from '../Auth.module.css';
import {useDispatch} from "react-redux";
import {useLoginMutation} from "../../../store/user/userApi";

const LoginForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit, reset} = useForm({mode: "onChange"});
    const [login, {data: authData, error: authError}] = useLoginMutation();
    const onSubmit = (data) => {
        login({email: data.email, password: data.password});
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
    }, [authData])


    return (
        <div className={`fix-wrapper`}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                <div className={styles.loginFormTitle}>
                    Login
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
                            required: "field is required!",
                        })
                    }} error={errors?.password?.message} type="password" placeholder={"password"}/>
                </div>

                {authError && <span className={'errorMessage'}>invalid email or password</span>}

                <div className={styles.loginFormLinks}>
                    <a href="">Forgotten your password?</a>
                    <Link to={'/register'}>Create account</Link>
                </div>
                <div className={styles.loginFormItem}>
                    <Button>Login</Button>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;