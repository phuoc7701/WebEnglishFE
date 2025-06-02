import React, { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './Register.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './images/logo.png';

const Register = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    username: '',
    fullname: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const backendUrl = 'http://localhost:8080/engzone';

  const [formErrors, setFormErrors] = useState({});
  const [registerError, setRegisterError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (value) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.email) errors.email = 'Vui lòng nhập địa chỉ email.';
    if (!values.username) errors.username = 'Vui lòng nhập tên người dùng.';
    if (!values.fullname) errors.fullname = 'Vui lòng nhập Họ và tên.';
    if (!values.password) errors.password = 'Vui lòng nhập mật khẩu.';
    if (!values.confirmPassword) errors.confirmPassword = 'Vui lòng nhập lại mật khẩu.';
    if (values.password && values.confirmPassword && values.password !== values.confirmPassword)
      errors.confirmPassword = 'Mật khẩu nhập lại không khớp.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setRegisterError('');
      // Ở đây có thể gọi API đăng ký

      const response = await axios.post(`${backendUrl}/users`, {  
        username: formValues.username,
        fullname: formValues.fullname,
        email: formValues.email,
        password: formValues.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      navigate('/login');


    } else {
      setRegisterError('Vui lòng điền đầy đủ và chính xác thông tin.');
    }
  };

  const RequiredMark = () => <span style={{ color: 'red' }}> *</span>;

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerFormContainer}>
        <img src={logo} alt="Header" className={styles.headerImage} />

        <h1 className={styles.title}>ĐĂNG KÝ ĐỂ HỌC CÙNG ENGZONE</h1>

        {registerError && (
          <div className={`${styles.errorBar} ${styles.visible}`}>
            <ErrorOutlineIcon className={styles.errorIcon} />
            <div className={styles.errorMessage}>{registerError}</div>
          </div>
        )}

        <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>

          <div className={`${styles.formGroup} ${formErrors.email ? styles.invalid : ''}`}>
            <label htmlFor="email" className={styles.formLabel}>
              Địa chỉ email<RequiredMark />
            </label>
            <input
              value={formValues.email}
              onChange={handleChange}
              type="email"
              name="email"
              className={styles.formControl}
              id="email"
              placeholder="axbycz@gmail.com"
            />
            {formErrors.email && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.email}</div>
              </div>
            )}
          </div>

          <div className={`${styles.formGroup} ${formErrors.username ? styles.invalid : ''}`}>
            <label htmlFor="username" className={styles.formLabel}>
              Tên người dùng<RequiredMark />
            </label>
            <input
              value={formValues.username}
              onChange={handleChange}
              type="text"
              name="username"
              className={styles.formControl}
              id="username"
              placeholder="Nhập tên hiển thị"
            />
            {formErrors.username && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.username}</div>
              </div>
            )}
          </div>

          <div className={`${styles.formGroup} ${formErrors.fullname ? styles.invalid : ''}`}>
            <label htmlFor="fullname" className={styles.formLabel}>
              Họ và tên
            </label>
            <input
              value={formValues.fullname}
              onChange={handleChange}
              type="text"
              name="fullname"
              className={styles.formControl}
              id="fullname"
              placeholder="Nhập họ và tên"
            />
          </div>

          <div className={`${styles.formGroup} ${formErrors.password ? styles.invalid : ''}`}>
            <label htmlFor="password" className={styles.formLabel}>
              Mật khẩu<RequiredMark />
            </label>
            <input
              value={formValues.password}
              onChange={handleChange}
              type="password"
              name="password"
              className={styles.formControl}
              id="password"
              placeholder="Nhập mật khẩu"
            />
            {formErrors.password && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.password}</div>
              </div>
            )}
          </div>

          <div className={`${styles.formGroup} ${formErrors.confirmPassword ? styles.invalid : ''}`}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              Nhập lại mật khẩu<RequiredMark />
            </label>
            <input
              value={formValues.confirmPassword}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              className={styles.formControl}
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
            />
            {formErrors.confirmPassword && (
              <div className={styles.errorContainer}>
                <ErrorOutlineIcon className={styles.errorIcon} />
                <div className={styles.errorMessage}>{formErrors.confirmPassword}</div>
              </div>
            )}
          </div>

          <button type="submit" className={styles.btnPrimary}>
            Đăng ký
          </button>

        </form>

        <div className={styles.separatorLine}></div>

        <p className={styles.signupText}>
          Bạn đã có tài khoản?
          <a href="/login" className={styles.register}>
            Đăng nhập tại đây
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
