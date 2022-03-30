import { Flex, Stack } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { isOecdKPI, isSubgoal, isU4sscKPI, isWithinCorrelationLimit } from '../../common/node';
import { RootState } from '../../state/store';
import { D3Edge } from '../../types/d3/simulation';
import { GraphEdge, GraphNode } from '../../types/ontologyTypes';
import Graph from '../atoms/Graph';
import GraphToolBar from './GraphToolbar';
import GraphDescriptions from './GraphDescriptions';

// component wrapping the Graph, Graphtoolbar and GraphDescriptions. Also creates nodeFilter and edgeFilter callbacks
const GraphContainer: React.FC = () => {
  const [showSubgoals, setShowSubgoals] = useState<boolean>(false);
  const [unlockNodes, setUnlockNodes] = useState<boolean>(false);
  const [edgeLabelsVisible, setEdgeLabelsVisible] = useState<boolean>(true);
  const [kpiAttainedToggle, setKPIAttained] = useState<boolean>(false);
  const [filterKPISet, setKPIFilter] = useState<boolean>(true);
  const { isFullscreen } = useSelector((state: RootState) => state.fullscreenStatus);
  const { correlationFilter } = useSelector((state: RootState) => state.ontology);

  const filterSubgoals = () => {
    setShowSubgoals(!showSubgoals);
  };

  const filterKPI = () => {
    setKPIFilter(!filterKPISet);
    console.log(filterKPISet);
  };

  const filterKPISetSelection = useCallback(
    (node: GraphNode): boolean => {
      if (!filterKPISet && isU4sscKPI(node)) return false;
      if (filterKPISet && isOecdKPI(node)) return false;
      console.log(filterKPISet);
      return true;
    },
    [filterKPISet],
  );

  const nodeFilter = useCallback(
    (node: GraphNode): boolean => {
      if (!showSubgoals && isSubgoal(node)) return false;
      return true;
    },
    [showSubgoals],
  );

  // const filterKPI = () => {
  //   setKPIFilter(!filterKPISet);
  // };

  // const kpiToggle = useCallback(
  //   (node: GraphNode): boolean => {
  //     if (!isSubgoal(node)) return false;
  //     return true;
  //   },
  //   [kpiAttainedToggle],
  // );

  const edgeFilter = useCallback(
    (edge: D3Edge | GraphEdge): boolean => {
      if (!isWithinCorrelationLimit(edge, correlationFilter)) return false;
      return true;
    },
    [
      correlationFilter.pLow,
      correlationFilter.pMedium,
      correlationFilter.pHigh,
      correlationFilter.nLow,
      correlationFilter.nMedium,
      correlationFilter.nHigh,
    ],
  );

  return (
    <Stack
      spacing={isFullscreen ? 0 : 2}
      h={isFullscreen ? '100vh' : '65vh'}
      w={isFullscreen ? '100vw' : ''}
      position={isFullscreen ? 'absolute' : 'static'}
    >
      <GraphToolBar
        onSubgoalFilter={filterSubgoals}
        onUnlockNodes={setUnlockNodes}
        onEdgeLabelsVisible={setEdgeLabelsVisible}
        onKPIAttainedGoals={setKPIAttained}
        onKPIFilter={filterKPI}
        // onKPIFilter={setKPIFilter}
      />
      <Flex h="100%" justify="space-between">
        <Graph
          nodeFilter={nodeFilter}
          edgeFilter={edgeFilter}
          kpiToggle={kpiAttainedToggle}
          unlockAllNodes={unlockNodes}
          edgeLabelsVisible={edgeLabelsVisible}
          filterKPISetSelection={filterKPISetSelection}
        />
        <GraphDescriptions float={isFullscreen} />
      </Flex>
    </Stack>
  );
};

export default GraphContainer;
