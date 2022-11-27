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

const AnimalCard = (props) => {
  const { src, width, height, name } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHover, setIsHover] = useState(false);

  const onMouseOver = () => setIsHover(true);
  const onMouseDown = () => setIsHover(false);
  const onClick = () => onOpen();

  const handleClose = () => {
    onClose();
    setIsHover(false);
  };
  return (
    <Stack
      bgImage={`url(${src})`}
      w={width}
      h={height}
      bgPosition="center"
      bgRepeat="no-repeat"
      bgSize="cover"
      _hover={{ opacity: 0.8 }}
      justify="center"
      alignItems="center"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseDown}
      onClick={onClick}
    >
      {isHover && <Heading color="white">{name}</Heading>}
      <AnimalDetails isOpen={isOpen} onClose={handleClose} name={name} />
    </Stack>
  );
};

const AnimalDetails = (props) => {
  const { isOpen, onClose, name } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
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
