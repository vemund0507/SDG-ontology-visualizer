import React from 'react';
import { Button, Menu, MenuButton, MenuList, RadioGroup } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import KPIRadioSelection from '../atoms/KPIRadioSelection';

interface Props {
  onKPIFilter: () => void;
}

const KpiDropdown: React.FC<Props> = ({ onKPIFilter }: Props) => (
  //   const dispatch = useDispatch();
  //  const [value, setValue] = React.useState('1');

  <Menu closeOnSelect={false} closeOnBlur autoSelect={false}>
    <MenuButton
      as={Button}
      bg="white"
      size="sm"
      color="cyan.700"
      minW="13.5em"
      rightIcon={<ChevronDownIcon />}
    >
      Kpi set
    </MenuButton>
    <MenuList bg="cyan.700">
      <RadioGroup defaultValue="1">
        <KPIRadioSelection value="1" onKPIFilter={onKPIFilter} text="U4SSC" />
        <KPIRadioSelection value="2" onKPIFilter={onKPIFilter} text="OECD" />
      </RadioGroup>
    </MenuList>
  </Menu>
);

export default KpiDropdown;
