import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  SimpleGrid,
  Stack,
  Image,
  Text,
  HStack,
  Divider,
  Select,
  FormControl,
  FormLabel,
  Spinner,
  Link,
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  VStack,
  Textarea,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import CreateEventDialog from "../components/CreateEventDialog";
import {
  Radio,
  RadioGroup,
  useRadioGroup,
  Box,
  useRadio,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import Provider from "../chakra-theme/Provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "zod";
import {
  AddIcon,
  CloseIcon,
  DragHandleIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { BiCalendarEvent, BiMap, BiUserPlus } from "react-icons/bi";
import backendPath from "../utils/backendPath";

const categoryData = () => {
  return axios.get(backendPath + `/app/getCategories`).then((response) => {
    return response.data;
  });
};

const eventData = () => {
  return axios.get(backendPath + `/app/seeEvents`).then((response) => {
    return response.data;
  });
};

const PostparticipateData = ({ id, isInterested }) => {
  return axios
    .post(backendPath + `/app/participate?id=${id}&status=${isInterested}`)
    .then((response) => {
      console.log(response);
      return response.data;
    });
};
const participateData = (event) => {
  return axios
    .get(backendPath + `/app/participation?id=${event._id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    });
};

const deleteEvent = (event) => {
  return axios
    .delete(backendPath + `/app/deleteEvent?eventTitle=${event.eventTitle}`)
    .then((resp) => {
      window.location.reload();
      console.log(resp.data);
    });
};

const updateEvent = (event, obj) => {
  console.log("OBJ:", obj);
  return axios
    .put(backendPath + `/app/updateEvent?eventTitle=${event.eventTitle}`, obj)
    .then((resp) => {
      window.location.reload();
      console.log(resp.data);
    });
};

const participateFunc = async (event) => {
  const data = await participateData(event);
  console.log(data);
  if (data === null) {
    return false;
  } else {
    return data["participating"];
  }
};

const convertDate = (date) => {
  const monthArray = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return (
    monthArray[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
};

const filterSchema = object({
  eventType: string(),
  owner: string(),
  startDate: string(),
  endDate: string(),
});

const EventsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [category, setCategory] = useState(null);
  const [allEvents, setEvents] = useState(null);
  const [participate, setParticipate] = useState(null);
  const [hasEventsRefreshed, setHasEventsRefreshed] = useState(false);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [modalEvent, setModalEvent] = useState({});
  let eventObj = { description: description };
  const changeLocation = (e) => {
    setLocation(e.target.value);
  };
  const changeDescription = (e) => {
    setDescription(e.target.value);
  };
  const userEmail = localStorage.getItem("user");
  console.log(userEmail);
  const handleClick = async (id, isInterested) => {
    try {
      const params = { id, isInterested };
      const response = await PostparticipateData({ id, isInterested });
      setHasEventsRefreshed((hasEventsRefreshed) => !hasEventsRefreshed);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  const openModal = (eve) => {
    setModalEvent(eve);
    onOpen();
  };
  const seeTrue = (event) => {
    console.log(JSON.stringify(event.OwnerEmail));
    console.log(userEmail);
    console.log(JSON.stringify(event.OwnerEmail) == userEmail);
    return event.OwnerEmail == userEmail;
  };
  const readMore = (eventDes) => {
    if (eventDes.length > 80) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    categoryData().then((response) => setCategory(response));
    eventData().then(async (response) => {
      let events = response;
      events = await Promise.all(
        events.map(async (event) => {
          const imageUrl =
            "assets/home/" + event.eventType.replace(/\s/g, "") + ".png";
          const r = await participateData(event);
          if (r.data.length == 0) {
            return {
              ...event,
              total: r.total,
              startDate: new Date(event.startDate),
              endDate: new Date(event.endDate),
              interested: false,
              picture: imageUrl,
            };
          } else {
            return {
              ...event,
              total: r.total,
              startDate: new Date(event.startDate),
              endDate: new Date(event.endDate),
              interested: r.data[0]["participating"],
              picture: imageUrl,
            };
          }
        })
      );
      setEvents(events);
    });
  }, [hasEventsRefreshed]);

  // console.log(allEvents);
  const defaultValues = {
    eventType: "",
    owner: "",
    startDate: "",
    endDate: "",
  };

  const methods = useForm({
    resolver: zodResolver(filterSchema),
    defaultValues,
  });

  // const handleSubmit = async () => {
  //   const response = await axios.post(
  //     "https://care-for-animals-backend.onrender.com/app/seeEvents?",
  //     methods.getValues()
  //   );
  //   if (response.status == 200) {
  //     // console.log("Hallelujah!");
  //   }
  // };
  if (allEvents === null) {
    return (
      <Provider>
        <Stack boxSize="full" h="100vh" justify="center" alignItems="center">
          <Spinner size="xl" />
          <Link href="/login"> Please Login to check the events </Link>
        </Stack>
      </Provider>
    );
  }
  const events = allEvents;
  if (!category) {
    return <Spinner />;
  }

  return (
    <div>
      <Provider>
        <FormProvider {...methods}>
          <Stack h="full">
            <SimpleGrid columns={[1, 3]} spacing={10} p="2rem">
              {events.map((event) => (
                <Card
                  rounded="md"
                  bg="white"
                  borderColor={"black"}
                  key={event.eventTitle}
                >
                  {JSON.stringify(event.OwnerEmail) == userEmail && (
                    <div style={{ position: "absolute", top: 4, left: 390 }}>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label="Options"
                          icon={<DragHandleIcon />}
                          variant="outline"
                        />
                        <MenuList>
                          <MenuItem
                            icon={<EditIcon />}
                            onClick={() => {
                              openModal(event);
                            }}
                            command="⌘T"
                          >
                            Edit Event
                          </MenuItem>
                          <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                              <ModalHeader>Event Description</ModalHeader>
                              <ModalCloseButton />
                              <ModalBody pb={6}>
                                <FormControl mt={4}>
                                  <Textarea
                                    placeholder="Please Enter Your Description Here"
                                    value={description}
                                    onChange={changeDescription}
                                  />
                                </FormControl>
                              </ModalBody>

                              <ModalFooter>
                                <Button
                                  colorScheme="blue"
                                  mr={3}
                                  onClick={() => {
                                    updateEvent(modalEvent, eventObj);
                                  }}
                                >
                                  Update
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>
                          <MenuItem
                            icon={<CloseIcon />}
                            onClick={() => {
                              deleteEvent(event);
                            }}
                            command="⌘N"
                          >
                            Delete Event
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  )}

                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%" }}
                    sx={{ maxHeight: 200 }}
                    src={event.picture}
                    alt="Caffe Latte"
                    roundedTop="md"
                    borderBottom="0.4rem solid"
                    borderColor="green.500"
                  />

                  <CardBody>
                    <Stack textTransform="uppercase" alignItems="flex-start">
                      <HStack>
                        <Text fontSize="xs">
                          {convertDate(event.startDate)} -{" "}
                          {convertDate(event.endDate)}
                        </Text>
                        <div>
                          <Text fontSize="xs">
                            No of pratipants : {event.total}
                          </Text>
                        </div>
                      </HStack>

                      <Divider />
                      <Heading size="md">{event.eventTitle}</Heading>
                      <Text fontSize="xs">
                        {event.description.slice(0, 80) + "  "}
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />

                  <CardFooter justify="space-between">
                    <VStack align="stretch">
                      <HStack>
                        <BiMap></BiMap>
                        <Text fontSize="xs">
                          <b>Location :</b> California
                        </Text>
                      </HStack>

                      <HStack>
                        <BiUserPlus></BiUserPlus>
                        <Text fontSize="xs">
                          <b>Owner : </b> {event.OwnerEmail}
                        </Text>
                      </HStack>

                      <HStack>
                        <BiCalendarEvent></BiCalendarEvent>
                        <Text fontSize="xs">
                          <b>Event : </b> {event.eventType}
                        </Text>
                      </HStack>
                    </VStack>
                    {event.interested ? (
                      <Button
                        variant="solid"
                        onClick={() => handleClick(event._id, false)}
                      >
                        Participating!
                      </Button>
                    ) : (
                      <Button
                        variant="solid"
                        onClick={() => handleClick(event._id, true)}
                        // @ts-ignore
                        variant="inverse"
                      >
                        I'm interested
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </FormProvider>
        <CreateEventDialog categoryData={category} />
      </Provider>
    </div>
  );
};

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "green.500",
          color: "white",
          borderColor: "teal.600",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        border="1px solid"
        borderColor="gray.600"
      >
        {props.children}
      </Box>
    </Box>
  );
}

function Example() {
  const options = ["Past Events", "Ongoing Events"];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "Past Events",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group} p="2rem" marginTop="1.5rem">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}

export default EventsPage;
