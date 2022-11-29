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

const CreateEventDialog = ({ categoryData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const handleChange = (event) => {
    console.log(event.target.value);
  };

  return (
    <>
      <Stack alignItems="flex-end" position="sticky" bottom="10px" width="99%">
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
                />
              </Box>

              <Box>
                <FormLabel htmlFor="eventname">Event Category</FormLabel>
                <Select
                  onChange={handleChange}
                  name="categories"
                  id="category-select"
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
                  />
                </FormControl>

                <FormControl w="10rem">
                  <FormLabel>End date</FormLabel>
                  <Input
                    type="date"
                    border="1px solid"
                    borderColor="gray.600"
                  />
                </FormControl>
              </HStack>
              <Box>
                <FormLabel htmlFor="desc">Description</FormLabel>
                <Textarea
                  id="desc"
                  placeholder="Enter your event description here..."
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
            <Button>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CreateEventDialog;

// event name, event location, event image, event dates, event description, event type
