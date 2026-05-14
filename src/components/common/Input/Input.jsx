import { forwardRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

const Input = forwardRef(
  (
    {
      type = 'text',
      error,
      filled = false,
      className,
      togglePassword = false, // for password fields
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const showToggle = isPassword && togglePassword;

    const actualType = isPassword && showPassword ? 'text' : type;

    return (
      <div className={styles.wrapper}>
        <input
          ref={ref}
          type={actualType}
          className={clsx(
            styles.input,
            error && styles.error,
            filled && styles.filled,
            showToggle && styles.hasRight,
            className
          )}
          {...rest}
        />

        {showToggle && (
          <button
            type="button"
            className={styles.rightSlot}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}

        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;