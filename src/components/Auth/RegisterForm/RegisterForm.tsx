import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { setAuthData } from "../../../store/auth/authSlice";
import { Button, Input } from "../../common";
import styles from "../Auth.module.css";
import { useRegisterMutation } from "../../../store/user/userAPI";
import { useDispatch } from "react-redux";
import { IUser } from "../../../@types/userType";

const RegisterForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<IUser>({ mode: "onChange" });
    const [userRegister, { data: authData, error: authError }] =
        useRegisterMutation();

    const onSubmit: SubmitHandler<IUser> = data => {
        userRegister({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        });
    };

    useEffect(() => {
        if (authData?.data?.token) {
            dispatch(setAuthData(authData.data.token));
            reset();
            navigate("/");
        }
    }, [authData, reset, navigate]);

    return (
        <div className={`fix-wrapper`}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className={styles.loginForm}
            >
                <div className={styles.loginFormTitle}>Register</div>

                <div className={styles.loginFormItem}>
                    <Input
                        register={{
                            ...register("firstName", {
                                required: "field is required!",
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`,
                                },
                            }),
                        }}
                        error={errors?.firstName?.message}
                        placeholder={"firstname"}
                    />
                </div>

                <div className={styles.loginFormItem}>
                    <Input
                        register={{
                            ...register("lastName", {
                                required: "field is required!",
                                maxLength: {
                                    value: 25,
                                    message: `maximum field length 25 characters`,
                                },
                            }),
                        }}
                        error={errors?.lastName?.message}
                        placeholder={"lastname"}
                    />
                </div>

                <div className={styles.loginFormItem}>
                    <Input
                        register={{
                            ...register("email", {
                                required: "field is required!",
                                pattern: {
                                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                                    message: "Email is invalid!",
                                },
                            }),
                        }}
                        error={errors?.email?.message}
                        placeholder={"email"}
                        type="email"
                    />
                </div>
                <div className={styles.loginFormItem}>
                    <Input
                        register={{
                            ...register("password", {
                                required: "field is required!",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Password is too short (minimum is 5 characters).",
                                },
                            }),
                        }}
                        error={errors?.password?.message}
                        type="password"
                        placeholder={"password"}
                    />
                </div>

                {authError && "data" in authError && (
                    <span className={"errorMessage"}>
                        {authError.data.message}
                    </span>
                )}

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
