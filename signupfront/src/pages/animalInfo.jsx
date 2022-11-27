import { ChevronDownIcon } from "@chakra-ui/icons";
import { Stack, Heading, Text, SimpleGrid, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Provider from "../chakra-theme/Provider";
import ScrollIntoView from "react-scroll-into-view";
import ResponsiveAppBar from "../components/navBar";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AnimalInfo = props => {
	const [isLoaded, setIsLoaded] = useState(false);
	const [animalData, setAnimalData] = useState({});
	const location = useLocation();

	useEffect(() => {
		getAnimalInfo(location.state.animalName);
  }, []);

  async function getAnimalInfo(name) {
  	try {
  		console.log(name)
  		const response = await axios.get('http://localhost:4000/app/animalInfo', {
  			params: { animalName: "Asian Elephant" }}).then(
  				function (response) {
  					console.log(response);
  					setAnimalData(response.data[0]);
  					console.log(animalData);
  					setIsLoaded(true);
  				}
  			);
  	} catch(exception) {
  		console.log(exception)
  	}
  }

  return (
  	<div>
  		<ResponsiveAppBar />
			{ isLoaded ? (
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Item>
							<Stack bgImage={animalData.imageUrl}
								bgPosition="center"
								bgRepeat="no-repeat"
								bgSize="cover"
								h="30rem"
								w="full"
								justify="center"
								alignItems="center"
								id="hero">
							</Stack>
						</Item>
					</Grid>
					<Grid item xs={4}>
						<Item>
							<List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
									</ListItemAvatar>
									<ListItemText
										primary="Status"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{animalData.status}
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</List>
						</Item>
					</Grid>
					<Grid item xs={8}>
						<Item>
							{animalData.description}
						</Item>
					</Grid>
				</Grid>
				) : (
					<> </>
				)}
    </div>
  );
};

export default AnimalInfo;