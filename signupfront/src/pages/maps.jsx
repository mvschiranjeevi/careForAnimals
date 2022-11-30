// @ts-nocheck
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import {
  MapsComponent,
  LayersDirective,
  LayerDirective,
  MarkersDirective,
  Legend,
  MarkerDirective,
  MapsTooltip,
  Marker,
  Inject,
} from "@syncfusion/ej2-react-maps";
import backendPath from "../utils/backendPath";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const AnimalsInfo = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [animalData, setAnimalData] = useState({});
  const location = useLocation();

  useEffect(() => {
    getAnimalInfo(location.state.animalName);
  }, []);

  async function getAnimalInfo(name) {
    try {
      const response = await axios
        .get(backendPath+"/app/animalInfo", {
          params: { animalName: name },
        })
        .then(function (response) {
        	if(response.data.length !== 0){
        		const animal = response.data[0];
        		const places = JSON.parse(animal.places[0])
        		animal['placeData'] = []
        		if(animal.places.length !== 0){
        			for(let index in places){
        				animal['placeData'].push({
        					"name" : places[index][0],
        					"latitude" : places[index][1],
        					"longitude" : places[index][2]
        				})
        			}
        		}
        		setAnimalData(animal);
						setIsLoaded(true);
        	}
        });
    } catch (exception) {
      console.log(exception);
    }
  }

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Box>
        <Card variant="outlined" sx={{ height: "max-content" }}>
          <CardContent>
            <Typography variant="h5" component="div" ml="35rem">
              <div>
                <b>Where They Are Located</b>
              </div>
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              position: "sticky",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
          { isLoaded ? (
          	<MapsComponent
              id="maps"
              zoomSettings={{ zoomFactor: 2}}
              legendSettings={{
                visible: true,
                type: "Markers",
                useMarkerShape: true,
                toggleLegendSettings: {
                  enable: true,
                  applyShapeSettings: false,
                  border: {
                    color: "green",
                    width: 2,
                  },
                },
              }}
            >
              <Inject services={[Marker, Legend, MapsTooltip]} />
              <LayersDirective>
                <LayerDirective urlTemplate="https://tile.openstreetmap.org/level/tileX/tileY.png">
                  <MarkersDirective>
                    <MarkerDirective
                      visible={true}
                      height={20}
                      width={20}
                      animationDuration={0}
                      tooltipSettings={{
                        visible: true,
                        valuePath: "name",
                      }}
											dataSource={animalData?.placeData}
                      shapeValuePath="shape"
                      legendText="name"
                    />
                  </MarkersDirective>
                </LayerDirective>
              </LayersDirective>
            </MapsComponent>
          ) : (
							<> </>
					)}
            <br />
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card
          variant="outlined"
          sx={{ height: "max-content" }}
          style={{ width: "100%", background: "#1A202C ", color: "white" }}
        >
          <CardContent>
            <Typography variant="h5" component="div" ml="40rem">
              Threat Info
            </Typography>
            <br />
            <Typography>{animalData?.threatInfo}</Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default AnimalsInfo;
