import {
  Stack,
  Heading,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnimalCard = (props) => {
  const { imageUrl, commonName } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHover, setIsHover] = useState(false);
  let navigate = useNavigate()

  const onMouseOver = () => setIsHover(true);
  const onMouseDown = () => setIsHover(false);
  const onClick = () => onOpen();

  const handleClose = () => {
    onClose();
    setIsHover(false);
  };
  return (
    <Stack
      bgImage={`url(${imageUrl})`}
      w='15rem'
      h='15rem'
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      _hover={{ opacity: 0.8 }}
      justify="center"
      alignItems="center"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseDown}
      onClick = {() => navigate('/animalInfo', {state:{animalName: commonName}})}
    >
      {isHover && <Heading color="white">{commonName}</Heading>}
    </Stack>
  );
};

const AnimalDetails = (props) => {
  const { isOpen, onClose, commonName } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{commonName}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          bibendum lorem enim, et viverra purus congue non. Cras interdum eget
          tellus at lacinia. Vivamus sit amet felis quis felis dignissim
          lobortis vel nec libero. Sed aliquet sem eu enim luctus, at bibendum
          purus consequat. Maecenas quis justo tincidunt nibh euismod dignissim.
          Pellentesque pellentesque urna sit amet leo feugiat posuere. Integer
          laoreet orci a eros vulputate egestas. Quisque scelerisque auctor
          dolor, eu vestibulum mauris sollicitudin nec. Aenean erat enim, rutrum
          vitae tempor ut, elementum ac nulla.
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="outline">Wikipedia</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AnimalCard;
