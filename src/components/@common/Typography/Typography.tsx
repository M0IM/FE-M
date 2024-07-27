import {Text, TextProps} from 'react-native';
import {cva} from 'class-variance-authority';
import {cn} from 'utils/cn';
import React from 'react';
import {KeyOfTypography, typographyStyles} from 'styles/typography';

interface TypographyProps extends TextProps {
  fontWeight: KeyOfTypography;
  className?: string;
  children: React.ReactNode;
}

export const Typography = ({
  fontWeight = 'MEDIUM',
  className,
  children,
  ...props
}: TypographyProps) => (
  <Text {...props} className={cn(typographyVariants({fontWeight}), className)}>
    {children}
  </Text>
);

const typographyVariants = cva('text-black', {
  variants: {
    fontWeight: {
      BOLD: typographyStyles.BOLD,
      MEDIUM: typographyStyles.MEDIUM,
      LIGHT: typographyStyles.LIGHT,
      SOKCHO: typographyStyles.SOKCHO,
    },
  },
  defaultVariants: {
    fontWeight: 'MEDIUM',
  },
});
