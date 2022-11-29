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
  eventTitle: string().min(5, "Title is required").max(30),
  eventType: string().min(5, "User Name is required").max(30),
  description: string().min(5, "Description is required").max(1024),
  startDate: string().min(5, "Start Date is required").max(30),
  endDate: string().min(5, "End Date is required").max(30),
  location: string().min(5, "End Date is required").max(30),
});

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
    location: "California",
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
      console.log("Hallelujah!");
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
                  <FormLabel htmlFor="eventname">Name of the Event</FormLabel>
                  <Input
                    ref={firstField}
                    id="eventname"
                    placeholder="Please enter event name"
                    name="eventTitle"
                    {...methods.register("eventTitle")}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="eventname">Event Category</FormLabel>
                  <Select
                    onChange={handleChange}
                    name="categories"
                    id="category-select"
                    {...methods.register("eventType")}
                  >
                    {categoryData.map((category) => (
                      <option key={category._id}>{category.eventType}</option>
                    ))}
                  </Select>
                </Box>

                <HStack>
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
                </HStack>
                <Box>
                  <FormLabel htmlFor="desc">Description</FormLabel>
                  <Textarea
                    id="desc"
                    placeholder="Enter your event description here..."
                    name="description"
                    {...methods.register("description")}
                  />
                </Box>

                <Box>
                  <FormLabel htmlFor="img">
                    Upload an image of your event here
                  </FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="file"
                  />
                </Box>
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
