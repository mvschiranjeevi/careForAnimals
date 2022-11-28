// import {
//   Drawer,
//   DrawerBody,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   useDisclosure,
//   Button,
//   Stack,
//   Box,
//   Snackbar,
//   Container,
//   Alert,
//   FormLabel,
//   Input,
//   Select,
//   Textarea,
//   FormControl,
//   HStack,
// } from "@chakra-ui/react";
// import { AddIcon } from "@chakra-ui/icons";
import {
  Container,
  Grid,
  Box,
  Typography,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { object, string } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";
import axios from "axios";
import { useState } from "react";

const eventSchema = object({
  eventType: string().min(1, "Event Type is required").max(15),
  eventTitle: string().min(1, "Title is required").max(30),
  location: string().min(1, "location is required").max(30),
  description: string().min(1, "Description is required").max(70),
});

const CreateEventDialog = ({ categoryData }) => {
  const defaultValues = {
    eventType: "",
    eventTitle: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    picture: "",
  };
  const methods = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues,
  });

  const onSubmitHandler = async (values) => {
    console.log(JSON.stringify(values, null, 4));

    axios
      .post("http://localhost:4000/app/createEvent", values)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setEventCreated(true);
        }
      })
      .catch((error) => {
        const response = error.response;

        if (response.status === 409) {
          setEventNotCreated(true);
        }
      });
  };

  const handleClose = () => {
    setEventCreated(false);
    setEventNotCreated(false);
  };

  const [eventCreated, setEventCreated] = useState(false);
  const [eventNotCreated, setEventNotCreated] = useState(false);

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const firstField = React.useRef();
  // const handleChange = (event) => {
  //   console.log(event.target.value);
  // };

  return (
    <Container
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: { xs: "#fff", md: "#f4f4f4" } }}
    >
      <Snackbar
        open={eventNotCreated}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="warning"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Event is not created!
        </Alert>
      </Snackbar>
      <Snackbar
        open={eventCreated}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Event created Successfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: "0 0 5px #ddd" },
              py: "6rem",
              px: "1rem",
            }}
          >
            <FormProvider {...methods}>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: "center",
                  width: "100%",
                  mb: "1.5rem",
                  pb: { sm: "3rem" },
                }}
              >
                Create New Event
              </Typography>
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ borderRight: { sm: "1px solid #ddd" } }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{ textAlign: "center", mb: "1.5rem" }}
                    >
                      Create new your account
                    </Typography>

                    <FormInput
                      label="Event Title"
                      type="text"
                      name="eventTitle"
                      focused
                      required
                    />
                    <FormInput
                      label="Description"
                      type="text"
                      name="description"
                      focused
                      required
                    />
                    <FormInput
                      label="Start Date"
                      type="date"
                      name="startDate"
                      focused
                      required
                    />
                    <FormInput
                      type="date"
                      label="End Date"
                      name="endDate"
                      required
                      focused
                    />
                    <FormInput
                      label="Location"
                      type="text"
                      name="location"
                      focused
                      required
                    />

                    <LoadingButton
                      loading={false}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
      {/* <Drawer
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
            <form onSubmit={handleSubmit}>
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
                  <FormControl w="20rem">
                    <FormLabel htmlFor="location">Location</FormLabel>
                    <Input
                      ref={firstField}
                      id="location"
                      placeholder="Please enter the event location"
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
                  <Input size="sm" type="file" />
                </Box>
              </Stack>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </Container>
  );
};

export default CreateEventDialog;

// event name, event location, event image, event dates, event description, event type
