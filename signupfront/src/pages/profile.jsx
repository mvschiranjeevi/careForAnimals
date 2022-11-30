import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
  VStack,
  ChakraProvider,
  theme,
  Spinner,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

import ResponsiveAppBar from "../components/navBar";
import Provider from "../chakra-theme/Provider";
import React from "react";
import backendPath from "../utils/backendPath";

const data = () => {
  if (!localStorage.getItem("user")) {
    return Promise.reject();
  }
  const email = localStorage.getItem("user").slice(1, -1);
  console.log(email);
  return axios
    .get(backendPath+`/app/seeProfile?email=${email}`)
    .then((response) => {
      console.log("hi");
      console.log(response);
      return response.data;
    });
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    data()
      .then((response) => setProfile(response))
      .catch((err) => {
        console.log("hi", err);
      });
  }, []);

  if (profile === null) {
    return (
      <Provider>
        <Stack boxSize="full" h="100vh" justify="center" alignItems="center">
          <Spinner size="xl" />
          <Link href="/login">You may not be logged in</Link>
        </Stack>
      </Provider>
    );
  }
  return (
    <div>
      {!profile ? (
        <Provider>
          <Spinner />
        </Provider>
      ) : (
        <Provider>
          <Stack h="100vh" bg="gray.100">
            <HStack alignItems="flex-start" h="40rem" pt="5rem">
              <Stack w="full">
                <Card width="full" bg="white">
                  <CardBody>
                    <Stack>
                      <Heading size="md">General Information</Heading>
                      <HStack w="full">
                        <FormControl>
                          <FormLabel>Full Name</FormLabel>
                          <Input
                            variant="filled"
                            defaultValue={profile.fullName}
                          />
                        </FormControl>
                      </HStack>
                      <HStack w="full">
                        <FormControl>
                          <FormLabel>Gender</FormLabel>
                          <Input variant="filled" defaultValue="Male" />
                        </FormControl>
                        <FormControl>
                          <FormLabel>Phone Number</FormLabel>
                          <InputGroup>
                            <InputLeftAddon children="+1" />
                            <Input type="tel" placeholder="(999)-999-9999" />
                          </InputGroup>
                        </FormControl>
                      </HStack>
                      <HStack w="full">
                        <FormControl>
                          <FormLabel>Email</FormLabel>
                          <Input
                            type="email"
                            variant="filled"
                            isDisabled
                            defaultValue={profile.email}
                          />
                        </FormControl>
                      </HStack>
                      <HStack w="30%" pt="3rem">
                        <Button colorScheme="teal" bg="black">
                          Save All
                        </Button>
                      </HStack>
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
              <Stack w="50rem">
                <Card size="lg" bg="white">
                  <CardBody>
                    <VStack h="full">
                      <Avatar
                        size="xl"
                        name="Chiranjeevi Medam"
                        src="https://bit.ly/dan-abramov"
                      />
                      <Heading>{profile.fullName}</Heading>
                      <Heading size="md">@{profile.userName}</Heading>
                    </VStack>
                  </CardBody>
                </Card>
                <Card bg="white">
                  <CardHeader>Select a profile picture</CardHeader>
                  <CardBody>
                    <Input type="file" />
                  </CardBody>
                </Card>
              </Stack>
            </HStack>
          </Stack>
        </Provider>
      )}
    </div>
  );
};

export default Profile;
