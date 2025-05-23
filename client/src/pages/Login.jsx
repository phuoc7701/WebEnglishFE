import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './Login.module.scss';

const Login = () => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (value) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) errors.username = 'Vui lòng nhập tên người dùng EngZone hoặc địa chỉ email.';
    if (!values.password) errors.password = 'Vui lòng nhập mật khẩu.';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoginError('');
      alert('Submit form với username: ' + formValues.username);
      // Ở đây bạn có thể gọi API sau này
    } else {
      setLoginError('Vui lòng điền đầy đủ thông tin.');
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginFormContainer}>
        <img src="" alt="Header" className={styles.headerImage} />

        <h1 className={styles.title}>Đăng nhập vào EngZone</h1>

        {loginError && (
          <div className={`${styles.errorBar} ${styles.visible}`}>
            <ErrorOutlineIcon className={styles.errorIcon} />
            <div className={styles.errorMessage}>{loginError}</div>
          </div>
        )}

        <form className={styles.loginForm} onSubmit={handleSubmit} noValidate>
          {/* Bỏ các nút đăng nhập bên thứ 3 */}

          <div className={`${styles.formGroup} ${formErrors.username ? styles.invalid : ''}`}>
            <label htmlFor="username" className={styles.formLabel}>
              Email hoặc tên người dùng
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

          <div className={`${styles.formGroup} ${formErrors.password ? styles.invalid : ''}`}>
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
            <input type="checkbox" id="rememberMe" className={styles.rememberMeCheckbox} />
            <label htmlFor="rememberMe" className={styles.rememberMeLabel}>
              Hãy nhớ tôi
            </label>
          </div>

          <button type="submit" className={styles.btnPrimary}>
            Đăng nhập
          </button>

          <a href="/forgotpassword" className={styles.forgotPass}>
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
