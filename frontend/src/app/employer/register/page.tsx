"use client";

import { Api } from "@/apiClient/ApiClient";
import { REGISTER_EMPLOYER, VERIFY_OTP } from "@/constant/constant";
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
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

export default function EmployerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerifyOtp, setIsVerifyOtp] = useState(false);
  const [bodyData, setBodyData] = useState({});
  const [otpUserId, setOtpUserId] = useState("");
  const [otpValue, setOtpValue]: any = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onInputChange = (field: string, value: string) => {
    setBodyData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      const response = await Api.post(REGISTER_EMPLOYER, bodyData);
      if (response.status == 201) {
        setIsVerifyOtp(true);
        setOtpUserId(response.data.userId);
      }
    } catch (error) {
      console.log(error, "error while register on client");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const otp = otpValue.join("");
      const response = await Api.post(VERIFY_OTP, {
        userId: otpUserId,
        otp,
        ...bodyData, // Pass employer data for profile creation
      });

      if (response.status == 200) {
        const route = response.data.user.role;
        router.push(`/${route}`);
      }
    } catch (error) {
      console.log(error, "error while verifying OTP");
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
                  Build Your Dream Team
                </Text>
                <Text textStyle={"5xl"} maxW={"lg"} fontWeight={"bold"}>
                  Start Hiring Today
                </Text>
                <Text mt={4}>
                  Join thousands of companies finding top talent with AI-powered
                  matching.
                </Text>
                <Text>
                  Post jobs, screen candidates, and build your perfect team
                  faster than ever.
                </Text>
              </Box>
            </VStack>
          </GridItem>
          {!isVerifyOtp ? (
            <GridItem colSpan={{ base: 1, lg: 7 }}>
              <VStack minH={{ base: "100vh" }} justify={{ base: "center" }}>
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
                    Create Employer Account
                  </Text>
                  <Text
                    fontWeight={"medium"}
                    color={"gray.400"}
                    textStyle={"sm"}
                    textAlign={"center"}
                  >
                    Start hiring top talent with our AI-powered platform
                  </Text>
                </Box>

                <Box
                  width={{ base: "90%", md: "70%", lg: "60%" }}
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
                          onChange={(e) =>
                            onInputChange("firstName", e.target.value)
                          }
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
                          onChange={(e) =>
                            onInputChange("lastName", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Field.Root>
                        <Field.Label color={"black"}>
                          Company Name *
                        </Field.Label>
                        <Input
                          placeholder="Enter Your Company Name"
                          color={"black"}
                          onChange={(e) =>
                            onInputChange("companyName", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Field.Root>
                        <Field.Label color={"black"}>Company Email</Field.Label>
                        <Input
                          placeholder="Enter Your Company Email"
                          color={"black"}
                          type="email"
                          onChange={(e) =>
                            onInputChange("email", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={6}>
                      <Field.Root>
                        <Field.Label color={"black"}>Industry</Field.Label>
                        <Input
                          placeholder="e.g. Technology, Healthcare"
                          color={"black"}
                          onChange={(e) =>
                            onInputChange("industry", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={6}>
                      <Field.Root>
                        <Field.Label color={"black"}>Location</Field.Label>
                        <Input
                          placeholder="City, Country"
                          color={"black"}
                          onChange={(e) =>
                            onInputChange("location", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Field.Root>
                        <Field.Label color={"black"}>
                          Company Website
                        </Field.Label>
                        <Input
                          placeholder="https://yourcompany.com"
                          color={"black"}
                          onChange={(e) =>
                            onInputChange("website", e.target.value)
                          }
                        />
                        <Field.ErrorText>This is an error text</Field.ErrorText>
                      </Field.Root>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Field.Root>
                        <Field.Label color={"black"}>
                          Company Description
                        </Field.Label>
                        <Textarea
                          placeholder="Brief description of your company..."
                          color={"black"}
                          rows={3}
                          onChange={(e) =>
                            onInputChange("companyDescription", e.target.value)
                          }
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
                            placeholder="Create a Strong Password"
                            color={"black"}
                            pr="3rem"
                            onChange={(e) =>
                              onInputChange("password", e.target.value)
                            }
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
                        justifyContent={"flex-start"}
                        flexDirection={{ base: "column", sm: "row" }}
                        gap={{ base: 2, sm: 4 }}
                      >
                        <Checkbox.Root>
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                          <Checkbox.Label
                            color={"black"}
                            fontSize={"sm"}
                            fontWeight={"semibold"}
                          >
                            I agree to Terms & Conditions
                          </Checkbox.Label>
                        </Checkbox.Root>
                      </Flex>
                    </GridItem>
                    <GridItem colSpan={12}>
                      <Button
                        variant={"solid"}
                        bg={"black"}
                        width={"full"}
                        color={"white"}
                        onClick={handleRegister}
                        loading={loading}
                      >
                        Create Employer Account
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
                    href="/employer/login"
                    color={"black"}
                    fontWeight={"bold"}
                  >
                    Sign In
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
                    href="/candidate/register"
                    color={"black"}
                    fontWeight={"bold"}
                  >
                    Candidate Register
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
                    Your verification code has been sent to your company email
                  </Text>
                  <Text>Check your email and verify to start hiring!</Text>
                </Box>
                <Box mt={6} color={"black"}>
                  <PinInput.Root
                    onValueChange={(details: any) => setOtpValue(details.value)}
                  >
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
                      Didn't Receive the OTP ?{" "}
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
                    onClick={handleVerifyOtp}
                    loading={loading}
                  >
                    Verify & Start Hiring
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
