import { ArrowRightIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAnnotations,
  getContributions,
  getDevelopmentArea,
  getTradeOff,
} from '../../api/ontologies';
import { mapCorrelationToName } from '../../common/node';
import { selectNode } from '../../state/reducers/ontologyReducer';
import { RootState } from '../../state/store';
import { Annotation, Node } from '../../types/ontologyTypes';
import ContextDivider from '../atoms/ContextDivider';
import SlideInDrawer from '../atoms/SlideInDrawer';
import AllConnections from './AllConnections';

const DetailView: React.FC = () => {
  const [annotations, setAnnotations] = useState<Annotation>({
    label: '',
    description: '',
  });
  const [contributions, setContributions] = useState<Array<Node>>([]);
  const [tradeOffs, setTradeOffs] = useState<Array<Node>>([]);
  const [developmentAreas, setDevelopmentAreas] = useState<Array<Node>>([]);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [selectedConnection, setSelectedConnection] = useState<Node>();
  const dispatch = useDispatch();
  const selectedNode = useSelector((state: RootState) => state.ontology.selectedNode);

  const loadData = async () => {
    if (!selectedNode) return;
    setAnnotations(await getAnnotations(selectedNode.id));
    setContributions(await getContributions(selectedNode.id));
    setTradeOffs(await getTradeOff(selectedNode.id));
    setDevelopmentAreas(await getDevelopmentArea(selectedNode.id));
  };

  const expandConnection = (connection: Node) => {
    setSelectedConnection(connection);
    setExpanded(true);
  };

  useEffect(() => {
    loadData();
  }, [selectedNode]);

  const onClickConnections = (node: Node) => {
    setExpanded(false);
    dispatch(selectNode(node));
  };

  return (
    <Box spacing={10} bg="cyan.500" w="100%" px={10} py={6} color="white">
      <Heading as="h2" size="2xl" fontWeight="hairline" textAlign="left" paddingBottom="5">
        {annotations.label.toUpperCase() || (selectedNode && selectedNode.name) || ''}
      </Heading>
      <Flex justify="space-between">
        <SlideInDrawer expanded={!expanded} width="40vw">
          <Text fontSize="xl" mt="2">
            {annotations.description}
          </Text>
        </SlideInDrawer>
        <ContextDivider visible={!expanded} />
        <AllConnections
          contributions={contributions}
          tradeOffs={tradeOffs}
          developmentAreas={developmentAreas}
          onClick={expandConnection}
        />
        <ContextDivider visible={expanded} />
        <SlideInDrawer expanded={expanded} width="40vw">
          <Stack spacing="5">
            <Heading as="h3">
              {`${annotations.label} har ${
                selectedConnection && mapCorrelationToName(selectedConnection.correlation)
              } korrelasjon til ${selectedConnection && selectedConnection.name}`}
            </Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti porro saepe
              laboriosam iure amet, atque, id ex asperiores tempora voluptatem totam necessitatibus.
              A maiores laboriosam, pariatur earum perferendis distinctio dicta?
            </Text>
            <Flex>
              <Button
                mr="3"
                colorScheme="blue"
                onClick={() => onClickConnections(selectedConnection!)}
              >
                {`Gå til 
              ${selectedConnection && selectedConnection.name}`}
              </Button>
              <Button
                aria-label="Close connection view"
                onClick={() => setExpanded(false)}
                colorScheme="blue"
                rightIcon={<ArrowRightIcon />}
              >
                Lukk
              </Button>
            </Flex>
          </Stack>
        </SlideInDrawer>
      </Flex>
    </Box>
  );
};

DetailView.defaultProps = { node: undefined };
export default DetailView;