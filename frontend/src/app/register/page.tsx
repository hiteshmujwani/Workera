"use client";

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
  PinInput,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const isOtp = false;

  return (
    <section className="h-screen bg-white">
      <Box>
        <SimpleGrid columns={{ base: 1, lg: 12 }}>
          <GridItem
            colSpan={{ base: 1, lg: 5 }}
            display={{ base: "none", lg: "block" }}
          >
            <VStack
              bg={"black"}
              p={8}
              height={"100vh"}
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
                  Your Dream Job
                </Text>
                <Text textStyle={"5xl"} maxW={"lg"} fontWeight={"bold"}>
                  Is Just a Login Away
                </Text>
                <Text mt={4}>
                  Trust the process, stay consistent — your dream job is already
                  on its way.
                </Text>
                <Text>
                  Every login, every effort, brings you one step closer to the
                  life you’ve always imagined.
                </Text>
              </Box>
            </VStack>
          </GridItem>
          {!isOtp ? (
            <GridItem colSpan={{ base: 1, lg: 7 }}>
              <VStack
                minH={{ base: "100vh", lg: "auto" }}
                justify={{ base: "center", lg: "flex-start" }}
              >
                <Box p={8} display={{ base: "block", lg: "block" }}>
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
                    Create Account
                  </Text>
                  <Text
                    fontWeight={"medium"}
                    color={"gray.400"}
                    textStyle={"sm"}
                    textAlign={"center"}
                  >
                    Enter Your Information Below To Create Your Account
                  </Text>
                </Box>

                <Box
                  width={{ base: "90%", md: "70%", lg: "50%" }}
                  mt={10}
                  px={{ base: 4, lg: 0 }}
                >
                  <SimpleGrid columns={12} gap={4}>
                    <GridItem colSpan={6}>
                      <Field.Root>
                        <Field.Label color={"black"}>First Name</Field.Label>
                        <Input
                          placeholder="Enter Your First Name"
                          color={"black"}
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={6}>
                      <Field.Root>
                        <Field.Label color={"black"}>Last Name</Field.Label>
                        <Input
                          placeholder="Enter Your Last Name"
                          color={"black"}
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Field.Root>
                        <Field.Label color={"black"}>Email</Field.Label>
                        <Input placeholder="Enter Your Email" color={"black"} />
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
                      >
                        Register
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
                    Already Have An Account ?{" "}
                  </Text>
                  <Link
                    textStyle={"sm"}
                    href="/login"
                    color={"black"}
                    fontWeight={"bold"}
                  >
                    Sign in
                  </Link>
                </HStack>
              </VStack>
            </GridItem>
          ) : (
            <GridItem colSpan={{ base: 1, lg: 7 }}>
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height={"100vh"}
                flexDirection={"column"}
              >
                <Box textAlign={"center"} color={"black"}>
                  <Text
                    color={"black"}
                    textStyle={"4xl"}
                    fontWeight={"bold"}
                    mb={2}
                  >
                    Verification Code
                  </Text>
                  <Text>
                    Your Verification code is sent on your email account
                  </Text>
                  <Text>Check your email and get started !</Text>
                </Box>
                <Box mt={6} color={"black"}>
                  <PinInput.Root>
                    <PinInput.HiddenInput />
                    <PinInput.Control gap={4}>
                      <PinInput.Input index={0} placeholder="-" />
                      <PinInput.Input index={1} placeholder="-" />
                      <PinInput.Input index={2} placeholder="-" />
                      <PinInput.Input index={3} placeholder="-" />
                      <PinInput.Input index={4} placeholder="-" />
                      <PinInput.Input index={5} placeholder="-" />
                    </PinInput.Control>
                  </PinInput.Root>
                  <HStack
                    mt={4}
                    color={"black"}
                    px={{ base: 4, lg: 0 }}
                    justify="center"
                  >
                    <Text textStyle={"sm"} fontWeight={"semibold"}>
                      Didn't Recieve the OTP ?{" "}
                    </Text>
                    <Link
                      textStyle={"sm"}
                      href="/"
                      color={"black"}
                      fontWeight={"bold"}
                    >
                      Resend
                    </Link>
                  </HStack>
                  <Button
                    color={"white"}
                    bg={"black"}
                    variant={"solid"}
                    width={"full"}
                    mt={6}
                  >
                    Verify
                  </Button>
                </Box>
              </Flex>
            </GridItem>
          )}
        </SimpleGrid>
      </Box>
    </section>
  );
}
