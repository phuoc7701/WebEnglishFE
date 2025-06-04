import React, { useState } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.scss";
import { jwtDecode } from "jwt-decode";
import logo from './images/logo.png';

const Login = ({ toggleView }) => {

  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const backendUrl = "http://localhost:8080/engzone";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (value) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username)
      errors.username =
        "Vui lòng nhập tên người dùng EngZone hoặc địa chỉ email.";
    if (!values.password) errors.password = "Vui lòng nhập mật khẩu.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoginError("");

      try {
        const response = await axios.post(
          `${backendUrl}/auth/token`,
          {
            username: formValues.username, // dùng 'username'
            password: formValues.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        const data = response.data.result || response.data;

        // Lưu token vào localStorage
        if (data.token) {
          localStorage.setItem("token", data.token);

          const decoded = jwtDecode(data.token);
          if (data.token) {
            localStorage.setItem("userId", decoded.jti);
          }

          // Thêm đoạn này để lưu user cho navbar dùng
          const userInitials = formValues.username.slice(0, 2).toUpperCase();

          localStorage.setItem(
            "user",
            JSON.stringify({
              username: formValues.username,
              initials: userInitials,
            })
          );

          localStorage.setItem(
            "roleAdmin",
            decoded.scope.includes("ROLE_ADMIN")
          );

          if (decoded.scope.includes("ROLE_ADMIN")) {
            toggleView(true);

            navigate("/admin");
          } else {
            toggleView(false);
            navigate("/");
          }
        }
      } catch (error) {
        if (error.response) {
          const message =
            error.response.data?.message ||
            "Tài khoản hoặc mật khẩu không đúng.";
          setLoginError(message);
        } else {
          setLoginError("Không thể kết nối đến máy chủ.");
        }
        console.error(error);
      }
    } else {
      setLoginError("Vui lòng điền đầy đủ thông tin.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <img src={logo} alt="Header" className={styles.headerImage} />

        <h1 className={styles.title}>ĐĂNG NHẬP ENGZONE</h1>

        {loginError && (
          <div className={`${styles.errorBar} ${styles.visible}`}>
            <ErrorOutlineIcon className={styles.errorIcon} />
            <div className={styles.errorMessage}>{loginError}</div>
          </div>
        )}

        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          <div
            className={`${styles.formGroup} ${
              formErrors.username ? styles.invalid : ""
            }`}
          >
            <label htmlFor="username" className={styles.formLabel}>
              Tên người dùng
            </label>
            <input
              value={formValues.username}
              onChange={handleChange}
              type="text"
              name="username"
              className={styles.formControl}
              id="username"
              placeholder="Email hoặc tên người dùng"
            />
            {formErrors.username && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.username}</div>
              </div>
            )}
          </div>

          <div
            className={`${styles.formGroup} ${
              formErrors.password ? styles.invalid : ""
            }`}
          >
            <label htmlFor="password" className={styles.formLabel}>
              Mật khẩu
            </label>
            <input
              value={formValues.password}
              onChange={handleChange}
              type="password"
              name="password"
              className={styles.formControl}
              id="password"
              placeholder="Mật khẩu"
            />
            {formErrors.password && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.password}</div>
              </div>
            )}
          </div>

          <div className={styles.rememberMeContainer}>
            <input
              type="checkbox"
              id="rememberMe"
              className={styles.rememberMeCheckbox}
            />
            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
              Hãy nhớ tôi
            </label>
          </div>

          <button type="submit" className={styles.btnPrimary}>
            Đăng nhập
          </button>

          <a href="/forgotpass" className={styles.forgotPass}>
            Quên mật khẩu của bạn?
          </a>
        </form>

        <div className={styles.separatorLine}></div>

        <p className={styles.signupText}>
          Bạn chưa có tài khoản?
          <a href="/register" className={styles.register}>
            Đăng ký EngZone
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
