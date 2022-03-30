import { MenuItem, Radio } from '@chakra-ui/react';
import React from 'react';
// import { useDispatch } from 'react-redux';

type RadioButtonProps = {
  //   onKpiFilter: () => void;
  text: string;
  value: string;
  onKPIFilter: () => void;
};

//   const dispatch = useDispatch();
const KPIRadioSelection: React.FC<RadioButtonProps> = ({
  onKPIFilter,
  text,
  value,
}: RadioButtonProps) => {
  const getSelectedKPI = () => {
    onKPIFilter();
  };

  //   console.log(isSelected);

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
        // isChecked={() => isSelected}
        value={value}
        colorScheme="cyan"
        color="white"
        size="md"
        onChange={() => getSelectedKPI()}
      >
        {text}
      </Radio>
    </MenuItem>
  );
};

export default KPIRadioSelection;
