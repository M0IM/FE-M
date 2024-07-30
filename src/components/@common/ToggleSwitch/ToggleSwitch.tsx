import { Switch, SwitchProps } from 'react-native';
import React from 'react';

interface ToggleSwitchProps extends SwitchProps {
    isEnabled: boolean;
    onToggle: () => void;
}

const ToggleSwitch = ({
  isEnabled,
  onToggle,
  ...props
}: ToggleSwitchProps) => {
  return (
    <Switch
      {...props}
      trackColor={{false: '#E9ECEF', true: '#00F0A1'}}
      thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
      ios_backgroundColor="#E9ECEF"
      onValueChange={onToggle}
      value={isEnabled}
    />
  );
};

export default ToggleSwitch;