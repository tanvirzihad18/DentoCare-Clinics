import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

export const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

export const VIEWPORT_CONFIG = {
  once: true,
  amount: 'some' as const,
  margin: '80px 0px 80px 0px',
} as const;

interface RevealProps extends HTMLMotionProps<'div'> {
  delay?: number;
  y?: number;
  immediate?: boolean;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 18,
  immediate = false,
  className = '',
  ...rest
}) => {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay, ease: LUXURY_EASE }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.55, delay, ease: LUXURY_EASE }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface RevealTextProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  immediate?: boolean;
  className?: string;
  id?: string;
}

export const RevealText: React.FC<RevealTextProps> = ({
  children,
  as = 'p',
  delay = 0,
  immediate = false,
  className = '',
  id,
}) => {
  const Component = motion[as];

  if (immediate) {
    return (
      <Component
        id={id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay, ease: LUXURY_EASE }}
        className={className}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      id={id}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.5, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </Component>
  );
};

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  staggerDelay?: number;
  immediate?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  staggerDelay = 0.06,
  immediate = false,
  className = '',
  ...rest
}) => {
  const variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  if (immediate) {
    return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<HTMLMotionProps<'div'>> = ({
  children,
  className = '',
  ...rest
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: LUXURY_EASE },
        },
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children?: React.ReactNode;
  sheen?: boolean;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  sheen = false,
  className = '',
  ...rest
}) => {
  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.975, y: 0 }}
      transition={{ duration: 0.18, ease: LUXURY_EASE }}
      className={`group/btn relative overflow-hidden ${className}`}
      {...rest}
    >
      {sheen && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
      {children}
    </motion.button>
  );
};

interface AnimatedAnchorProps extends Omit<HTMLMotionProps<'a'>, 'children'> {
  children?: React.ReactNode;
  sheen?: boolean;
}

export const AnimatedAnchor: React.FC<AnimatedAnchorProps> = ({
  children,
  sheen = false,
  className = '',
  ...rest
}) => {
  return (
    <motion.a
      whileHover={{ y: -2, scale: 1.015 }}
      whileTap={{ scale: 0.975, y: 0 }}
      transition={{ duration: 0.18, ease: LUXURY_EASE }}
      className={`group/btn relative overflow-hidden ${className}`}
      {...rest}
    >
      {sheen && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      )}
      {children}
    </motion.a>
  );
};

export const AnimatedImageFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  immediate?: boolean;
  delay?: number;
}> = ({ children, className = '', immediate = false, delay = 0.1 }) => {
  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 1.03, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, delay, ease: LUXURY_EASE }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.03, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: 0.65, delay, ease: LUXURY_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
