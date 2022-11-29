import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { bgcolor, Box } from "@mui/system";
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import InsightsIcon from '@mui/icons-material/Insights';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import Button from '@mui/material/Button';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import PetsIcon from '@mui/icons-material/Pets';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import {GiBodyHeight,GiThermometerScale,GiAnimalSkull} from 'react-icons/gi';
import {FaWeight} from 'react-icons/fa';
import {RiNumbersLine} from 'react-icons/ri'

import CardActions from '@mui/material/CardActions';
import { red } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const AnimalsInfo = props => {
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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
  	<div style={{padding:'30px'}}>
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <Item height="100%">
                    <Stack bgImage={animalData?.imageUrl}
                        bgPosition="center"
                        bgRepeat="no-repeat"
                        bgSize="cover"
                        h="35rem"
                        w="full"
                        justify="center"
                        alignItems="center"
                        id="hero">
                    </Stack>
                </Item>
            </Grid>
            <Grid item xs={7}>
				<Stack>
					<Box >
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
							{animalData?.description}
						</Typography>
					</Box>
					<Stack direction='row' >
						<Box style={{marginTop:'0px'}}>
							<Card variant="outlined" sx={{width: 175, height:190}}>
								<CardContent>
									<Typography variant="h5" component="div">
										Height  <GiBodyHeight style={{marginTop:"-5px"}}/>
									</Typography>
									<br/>
									<Typography variant="h7">
										{animalData?.height}
									</Typography>
								</CardContent>
							</Card>
						</Box>
						<Box>
							<Card variant="outlined" sx={{width: 175, height:190}}>
								<CardContent>
									<Typography variant="h5" component="div">
										Weight <FaWeight style={{marginTop:"-6px"}}/>
									</Typography>
									<br/>
									<Typography variant="h7">
										{animalData?.weight}
									</Typography>
								</CardContent>
							</Card>
						</Box>
						<Box>
							<Card variant="outlined" sx={{width: 175, height:190}}>
								<CardContent>
									<Typography variant="h5" component="div">
										Length<GiThermometerScale style={{marginTop:"-6px"}}/>
									</Typography>
									<br/>
									<Typography variant="h7">
										{animalData?.length}
									</Typography>
								</CardContent>
							</Card>
						</Box>
						<Box>
							<Card variant="outlined" sx={{width: 175, height:190}}>
								<CardContent>
									<Typography variant="h5" component="div">
										Population<RiNumbersLine/>
									</Typography>
									<br/>
									<Typography variant="h7">
										{animalData?.population}
									</Typography>
								</CardContent>
							</Card>
						</Box>
					</Stack>
				</Stack>
            </Grid>		
        </Grid>	
		<br/>
		<Grid container spacing={2}>
			<Grid item xs={5}>
				<Box>
					<Card variant="outlined" sx={{width: 300, height:'max-content'}} >
					<CardContent>
					<Typography variant="h5" component="div">
					World Map
					</Typography>
					<br/>
					</CardContent>
					</Card>
				</Box>
			</Grid>
			<Grid item xs={7}>
				<Box>
					<Card variant="outlined" sx={{height:'max-content'}} style={{ width: '100%'}}>
					<CardContent>
					<Typography variant="h5" component="div">
					Description
					</Typography>
					<br/>
					<Typography variant="h7">
						{animalData?.description}
					</Typography>
					<br/>
					<br/>
					<Typography variant="h5" component="div">
					Habitat
					</Typography>
					<br/>
					<Typography variant="h7">
						{animalData?.habitat}
					</Typography>
					<br/>
					<br/>
					<Typography variant="h5" component="div">
					Places
					</Typography>
					<br/>
					<Typography variant="h7">
						{animalData?.places}
					</Typography>
					</CardContent>
					</Card>
				</Box>

			</Grid>
		</Grid>				
    </div>
  );
};

export default AnimalsInfo;