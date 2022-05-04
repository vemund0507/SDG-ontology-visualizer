import React from 'react';
import { Button, Menu, MenuButton, MenuItem, MenuList, Radio, RadioGroup } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setKpiFilter } from '../../state/reducers/ontologyReducer';

const KpiDropdown = () => {
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState('1');
  const dispatch = useDispatch();

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRadioBtn(selectedRadioBtn);
    setSelectedRadioBtn(e.currentTarget.value);
    dispatch(setKpiFilter(e.currentTarget.value));
  };

  return (
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
          <MenuItem
            color="white"
            _hover={{
              bg: 'cyan.500',
            }}
          >
            <Radio
              width="100%"
              height="100%"
              colorScheme="cyan"
              size="md"
              value="1"
              onChange={handleClick}
              text="U4SSC"
            >
              U4SSC
            </Radio>
          </MenuItem>
          <MenuItem
            color="white"
            _hover={{
              bg: 'cyan.500',
            }}
          >
            <Radio
              width="100%"
              height="100%"
              colorScheme="cyan"
              color="white"
              size="md"
              value="2"
              onChange={handleClick}
              text="OECD"
            >
              OECD
            </Radio>
          </MenuItem>
          <MenuItem
            color="white"
            _hover={{
              bg: 'cyan.500',
            }}
          >
            <Radio
              width="100%"
              height="100%"
              colorScheme="cyan"
              color="white"
              size="md"
              value="3"
              onChange={handleClick}
              text="UNINDICATOR"
            >
              UN Indicator
            </Radio>
          </MenuItem>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};
export default KpiDropdown;
