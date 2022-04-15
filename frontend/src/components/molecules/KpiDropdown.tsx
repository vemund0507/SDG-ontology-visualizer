import React from 'react';
import { Button, Menu, MenuButton, MenuList, Radio, RadioGroup } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { setKpiFilter } from '../../state/reducers/ontologyReducer';
// import { RootState } from '../../state/store';
// import { KpiFilter } from '../../types/ontologyTypes';
// import { setKpiFilter } from '../../state/reducers/ontologyReducer';
// import KPIRadioSelection from '../atoms/KPIRadioSelection';

interface Props {
  // handleRadioClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // isSelected: (check: string) => boolean;
}

const KpiDropdown: React.FC<Props> = () => {
  //   const dispatch = useDispatch();
  //  const [value, setValue] = React.useState('1');
  const [selectedRadioBtn, setSelectedRadioBtn] = React.useState('1');
  const dispatch = useDispatch();

  // const { kpiFilter } = useSelector((state: RootState) => state.ontology);

  // const getCorrecttFilterValue = (filter: KpiFilter): boolean => {

  //   if (selectedRadioBtn === '1') return filter.u4ssc;
  //   if (selectedRadioBtn === '2') return filter.oecd;

  //   return false;
  // };

  // const isSelected = (value: string): boolean => selectedRadioBtn === value;
  const handleClick = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log('selected before', selectedRadioBtn);
    console.log('current value before', e.currentTarget.value);
    // selectedRadioBtn = e.currentTarget.value
    // dispatch(setKpiFilter(selectedRadioBtn));
    setSelectedRadioBtn(e.currentTarget.value);
    dispatch(setKpiFilter(e.currentTarget.value));
    console.log('current value', e.currentTarget.value);
    console.log('selected', selectedRadioBtn);

    console.log('current value after', e.currentTarget.value);
    console.log('selected after', selectedRadioBtn);
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
          <Radio
            width="100%"
            height="100%"
            colorScheme="cyan"
            color="white"
            size="md"
            value="1"
            // checked={isSelected('1')}
            onChange={handleClick}
            // isSelected={isSelected}
            // handleRadioClick={handleRadioClick}
            text="U4SSC"
          >
            U4SSC
          </Radio>
          <Radio
            width="100%"
            height="100%"
            colorScheme="cyan"
            color="white"
            size="md"
            value="2"
            // checked={isSelected('2')}
            // isSelected={isSelected}
            // handleRadioClick={handleRadioClick}
            onChange={handleClick}
            text="OECD"
          >
            OECD
          </Radio>
        </RadioGroup>
      </MenuList>
    </Menu>
  );
};
export default KpiDropdown;
