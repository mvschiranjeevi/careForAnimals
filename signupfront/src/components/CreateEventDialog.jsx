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
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "zod";
import axios from "axios";

const eventsSchema = object({
  eventTitle: string().min(5, "Title is required").max(20),
  eventType: string().min(5, "User Name is required").max(30),
  description: string().min(5, "Description is required").max(1024),
  startDate: string().min(5, "Start Date is required").max(30),
  endDate: string().min(5, "End Date is required").max(30),
  location: string().min(5, "location is required").max(30),
  relatedTo: string().min(0, "location is required").max(30),
}).refine((data) => {});

const CreateEventDialog = ({ categoryData }) => {
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

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:4000/app/createEvent",
      methods.getValues()
    );
    if (response.status == 200) {
      // console.log("Hallelujah!");
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
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="1px">
              Create a new event
            </DrawerHeader>

            <DrawerBody>
              <Stack spacing="24px">
                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="eventname">Name of the Event</FormLabel>
                    <Input
                      ref={firstField}
                      required
                      id="eventname"
                      placeholder="Please enter event name"
                      name="eventTitle"
                      {...methods.register("eventTitle")}
                    />
                  </FormControl>
                </Box>

                <Box>
                  <FormControl isRequired>
                    <FormLabel htmlFor="eventname">Event Category</FormLabel>
                    <Select
                      onChange={handleChange}
                      name="categories"
                      id="category-select"
                      {...methods.register("eventType")}
                      required
                    >
                      {categoryData.map((category) => (
                        <option key={category._id}>{category.eventType}</option>
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
                      {...methods.register("description")}
                    />
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
                      {...methods.register("startDate")}
                    />
                  </FormControl>

                  <FormControl w="10rem" isRequired>
                    <FormLabel>End date</FormLabel>
                    <Input
                      type="date"
                      border="1px solid"
                      borderColor="gray.600"
                      name="endDate"
                      {...methods.register("endDate")}
                    />
                  </FormControl>
                </HStack>

                <HStack>
                  <FormControl w="15rem" isRequired>
                    <FormLabel>Location</FormLabel>
                    <Input
                      // ref={firstField}
                      required
                      id="location"
                      placeholder="Please enter the location"
                      name="location"
                      {...methods.register("location")}
                    />
                  </FormControl>
                  <FormControl w="20rem">
                    <FormLabel>Related To</FormLabel>
                    <Input
                      // ref={firstField}
                      id="relatedTo"
                      placeholder="Please enter the related animal"
                      name="relatedTo"
                      {...methods.register("relatedTo")}
                    />
                  </FormControl>
                </HStack>

                {/* <Box>
                  <FormLabel htmlFor="img">
                    Upload an image of your event here
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="s"
                    type="file"
                  />
                </Box> */}
              </Stack>
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px">
              <Button variant="outline" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Submit</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </FormProvider>
    </>
  );
};

export default CreateEventDialog;

// event name, event location, event image, event dates, event description, event type
