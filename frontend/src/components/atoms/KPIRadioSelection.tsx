import { MenuItem, Radio } from '@chakra-ui/react';
import React from 'react';
// import { useDispatch } from 'react-redux';

type RadioButtonProps = {
  //   onKpiFilter: () => void;
  text: string;
  value: string;
};

//   const dispatch = useDispatch();
const KPIRadioSelection: React.FC<RadioButtonProps> = ({ text, value }: RadioButtonProps) => {
  const isSelected = false;

  console.log(isSelected);

  return (
    <MenuItem
      _hover={{
        bg: 'cyan.500',
      }}
      color="white"
    >
      <Radio
        width="100%"
        height="100%"
        type="radio"
        value={value}
        colorScheme="cyan"
        color="white"
        size="md"
      >
        {text}
      </Radio>
    </MenuItem>
  );
};

export default KPIRadioSelection;
