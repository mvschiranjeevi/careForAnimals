// @ts-nocheck
import {
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Link,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Provider from "../chakra-theme/Provider";
import { Divider } from "@chakra-ui/react";
import { GiWeight, GiBodyHeight } from "react-icons/gi";
import { RxWidth } from "react-icons/rx";
import { AiOutlineNumber } from "react-icons/ai";
import { TiSortAlphabetically } from "react-icons/ti";
import { TbTrees } from "react-icons/tb";
import Footer from "../components/Footer";
import Maps from "./maps";

const AnimalsInfo = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoaded, setIsLoaded] = useState(false);
  const [animalData, setAnimalData] = useState({});
  const location = useLocation();

  useEffect(() => {
    getAnimalInfo(location.state.animalName);
  }, []);

  async function getAnimalInfo(name) {
    try {
      const response = await axios
        .get("https://care-for-animals-backend.onrender.com/app/animalInfo", {
          params: { animalName: name },
        })
        .then(function (response) {
          setAnimalData(response.data[0]);
          setIsLoaded(true);
          console.log(response);
        });
    } catch (exception) {
      console.log(exception);
    }
  }

  const readMore = (description) => {
    if (description.length > 80) {
      return true;
    } else {
      return false;
    }
  };
  const checkEmpty = (value) => {
    // const height = value?.length;
    // console.log(height);
    if (value == null || value.length == 0) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // console.log(animalData?.description.length);

  return (
    <>
      <Provider>
        <HStack
          bg="gray.800"
          // bgImage={animalData?.imageUrl}
          // // bgPosition="center"
          // bgRepeat="no-repeat"
          // // bgSize="cover"
          // h="30rem"
          // w="full"
          // zIndex="-2"
          // // justify="center"
          // alignItems="center"
          // m="1rem"
          // rounded="1rem"
          boxShadow="lg"
          border="2px solid"
          borderColor-="gray.600"
          alignItems="flex-start"
          spacing="4"
        >
          <Image src={animalData?.imageUrl} h="30rem" roundedLeft="1rem" />
          <Stack h="full" pt="2rem" pr="2rem" color="white">
            <Heading size="lg">{animalData.commonName}</Heading>
            {/* <Text>{animalData.description}</Text> */}

            <Text fontSize="sm">
              {animalData.description + " "}
              {true && (
                <>
                  <Link onClick={onOpen} color="green">
                    <b> Read Why they Matter</b>
                  </Link>
                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Why they matter</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                          {animalData?.matterText}
                        </Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </>
              )}
            </Text>

            <Divider />

            <VStack spacing={8} alignItems="start">
              <Text fontSize="3xl">Statistics</Text>
              <HStack alignItems="start" spacing={20}>
                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <GiWeight></GiWeight>
                    <Text>
                      <b>Weight</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.weight) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.weight} </Text>
                  )}
                </VStack>

                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <GiBodyHeight></GiBodyHeight>
                    <Text>
                      <b>Height</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.height) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.height} </Text>
                  )}
                </VStack>

                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <RxWidth></RxWidth>
                    <Text>
                      <b>Length</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.length) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.length} </Text>
                  )}
                </VStack>

                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <AiOutlineNumber></AiOutlineNumber>
                    <Text>
                      <b>Population</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.population) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.population} </Text>
                  )}
                </VStack>
              </HStack>

              <HStack alignItems="start" spacing={20}>
                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <TiSortAlphabetically></TiSortAlphabetically>
                    <Text>
                      <b>Scientific Name</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.sciName) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.sciName} </Text>
                  )}
                </VStack>

                <VStack spacing={0} alignItems="start">
                  <HStack>
                    <TbTrees></TbTrees>
                    <Text>
                      <b>Habitats</b>
                    </Text>
                  </HStack>

                  {checkEmpty(animalData?.habitats) ? (
                    <Text>Not Available</Text>
                  ) : (
                    <Text>{animalData.habitats} </Text>
                  )}
                </VStack>
              </HStack>
            </VStack>
          </Stack>
        </HStack>
      </Provider>
      <Maps />
      <Provider>
        <Divider />
        <Footer />
      </Provider>
    </>
  );
};

export default AnimalsInfo;
