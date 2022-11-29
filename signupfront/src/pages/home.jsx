import { ChevronDownIcon } from "@chakra-ui/icons";
import { Stack, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Provider from "../chakra-theme/Provider";
import AnimalCard from "../components/AnimalCard";
import ScrollIntoView from "react-scroll-into-view";
import ResponsiveAppBar from "../components/navBar";
import Footer from "../components/Footer";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomePage = () => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		getAnimalData()
  }, []);

  async function getAnimalData() {
  	try{
  		const response = await axios.get('http://localhost:4000/app/getSetOfAnimals', {
  			params: {}}).then(
  				function (response) {
  					setAnimals(response.data);
  					setIsLoaded(true);
  					console.log(response);
  				}
  			);
  	} catch(exception) {
  		console.log(exception)
  	}
  }
  let navigate = useNavigate()

  return (
    <div>
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
            { isLoaded ? (
            	<Stack justify="center" alignItems="center" spacing="1" pt="4rem">
            	<SimpleGrid columns={3} pt="4rem">
								{animals.map((animal) => (
									<AnimalCard key={animal.commonName} {...animal} />
								))}
							</SimpleGrid>
							<span></span>
							<span style={{alignContent:'center'}} onClick = {() => navigate('/animalData')}>View More<KeyboardArrowDownOutlinedIcon/></span>
							<span></span>
							</Stack>
            ) : (
							<> </>
						)}
          </Stack>
        </Stack>
        
        <Footer/>
      </Provider>
    </div>
  );
};

export default HomePage;
