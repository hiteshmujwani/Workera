import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BiSearch } from "react-icons/bi";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";

export default function Home() {
  return (
    <section className="!h-screen bg-white relative">
      <Box p={5}>
        <Container>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Box>
              <HStack gap={2}>
                <Image
                  src="/assets/logo.png"
                  boxSize="35px"
                  borderRadius="lg"
                  fit="cover"
                  alt="Workera"
                />
                <Link
                  href="/"
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"2xl"}
                  fontWeight={"bold"}
                  color={"black"}
                >
                  Workera
                </Link>
              </HStack>
            </Box>
            <Box>
              <HStack gap={8}>
                <Link
                  href="/"
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.700"}
                  _hover={{ color: "black" }}
                >
                  Jobs
                </Link>
                <Link
                  href="/"
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.700"}
                  _hover={{ color: "black" }}
                >
                  Companies
                </Link>
                <Link
                  href="/"
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.700"}
                  _hover={{ color: "black" }}
                >
                  Career Resources
                </Link>
                <Link
                  href="/"
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.700"}
                  _hover={{ color: "black" }}
                >
                  For Employers
                </Link>
              </HStack>
            </Box>
            <Box>
              <HStack>
                <Button
                  variant={"outline"}
                  fontWeight={"medium"}
                  color={"black"}
                  _hover={{ color: "white" }}
                >
                  Login
                </Button>
                <Button variant={"subtle"} fontWeight={"medium"}>
                  Register
                </Button>
              </HStack>
            </Box>
          </Flex>
          <Flex justifyContent={"center"} alignItems={"center"} mt={20}>
            <VStack alignContent={"center"}>
              <Badge rounded={"full"} px={3} py={1}>
                ✨ AI Powered Job Platform
              </Badge>
              <Box maxW={"xl"} m={-2}>
                <Text
                  textStyle={"5xl"}
                  textAlign={"center"}
                  color={"black"}
                  fontWeight={"bold"}
                >
                  Your Next Job Is
                </Text>

                <Text
                  textStyle={"5xl"}
                  textAlign={"center"}
                  color={"black"}
                  fontWeight={"bold"}
                  mt={-2}
                >
                  Just <Span className="gradient-text">One Click</Span> Away
                </Text>
                <Text
                  textAlign={"center"}
                  mt={4}
                  color={"gray.800"}
                  fontWeight={"medium"}
                  textStyle={"md"}
                >
                  Our AI-powered job portal helps you find, apply, and get hired
                  faster. Smarter matches, real insights, and career
                  growth—instantly.
                </Text>
              </Box>

              <Button
                bg={"black"}
                color={"white"}
                variant="solid"
                mt={4}
                fontWeight={"semibold"}
              >
                Get Started <RiArrowRightLine />
              </Button>
            </VStack>
          </Flex>
          <Box position={"fixed"} bottom={0}>
            <Image src={"/assets/hero_cards.png"} width={"full"} />
          </Box>
        </Container>
      </Box>
    </section>
  );
}
