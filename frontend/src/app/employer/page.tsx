"use client";

import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Badge,
  Flex,
  Avatar,
  // ProgressBar,
  ProgressRoot,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  FiUsers,
  FiBriefcase,
  FiEye,
  FiMail,
  FiPhone,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
  FiFileText,
} from "react-icons/fi";

export default function EmployerDashboard() {
  const { data: user } = useSelector((state: any) => state.user);
  const router = useRouter();

  const userName = user?.user?.firstName || user?.user?.name || "Employer";

  // Mock data - replace with real API calls
  const stats = {
    activeJobs: 12,
    totalApplications: 156,
    profileViews: 2340,
    hiredCandidates: 8,
  };

  const recentApplications = [
    {
      id: 1,
      name: "John Doe",
      position: "Frontend Developer",
      status: "pending",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Smith",
      position: "UI/UX Designer",
      status: "reviewed",
      avatar: "SS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Backend Developer",
      status: "interviewed",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Emily Brown",
      position: "Product Manager",
      status: "pending",
      avatar: "EB",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "yellow";
      case "reviewed":
        return "blue";
      case "interviewed":
        return "green";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box bg="white" minH="calc(100vh - 4rem)">
      <Container maxW="8xl" py={8}>
        {/* Welcome Section */}
        <Box mb={8}>
          <Heading size="xl" color="gray.800" mb={2}>
            Welcome, {userName}!
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Here's what's happening with your recruitment today.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={8}>
          {/* Main Content */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* KYC Completion Card */}
              <Box
                bg="orange.50"
                border={"1px solid #d6d6d6"}
                p={6}
                borderRadius="lg"
              >
                <HStack mb={4}>
                  <Icon as={FiClock} color="orange.500" />
                  <Heading size="md" color="orange.700">
                    No Jobs Posted Yet
                  </Heading>
                </HStack>
                <Text color="gray.700" mb={4}>
                  Start by posting your first job to attract top candidates
                  tailored to your company’s needs. Once you post a job, you’ll
                  be able to track applicants, manage interviews, and connect
                  with the right talent — all from your dashboard.
                </Text>
                <ProgressRoot value={65} mb={4}>
                  {/* <ProgressBar bg="orange.400" /> */}
                </ProgressRoot>
                <Button
                  bg="orange.500"
                  color="white"
                  size="sm"
                  _hover={{ bg: "orange.600" }}
                >
                  Post A Job
                </Button>
              </Box>

              {/* Resume Database Card */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={6}>
                  Resume Database
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "2fr 1fr" }}
                  gap={6}
                  alignItems="center"
                >
                  <Box>
                    <VStack align="start" gap={3}>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Easily find relevant candidates from our database with
                          smart search and filters.
                        </Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Reach over to 11.2 crore talented jobseekers.
                        </Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Find quality candidates with completely verified
                          information.
                        </Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Instantly reach candidates using customized
                          communication via Email/Phone/SMS/Chat.
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack mt={6}>
                      <Button
                        bg="blue.500"
                        color="white"
                        _hover={{ bg: "blue.600" }}
                      >
                        Buy Now
                      </Button>
                      <Button
                        variant="outline"
                        borderColor="blue.500"
                        color="blue.500"
                        _hover={{ bg: "blue.50" }}
                      >
                        Request for a demo
                      </Button>
                    </HStack>
                  </Box>
                  <Box textAlign="center">
                    <Icon as={FiUsers} boxSize={20} color="blue.400" />
                  </Box>
                </Grid>
              </Box>

              {/* Job Posting Card */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={6}>
                  Job posting
                </Heading>
                <Grid
                  templateColumns={{ base: "1fr", md: "2fr 1fr" }}
                  gap={6}
                  alignItems="center"
                >
                  <Box>
                    <VStack align="start" gap={3}>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">Post job in just 2 mins.</Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Reach over to 11.2 crore talented jobseekers.
                        </Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Get quality applications guaranteed with 30 days
                          validity of your job ads.
                        </Text>
                      </HStack>
                      <HStack align="start">
                        <Icon as={FiCheckCircle} color="green.500" mt={1} />
                        <Text color="gray.700">
                          Find quality candidates with completely verified
                          information.
                        </Text>
                      </HStack>
                    </VStack>
                    <Button
                      bg="blue.500"
                      color="white"
                      mt={6}
                      _hover={{ bg: "blue.600" }}
                    >
                      Post a Job
                    </Button>
                  </Box>
                  <Box textAlign="center">
                    <Icon as={FiBriefcase} boxSize={20} color="blue.400" />
                  </Box>
                </Grid>
              </Box>
            </VStack>
          </GridItem>

          {/* Sidebar */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Contact Card */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={4}>
                  Contact us
                </Heading>
                <VStack align="start" gap={4}>
                  <HStack>
                    <Icon as={FiPhone} color="blue.500" />
                    <Box>
                      <Text fontWeight="semibold" color="gray.800">
                        +91 9602681408 - 9602681408
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        (10:00 AM - 6:00 PM Mon - Sat)
                      </Text>
                    </Box>
                  </HStack>
                  <HStack>
                    <Icon as={FiMail} color="blue.500" />
                    <Text color="blue.600">support@workera.com</Text>
                  </HStack>
                </VStack>
              </Box>

              {/* Recent Applications */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Flex justify="space-between" align="center" mb={4}>
                  <Heading size="md" color="gray.800">
                    Recent Applications
                  </Heading>
                  <Button
                    size="sm"
                    variant="ghost"
                    color="blue.500"
                    _hover={{ bg: "blue.50" }}
                  >
                    View All
                  </Button>
                </Flex>
                <VStack gap={4} align="stretch">
                  {recentApplications.map((application) => (
                    <Box
                      key={application.id}
                      p={3}
                      bg="gray.50"
                      borderRadius="md"
                    >
                      <HStack justify="space-between">
                        <HStack>
                          <Avatar.Root size="sm" bg="blue.500" color="white">
                            <Avatar.Fallback>
                              {application.avatar}
                            </Avatar.Fallback>
                          </Avatar.Root>
                          <Box>
                            <Text
                              fontWeight="semibold"
                              fontSize="sm"
                              color={"black"}
                            >
                              {application.name}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {application.position}
                            </Text>
                          </Box>
                        </HStack>
                        <Badge
                          bg={`${getStatusColor(application.status)}.100`}
                          color={`${getStatusColor(application.status)}.700`}
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="xs"
                        >
                          {application.status}
                        </Badge>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* Quick Actions */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={4}>
                  Quick Actions
                </Heading>
                <VStack gap={3}>
                  <Button
                    bg="blue.500"
                    color="white"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "blue.600" }}
                    onClick={() => router.push("/employer/post-job")}
                  >
                    <HStack>
                      <Icon as={FiBriefcase} />
                      <Text>Post New Job</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="gray.300"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => router.push("/employer/candidates")}
                  >
                    <HStack>
                      <Icon as={FiUsers} />
                      <Text>Browse Candidates</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="gray.300"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => router.push("/employer/jobs")}
                  >
                    <HStack>
                      <Icon as={FiFileText} />
                      <Text>Manage Jobs</Text>
                    </HStack>
                  </Button>
                </VStack>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
