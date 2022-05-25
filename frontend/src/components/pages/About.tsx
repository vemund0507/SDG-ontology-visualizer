import { Box, Heading, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { GoMarkGithub } from 'react-icons/go';

const About = () => (
  <Box py="10%" px="20%">
    <Stack
      spacing="10"
      align="center"
      bg="green.600"
      color="white"
      p="10"
      borderRadius="lg"
      boxShadow="xl"
    >
      <Heading as="h2" size="lg">
        Om prosjektet
      </Heading>
      <Text fontSize="md" align="left">
        Dette er ontologiprototype laget for Trondheim kommune. Utviklingen har vært initiert og
        styrt av Data Scientist Leendert Wienhofen ansatt i Trondheim kommune. Arbeidet er gjort i
        forbindelse med IT2901 Bachelorprosjekt samt. faget TDT4290 Kundestyrt prosjekt i 2021.
        <br />
        <br />
        Prosjektet har blitt videreutviklet av Vemund Eggemoen i høst 2021 - vår 2022 som
        deltidsansatt i Trondheim Kommune. Prototypen har funksjonalitet som viser muligheter for
        datadrevet bærekraft.
      </Text>
      <Link
        href="https://github.com/vemund0507/SDG-ontology-visualizer"
        isExternal
        color="white"
        _hover={{ opacity: '75%' }}
      >
        <GoMarkGithub size="40" />
      </Link>
    </Stack>
  </Box>
);

export default About;
