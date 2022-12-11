import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Stack,
  Box,
  FormLabel,
  Input,
  Select,
  Textarea,
  FormControl,
  HStack,
  Text,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "zod";
import axios from "axios";
import backendPath from "../utils/backendPath";

const eventsSchema = object({
  eventTitle: string().min(5, {
    message: "Title length should be greater than 5",
  }),
  eventType: string().min(5, "Event Type is required").max(30),
  description: string()
    .min(5, "Description length should be greater than 5")
    .max(1024),
  startDate: string().min(5, "Start Date is required").max(30),
  endDate: string().min(5, "End Date is required").max(30),
  location: string().min(5, "Location length should be greater than 5").max(30),
  relatedTo: string().min(0, "location is required").max(30),
});

const CreateEventDialog = ({ categoryData }) => {
  const [hasEventsRefreshed, setHasEventsRefreshed] = useState(false);
  const [greater, setGreater] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  const defaultValues = {
    eventTitle: "",
    eventType: "",
    startDate: "",
    endDate: "",
    description: "",
    location: "",
    relatedTo: "",
    picture: "",
  };

  const methods = useForm({
    resolver: zodResolver(eventsSchema),
    defaultValues,
  });
  const processMessage = (data) => {
    if (
      new Date(data.startDate) > new Date(data.endDate) ||
      new Date(data.endDate) < new Date(data.startDate)
    ) {
      setGreater(true);
    } else {
      setGreater(false);
      const response = axios
        .post(backendPath + "/app/createEvent", methods.getValues())
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <Stack
          alignItems="flex-end"
          position="sticky"
          bottom="10px"
          width="99%"
        >
          <Box>
            <Button onClick={onOpen} rounded="full">
              <AddIcon />
            </Button>
          </Box>
        </Stack>
        <Drawer
          isOpen={isOpen}
          placement="right"
          initialFocusRef={firstField}
          onClose={onClose}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent>
            <form
              onSubmit={methods.handleSubmit((data) => processMessage(data))}
            >
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                Create a new event
              </DrawerHeader>

              <DrawerBody>
                <Stack spacing="24px">
                  <Box>
                    <FormControl isRequired>
                      <FormLabel htmlFor="eventTitle">
                        Name of the Event
                      </FormLabel>
                      <Input
                        {...methods.register("eventTitle")}
                        required
                        placeholder="Please enter event name"
                        name="eventTitle"
                      />
                      {methods.formState.errors?.eventTitle?.message && (
                        <Text color="red">
                          {methods.formState.errors?.eventTitle?.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl isRequired>
                      <FormLabel htmlFor="eventname">Event Category</FormLabel>
                      <Select
                        onChange={handleChange}
                        name="categories"
                        id="category-select"
                        {...methods.register("eventType", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                        required
                      >
                        {categoryData.map((category) => (
                          <option key={category._id}>
                            {category.eventType}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl isRequired>
                      <FormLabel htmlFor="desc">Description</FormLabel>
                      <Textarea
                        id="desc"
                        placeholder="Enter your event description here..."
                        name="description"
                        required
                        {...methods.register("description", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                      />
                      {methods.formState.errors?.description?.message && (
                        <Text color="red">
                          {methods.formState.errors?.description?.message}
                        </Text>
                      )}
                    </FormControl>
                  </Box>

                  <HStack>
                    <FormControl w="10rem" isRequired>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        variant="outline"
                        border="1px solid"
                        borderColor="gray.600"
                        name="startDate"
                        {...methods.register("startDate", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                      />
                    </FormControl>

                    <FormControl w="10rem" isRequired>
                      <FormLabel>End date</FormLabel>
                      <Input
                        type="date"
                        border="1px solid"
                        borderColor="gray.600"
                        name="endDate"
                        {...methods.register("endDate", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                      />
                    </FormControl>

                    {greater && (
                      <Text color="red">
                        Start Date should be less than end Date
                      </Text>
                    )}
                  </HStack>

                  <HStack>
                    <FormControl w="15rem" isRequired>
                      <FormLabel>Location</FormLabel>
                      <Input
                        required
                        id="location"
                        placeholder="Please enter the location"
                        name="location"
                        {...methods.register("location", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                      />
                      {methods.formState.errors?.location?.message && (
                        <Text color="red">
                          {methods.formState.errors?.location?.message}
                        </Text>
                      )}
                    </FormControl>
                    <FormControl w="20rem">
                      <FormLabel>Related To</FormLabel>
                      <Input
                        id="relatedTo"
                        placeholder="Please enter the related animal"
                        name="relatedTo"
                        {...methods.register("relatedTo", {
                          minLength: 5,
                          maxLength: 20,
                        })}
                      />
                    </FormControl>
                  </HStack>
                </Stack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </FormProvider>
    </>
  );
};

export default CreateEventDialog;
