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

const categoryData = () => {
  return axios
    .get(`http://localhost:4000/app/getCategories`)
    .then((response) => {
      return response.data;
    });
};

const eventData = () => {
  return axios.get(`http://localhost:4000/app/seeEvents`).then((response) => {
    return response.data;
  });
};

const PostparticipateData = ({ id, isInterested }) => {
  return axios
    .post(
      `http://localhost:4000/app/participate?id=${id}&status=${isInterested}`
    )
    .then((response) => {
      console.log(response);
      return response.data;
    });
};
const participateData = (event) => {
  return axios
    .get(`http://localhost:4000/app/participation?id=${event._id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
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
  const [category, setCategory] = useState(null);
  const [allEvents, setEvents] = useState(null);
  const [participate, setParticipate] = useState(null);
  const [hasEventsRefreshed, setHasEventsRefreshed] = useState(false);

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

  useEffect(() => {
    categoryData().then((response) => setCategory(response));
    eventData().then(async (response) => {
      let events = response;
      events = await Promise.all(
        events.map(async (event) => {
          const r = await participateData(event);
          console.log(event.endDate);
          if (r.length == 0) {
            return {
              ...event,
              startDate: new Date(event.startDate),
              endDate: new Date(event.endDate),
              interested: false,
            };
          } else {
            return {
              ...event,
              startDate: new Date(event.startDate),
              endDate: new Date(event.endDate),
              interested: r[0].participating,
            };
          }
        })
      );
      setEvents(events);
    });
  }, [hasEventsRefreshed]);

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

  if (allEvents === null) {
    return (
      <Provider>
        <Stack boxSize="full" h="100vh" justify="center" alignItems="center">
          <Spinner size="xl" />
          <Link href="/login">You may not be logged in</Link>
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
          <Stack h="full" bg="gray.200">
            <Box border="2px solid gray" rounded="lg" m="2rem">
              <HStack>
                <Example />
                <FormControl w="15rem">
                  <FormLabel>Event Type</FormLabel>
                  <Select
                    border="1px solid"
                    borderColor="gray.600"
                    //   onChange={handleChange}
                    id="category-select"
                    name="eventType"
                    {...methods.register("eventType")}
                  >
                    {category.map((category) => (
                      <option key={category._id}>{category.eventType}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl w="15rem">
                  <FormLabel>Owner</FormLabel>
                  <Select
                    border="1px solid"
                    borderColor="gray.600"
                    name="owner"
                    {...methods.register("owner")}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                </FormControl>

                <FormControl w="10rem">
                  <FormLabel>Start Date</FormLabel>
                  <Input
                    type="date"
                    variant="outline"
                    border="1px solid"
                    borderColor="gray.600"
                    name="startDate"
                    {...methods.register("startDate")}
                  />
                </FormControl>

                <FormControl w="10rem">
                  <FormLabel>End date</FormLabel>
                  <Input
                    type="date"
                    border="1px solid"
                    borderColor="gray.600"
                    name="endDate"
                    {...methods.register("endDate")}
                  />
                </FormControl>
                <Box pt="1.8rem" pl="1.5rem">
                  <Button
                    size="md"
                    onClick={() => {
                      console.log(methods.getValues());
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </HStack>
            </Box>

            <SimpleGrid columns={[1, 3]} spacing={10} p="2rem">
              {events.map((event) => (
                <Card rounded="md" bg="white" key={event.name}>
                  <Image
                    objectFit="cover"
                    maxW={{ base: "100%" }}
                    src={event.image}
                    alt="Caffe Latte"
                    roundedTop="md"
                    borderBottom="0.4rem solid"
                    borderColor="green.500"
                  />

                  <CardBody>
                    <Stack textTransform="uppercase" alignItems="flex-start">
                      <Text fontSize="xs">
                        {convertDate(event.startDate)} -{" "}
                        {convertDate(event.endDate)}
                      </Text>
                      <Heading size="lg">{event.name}</Heading>
                      <Text fontSize="xs">{event.description}</Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter justify="space-between">
                    <Text fontSize="xs">
                      <b>Created by</b> {event.createdBy}
                    </Text>
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
