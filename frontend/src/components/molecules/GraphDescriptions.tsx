import { Stack } from '@chakra-ui/react';
import React from 'react';
import GraphNodeKey from '../atoms/GraphNodeKey';

interface GraphDescriptionsProps {
  float: boolean;
}

const GraphDescriptions: React.FC<GraphDescriptionsProps> = ({ float }: GraphDescriptionsProps) => (
  <Stack
    width={[null, null, null, '20vw', '17vw']}
    position={float ? 'absolute' : 'static'}
    right={0}
    bgColor="white"
    boxShadow="md"
    rounded="lg"
  >
    <GraphNodeKey description="Standardfarge/Startnode" />
    <GraphNodeKey description="SDG (Bærekraftsmål)" />
    <GraphNodeKey description="Delmål til bærekraftsmål" />
    <GraphNodeKey description="Trippel bunnlinje" />
    <GraphNodeKey description="Utviklingsområde" />
    <GraphNodeKey description="Kategori" />
    <GraphNodeKey description="Indicator" />
    <GraphNodeKey description="Direktørområde" />
    <GraphNodeKey description="Enhetsområde" />
  </Stack>
);

export default GraphDescriptions;
