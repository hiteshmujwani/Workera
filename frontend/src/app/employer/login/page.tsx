"use client";

import { Api } from "@/apiClient/ApiClient";
import { LOGIN_EMPLOYER } from "@/constant/constant";
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  GridItem,
  HStack,
  IconButton,
  Image,
  Input,
  Link,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function EmployerLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [bodyData, setBodyData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onInputChange = (field: string, value: string) => {
    setBodyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await Api.post(LOGIN_EMPLOYER, bodyData);
      if (response.status == 200) {
        router.push(`/${response.data.user.role}`);
      }
    } catch (error) {
      console.log(error, "error while log in on client side");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-white">
      <Box>
        <SimpleGrid columns={{ base: 1, lg: 12 }}>
          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            display={{ base: "none", lg: "block" }}
          >
            <VStack
              bg={"black"}
              p={8}
              minH={"100vh"}
              height={"100%"}
              width={"full"}
              justifyContent={"space-between"}
              alignItems={"flex-start"}
            >
              <Box>
                <HStack gap={2}>
                  <Image
                    src="/assets/logo_light.png"
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
                    color={"white"}
                  >
                    Workera
                  </Link>
                </HStack>
              </Box>
              <Box>
                <Text textStyle={"5xl"} maxW={"lg"} fontWeight={"bold"}>
                  Find Top Talent
                </Text>
                <Text textStyle={"5xl"} maxW={"lg"} fontWeight={"bold"}>
                  For Your Company
                </Text>
                <Text mt={4}>
                  Connect with skilled professionals and build your dream team.
                </Text>
                <Text>
                  Post jobs, review applications, and hire the best candidates
                  with AI-powered matching.
                </Text>
              </Box>
            </VStack>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 7 }}>
            <VStack
              minH={{ base: "100vh", lg: "100%" }}
              justify={{ base: "center" }}
            >
              <Box p={8} display={{ base: "block" }}>
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
              <Box maxW={"md"} px={{ base: 4, lg: 0 }}>
                <Text
                  fontWeight={"bold"}
                  color={"black"}
                  textStyle={{ base: "4xl", lg: "5xl" }}
                  textAlign={"center"}
                >
                  Employer Login
                </Text>
                <Text
                  fontWeight={"medium"}
                  color={"gray.400"}
                  textStyle={"sm"}
                  textAlign={"center"}
                >
                  Access your employer dashboard to manage jobs and candidates
                </Text>
              </Box>

              <Box
                width={{ base: "90%", md: "70%", lg: "50%" }}
                mt={10}
                px={{ base: 4, lg: 0 }}
              >
                <SimpleGrid columns={12} gap={4}>
                  <GridItem colSpan={12}>
                    <Field.Root>
                      <Field.Label color={"black"}>Email</Field.Label>
                      <Input
                        placeholder="Enter Your Company Email"
                        color={"black"}
                        onChange={(e) => onInputChange("email", e.target.value)}
                      />
                      <Field.ErrorText>This is an error text</Field.ErrorText>
                    </Field.Root>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <Field.Root>
                      <Field.Label color={"black"}>Password</Field.Label>
                      <Box position="relative" width={"full"}>
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter Your Password"
                          color={"black"}
                          onChange={(e) =>
                            onInputChange("password", e.target.value)
                          }
                          pr="3rem"
                        />
                        <IconButton
                          position="absolute"
                          right="0.5rem"
                          top="50%"
                          transform="translateY(-50%)"
                          variant="solid"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                        </IconButton>
                      </Box>
                      <Field.ErrorText>This is an error text</Field.ErrorText>
                    </Field.Root>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <Flex
                      justifyContent={"space-between"}
                      flexDirection={{ base: "row", sm: "row" }}
                      gap={{ base: 2, sm: 0 }}
                    >
                      <Checkbox.Root>
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label
                          color={"black"}
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                        >
                          Remember me
                        </Checkbox.Label>
                      </Checkbox.Root>
                      <Link
                        href="/"
                        color={"black"}
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                      >
                        Forgot Password ?
                      </Link>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={12}>
                    <Button
                      variant={"solid"}
                      bg={"black"}
                      width={"full"}
                      color={"white"}
                      onClick={handleLogin}
                      loading={loading}
                    >
                      Log In as Employer
                    </Button>
                  </GridItem>
                </SimpleGrid>
              </Box>

              <HStack
                mt={4}
                color={"black"}
                px={{ base: 4, lg: 0 }}
                justify="center"
              >
                <Text textStyle={"sm"} fontWeight={"semibold"}>
                  Don't Have An Account ?{" "}
                </Text>
                <Link
                  textStyle={"sm"}
                  href="/employer/register"
                  color={"black"}
                  fontWeight={"bold"}
                >
                  Sign Up
                </Link>
              </HStack>

              <HStack
                mt={2}
                color={"black"}
                px={{ base: 4, lg: 0 }}
                justify="center"
              >
                <Text textStyle={"sm"} fontWeight={"semibold"}>
                  Looking for a job?{" "}
                </Text>
                <Link
                  textStyle={"sm"}
                  href="/candidate/login"
                  color={"black"}
                  fontWeight={"bold"}
                >
                  Candidate Login
                </Link>
              </HStack>
            </VStack>
          </GridItem>
        </SimpleGrid>
      </Box>
    </section>
  );
}
