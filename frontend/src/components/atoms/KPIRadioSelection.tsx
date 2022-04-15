import { MenuItem, Radio } from '@chakra-ui/react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setKpiFilter } from '../../state/reducers/ontologyReducer';
// import { setKpiFilter } from '../../state/reducers/ontologyReducer';
// import { RootState } from '../../state/store';
// import { KpiFilter } from '../../types/ontologyTypes';

type RadioButtonProps = {
  //   onKpiFilter: () => void;
  text: string;
  index: string;
  // isSelected: boolean;
  // handleRadioClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // isSelected: (check: string) => boolean;
};

//   const dispatch = useDispatch();
const KPIRadioSelection: React.FC<RadioButtonProps> = ({
  // handleRadioClick,
  // isSelected,
  text,
  index,
}: RadioButtonProps) => {
  const dispatch = useDispatch();
  // const { kpiFilter } = useSelector((state: RootState) => state.ontology);
  // const [selectedRadioBtn, setSelectedRadioBtn] = React.useState('1');

  // const getCorrectFilterValue = (filter: KpiFilter): boolean => {
  //   // setSelectedRadioBtn(selectedRadioBtn);

  //   if (index === '1') return filter.u4ssc;
  //   if (index === '2') return filter.oecd;

  //   return false;
  // };

  // const isRadioSelected = (value: string): boolean => setSelectedRadioBtn === value;

  // const isChecked = getCorrectFilterValue(kpiFilter);

  // const isChhecked = (index: string) => {
  //   console.log('is checked', index);
  //   if (isSelected(index)) return true;
  //   return false;
  // };
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
        // isChecked={isCheckedd()}
        // checked={selectedRadioBtn === index}
        value={index}
        colorScheme="cyan"
        color="white"
        size="md"
        onChange={() => dispatch(setKpiFilter(index))}
      >
        {text}
      </Radio>
    </MenuItem>
  );
};

export default KPIRadioSelection;
