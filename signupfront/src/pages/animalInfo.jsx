import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ReactReadMoreReadLess from "react-read-more-read-less"

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
  		const response = await axios.get('http://localhost:4000/app/animalInfo', {
  			params: { animalName: name }}).then(
  				function (response) {
  					setAnimalData(response.data[0]);
  					setIsLoaded(true);
  					console.log(response);
  				}
  			);
  	} catch(exception) {
  		console.log(exception)
  	}
  }

  return (
  	<div>
			{ isLoaded ? (
				<Grid container spacing={1}>
				    <Grid item xs={1}></Grid>
					<Grid item xs={5}>
						<Item height="100%">
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
					<Grid item xs={5}>
						<Item height="100%">
						    <List sx={{ width: '100%', height: '30rem'}}>
								<ListItem alignItems="flex-start" sx={{ width: '100%', height: '7.5rem', overflowY: 'scroll'}}>
									<ListItemText
										primary="WHY THEY MATTER"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													<ReactReadMoreReadLess
                                                        charLimit = {800}
                                                        readMoreText = {"Read more ⬇"}
                                                        readLessText = {"Read less ⬇"}
                                                    >
                                                        {animalData.threatInfo}
                                                    </ReactReadMoreReadLess>
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider component="li" />
								<ListItem alignItems="flex-start" sx={{ width: '100%', height: '22.5rem', overflowY: 'scroll'}}>
									<ListItemText
										primary="ABOUT"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													<ReactReadMoreReadLess
                                                        charLimit = {800}
                                                        readMoreText = {"Read more ⬇"}
                                                        readLessText = {"Read less ⬆"}
                                                    >
                                                        {animalData.description}
                                                    </ReactReadMoreReadLess>
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
							</List>
						</Item>
					</Grid>
					<Grid item xs={1}></Grid>
					<Grid item xs={1}></Grid>
					<Grid item xs={2}>
						<Item>
							<List sx={{ width: '100%', maxWidth: 360}}>
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar src="/assets/icons/endangered.png" />
									</ListItemAvatar>
									<ListItemText
										primary="STATUS"
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
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar src="/assets/icons/population.png" />
									</ListItemAvatar>
									<ListItemText
										primary="POPULATION"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{animalData.population}
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
								<ListItem alignItems="flex-start">
									<ListItemAvatar>
										<Avatar src="/assets/icons/sci.png" />
									</ListItemAvatar>
									<ListItemText
										primary="SCIENTIFIC NAME"
										secondary={
											<React.Fragment>
												<Typography
													sx={{ display: 'inline' }}
													component="span"
													variant="body2"
													color="text.primary"
												>
													{animalData.sciName}
												</Typography>
											</React.Fragment>
										}
									/>
								</ListItem>
								<Divider variant="inset" component="li" />
							</List>
						</Item>
					</Grid>
					<Grid item xs={1}></Grid>
				</Grid>
				) : (
					<> </>
				)}
    </div>
  );
};

export default AnimalInfo;