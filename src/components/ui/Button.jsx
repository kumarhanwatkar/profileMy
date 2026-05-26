import { memo } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FOCUS_STYLES } from '../../constants';

const variants = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-slate-900',
  ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm min-h-[44px] min-w-[44px]', // WCAG touch target
  md: 'px-5 py-2.5 text-base min-h-[44px]', // WCAG touch target
  lg: 'px-7 py-3 text-lg min-h-[48px]', // WCAG touch target
};

const Button = memo(function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  external,
  disabled,
  className = '',
  icon: Icon,
  iconPosition = 'left',
  download,
  onClick,
  ariaLabel,
  ...props
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium rounded-lg
    transition-all duration-200
    ${FOCUS_STYLES.outline}
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" aria-hidden="true" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" aria-hidden="true" />}
    </>
  );

  const handleDownloadClick = async () => {
    if (!href || !download) {
      return;
    }

    try {
      const response = await fetch(href);

      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
      }

      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = typeof download === 'string' ? download : undefined;
      document.body.appendChild(link);
      link.click();
      window.setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(objectUrl);
      }, 1000);
    } catch (error) {
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  if (href) {
    if (download) {
      return (
        <motion.button
          type="button"
          onClick={handleDownloadClick}
          className={classes}
          aria-label={ariaLabel}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          {...props}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        aria-label={ariaLabel}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  href: PropTypes.string,
  external: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.elementType,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  download: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
export default Button;
