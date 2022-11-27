import { ChevronDownIcon } from "@chakra-ui/icons";
import { Stack, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";
import React from "react";
import Provider from "../chakra-theme/Provider";
import AnimalCard from "../components/AnimalCard";
import ScrollIntoView from "react-scroll-into-view";
import ResponsiveAppBar from "../components/navBar";

const HomePage = () => {
  const animals = [
    {
      src: "assets/animals/asian_elephant.png",
      width: "15rem",
      height: "15rem",
      name: "Asian Elephant",
    },
    {
      src: "assets/animals/owl.jpg",
      width: "15rem",
      height: "15rem",
      name: "Owl",
    },
    {
      src: "assets/animals/wolf.jpg",
      width: "15rem",
      height: "15rem",
      name: "Wolf",
    },
  ];

  return (
    <div>
      <ResponsiveAppBar />
      <Provider>
        <Stack spacing="0">
          <Stack
            bgImage="url(assets/home/home1.jpg)"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            h="42rem"
            w="full"
            zIndex="-2"
            justify="center"
            alignItems="center"
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "8xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                color="black"
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "white",
                  zIndex: -1,
                }}
              >
                Save the
              </Text>
              <Text as={"span"} color="white">
                Wildlife.
              </Text>
            </Heading>
          </Stack>
          <Stack justify="center" alignItems="center" w="full">
            <ScrollIntoView selector="#hero">
              <Button
                variant="ghost"
                colorScheme="gray"
                size="lg"
                position="relative"
                _hover={{}}
                _active={{}}
                top="-5rem"
              >
                <ChevronDownIcon boxSize="6rem" color="white" />
              </Button>
            </ScrollIntoView>
          </Stack>
          <Stack
            bgImage="url(assets/home/home2.jpg)"
            bgPosition="center"
            bgRepeat="no-repeat"
            bgSize="cover"
            h="46rem"
            w="full"
            justify="center"
            alignItems="center"
            id="hero"
          >
            <Heading fontSize="3xl" color="white">
              PROTECTING WILDLIFE FOR A HEALTHY PLANET
            </Heading>
            <Button>Learn More</Button>
          </Stack>
          <Stack justify="center" alignItems="center" spacing="4" pt="4rem">
            <Text w="30rem">
              We protect wildlife because they inspire us. But we also focus our
              efforts on those species—like tigers, rhinos, whales and marine
              turtles—whose protection influences and supports the survival of
              other species or offers the opportunity to protect whole
              landscapes or marine areas.
            </Text>
            <SimpleGrid columns={3} pt="4rem">
              {animals.map((animal) => (
                <AnimalCard key={animal.name} {...animal} />
              ))}
            </SimpleGrid>
          </Stack>
        </Stack>
      </Provider>
    </div>
  );
};

export default HomePage;
