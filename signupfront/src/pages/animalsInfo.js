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
import backendPath from "../utils/backendPath";
import CardActions from '@mui/material/CardActions';

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
  		const response = await axios.get(backendPath+'/app/animalInfo', {
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
                <Card >
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                        Status
                        <InsightsIcon/>
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {animalData?.status}
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card >
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
                        Population
                        <PetsIcon/>
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {animalData?.population}
                        <span style={{marginRight:'10px'}}>
                        </span>
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                <Card sx={{ maxWidth: 1000 }}>
                    <CardHeader
                        title={animalData?.commonName}
                        subheader={animalData?.sciName}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        {animalData?.threatInfo}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                    <Button variant="outlined">Donate<VolunteerActivismIcon/></Button>
                    <br/>
                        <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        >
                        <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                        <Typography paragraph>
                        {animalData?.description}
                        </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
                <br/>
                <br/>
                
            </Grid>		
        </Grid>					
    </div>
  );
};

export default AnimalsInfo;