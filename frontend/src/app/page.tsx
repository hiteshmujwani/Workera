"use client";

import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Image,
  Span,
  Text,
  VStack,
} from "@chakra-ui/react";
import { RiArrowRightLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Home() {
  const router = useRouter();
  const { data } = useSelector((state: any) => state.user);
  const isAuthenticated = data?.user;

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push(`/${data.user.role}`);
    } else {
      router.push("/register");
    }
  };

  return (
    <section className="min-h-[calc(100vh-4rem)] bg-white relative">
      <Box p={5}>
        <Container>
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
                onClick={handleGetStarted}
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
