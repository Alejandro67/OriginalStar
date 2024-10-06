"use client";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  Button,
  Divider,
} from "@chakra-ui/react";
import { exoplanets } from "../exoplanets";
import Banner from "../../public/images/banner.jpg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const handleExpo = (name: string) => {
    router.push(encodeURI(`/space?exoplanet=${name}`));
  };

  const handleRef = (info: string) => {
    window.open(info, "_blank");
  };

  return (
    <Flex direction={"column"} bg={"#232427"} h="100vh">
      <Flex justify={"center"} pb={5} textAlign="center">
        <Box
          bgImage={Banner.src}
          bgPosition="center"
          bgSize="cover"
          bgRepeat="no-repeat"
          height="200px"
          w={"100%"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection={"column"}
        >
          <Heading color="white" fontSize={80} textAlign="center">
            Original Star
          </Heading>
          <Text mt={10} color={"white"} fontWeight={"bold"}>
            Members: Alejandro M | Kevin M | Fernando B | Ulises O | Daniel C |
            Marcos V
          </Text>
        </Box>
      </Flex>

      <Flex w={"100%"} direction={"column"} align="center">
        <Heading textAlign={"center"} color={"white"} fontSize={25}>
          Select one of the following Exoplanet to visualize the sky from their
          point of view
        </Heading>
        <Flex
          align="center"
          w={"100%"}
          m={"2%"}
          gap={5}
          justify={"space-between"}
        >
          <SimpleGrid columns={{ base: 3, md: 2, lg: 5 }} spacing={3} p={5}>
            {exoplanets.map((planet) => (
              <Box
                key={planet.name}
                maxW="400px"
                borderWidth="1px"
                borderRadius={10}
                boxShadow="lg"
                overflow="hidden"
                _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
                cursor="pointer"
                bg="black"
                p={1}
                m={2}
              >
                <Image
                  borderRadius={10}
                  ml={3}
                  mt={2}
                  src={planet.uriImage}
                  alt={planet.name}
                  boxSize="200px"
                  objectFit="cover"
                />
                <Box p="4">
                  <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                    fontSize="lg"
                    color="white"
                    textAlign="center"
                  >
                    {planet.name}
                  </Text>
                  <Divider my={3} />{" "}
                  <Text fontSize="sm" color="white">
                    <strong>RA:</strong> {planet.ra}
                  </Text>
                  <Text fontSize="sm" color="white">
                    <strong>Dec:</strong> {planet.dec}
                  </Text>
                  <Text fontSize="sm" color="white">
                    <strong>Distance:</strong> {planet.d} años luz
                  </Text>
                  <Divider my={3} />{" "}
                  <Flex justify={"space-around"} mt={10}>
                    <Button
                      colorScheme="teal"
                      onClick={() => handleRef(planet.info)}
                    >
                      Info
                    </Button>
                    <Button
                      colorScheme="teal"
                      onClick={() => handleExpo(planet.name)}
                    >
                      Expo
                    </Button>
                  </Flex>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  );
}
