import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '@redux/auth/authOperations';
import { clearError } from '@redux/auth/authSlice';
import { useAuth } from '@hooks/useAuth';
import { loginSchema } from '@utils/validation/loginSchema';

import Button from '@components/common/Button';
import Input from '@components/common/Input';

import pillImage from '@assets/images/login-pill.png';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoading, error } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  // Clear previous global error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (values) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      toast.success('Welcome back!');
      const redirectTo = location.state?.from?.pathname || '/home';
      navigate(redirectTo, { replace: true });
    } else {
      toast.error(result.payload || 'Login failed');
    }
  };

  return (
    <div className={styles.page}>
      {/* Header / Logo */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoMark} aria-hidden="true" />
          <span>E-Pharmacy</span>
        </div>
      </header>

      {/* Main */}
      <main className={styles.main}>
        {/* Left side */}
        <div className={styles.left}>
          <img
            src={pillImage}
            alt=""
            aria-hidden="true"
            className={styles.pill}
            loading="lazy"
          />
       <h1 className={styles.headline}>
  Your medication, <br />
  delivered Say goodbye <br />
  to all <span className={styles.highlight}>your healthcare</span> <br />
  worries with us
</h1>
        </div>

        {/* Right side: form */}
        <form
          className={styles.formWrapper}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Input
            type="email"
            placeholder="Email address"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            togglePassword
            error={errors.password?.message}
            {...register('password')}
          />

          <div className={styles.formError}>{error || ''}</div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log in'}
          </Button>
        </form>
      </main>

      {/* Decorative shapes bottom-right */}
     {/* Decorative shapes bottom-right */}
<div className={styles.decorations} aria-hidden="true" />
<span className={styles.decorationsThird} aria-hidden="true" />
    </div>
  );
};

export default LoginPage;