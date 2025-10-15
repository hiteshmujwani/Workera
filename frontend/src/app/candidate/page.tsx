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
  ProgressRoot,
  // ProgressBar,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUser } from "@/redux/userSlice";
import {
  FiUser,
  FiFileText,
  FiEye,
  FiBookmark,
  FiMapPin,
  FiClock,
  FiDollarSign,
  FiBriefcase,
  FiTrendingUp,
  FiCheckCircle,
  FiAlertCircle,
  FiSearch,
} from "react-icons/fi";

export default function CandidateDashboard() {
  const { data } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const userName = data?.user?.firstName || data?.user?.name || "Candidate";

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Mock data for candidate stats
  const stats = {
    profileViews: 45,
    appliedJobs: 8,
    savedJobs: 12,
    profileCompletion: 65,
  };

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      type: "application",
      company: "Tech Corp",
      position: "Frontend Developer",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "view",
      company: "StartupXYZ",
      position: "UI Designer",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "save",
      company: "BigTech Inc",
      position: "Full Stack Developer",
      time: "2 days ago",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "application":
        return FiFileText;
      case "view":
        return FiEye;
      case "save":
        return FiBookmark;
      default:
        return FiFileText;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "application":
        return "blue";
      case "view":
        return "green";
      case "save":
        return "orange";
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
            Welcome back, {userName}!
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Discover your next career opportunity.
          </Text>
        </Box>

        <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={8}>
          {/* Left Column - Jobs Section */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Profile Completion Card */}
              <Box
                bg="blue.50"
                border="1px solid #d6d6d6"
                p={6}
                borderRadius="lg"
              >
                <HStack mb={4}>
                  <Icon as={FiAlertCircle} color="blue.500" />
                  <Heading size="md" color="blue.700">
                    Complete your profile
                  </Heading>
                </HStack>
                <Text color="gray.700" mb={4}>
                  A complete profile helps employers find you and increases your
                  chances of getting hired.
                </Text>
                <ProgressRoot value={stats.profileCompletion} mb={4}>
                  {/* <ProgressBar bg="blue.400" /> */}
                </ProgressRoot>
                <Button
                  bg="blue.500"
                  color="white"
                  size="sm"
                  _hover={{ bg: "blue.600" }}
                >
                  Complete Profile
                </Button>
              </Box>

              {/* Jobs Section */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Flex justify="space-between" align="center" mb={6}>
                  <Heading size="md" color="gray.800">
                    Recommended Jobs
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

                {/* No Jobs Card */}
                <Box textAlign="center" py={12}>
                  <Icon as={FiSearch} boxSize={16} color="gray.300" mb={4} />
                  <Heading size="lg" color="gray.600" mb={2}>
                    No jobs yet
                  </Heading>
                  <Text color="gray.500" mb={6} maxW="md" mx="auto">
                    Please complete your profile first so we can recommend you
                    the best matches of jobs based on your skills and
                    preferences.
                  </Text>
                  <VStack gap={3}>
                    <Button
                      bg="blue.500"
                      color="white"
                      _hover={{ bg: "blue.600" }}
                      onClick={() => router.push("/candidate/profile")}
                    >
                      Complete Profile
                    </Button>
                    <Button
                      variant="outline"
                      borderColor="gray.300"
                      _hover={{ bg: "gray.50" }}
                      onClick={() => router.push("/jobs")}
                    >
                      Browse All Jobs
                    </Button>
                  </VStack>
                </Box>
              </Box>
            </VStack>
          </GridItem>

          {/* Right Column - Job Details & Activities */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Job Details Placeholder */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={6}>
                  Job Details
                </Heading>

                {/* No Job Selected Card */}
                <Box textAlign="center" py={12}>
                  <Icon as={FiBriefcase} boxSize={16} color="gray.300" mb={4} />
                  <Heading size="lg" color="gray.600" mb={2}>
                    Select a job to view details
                  </Heading>
                  <Text color="gray.500" mb={6}>
                    Click on any job from the left panel to see detailed
                    information including job description, requirements, and
                    company details.
                  </Text>
                  <Button
                    bg="blue.500"
                    color="white"
                    _hover={{ bg: "blue.600" }}
                    onClick={() => router.push("/jobs")}
                  >
                    Explore Jobs
                  </Button>
                </Box>
              </Box>

              {/* Recent Activity */}
              <Box
                bg="white"
                p={6}
                borderRadius="lg"
                border="1px solid #d6d6d6"
              >
                <Heading size="md" color="gray.800" mb={4}>
                  Recent Activity
                </Heading>
                <VStack gap={4} align="stretch">
                  {recentActivities.map((activity) => (
                    <Box key={activity.id} p={4} bg="gray.50" borderRadius="md">
                      <HStack justify="space-between">
                        <HStack>
                          <Box
                            p={2}
                            borderRadius="md"
                            bg={`${getActivityColor(activity.type)}.100`}
                          >
                            <Icon
                              as={getActivityIcon(activity.type)}
                              color={`${getActivityColor(activity.type)}.600`}
                            />
                          </Box>
                          <Box>
                            <Text
                              fontWeight="semibold"
                              fontSize="sm"
                              color={"black"}
                            >
                              {activity.company}
                            </Text>
                            <Text fontSize="xs" color="gray.600">
                              {activity.position}
                            </Text>
                          </Box>
                        </HStack>
                        <Text fontSize="xs" color="gray.500">
                          {activity.time}
                        </Text>
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
                    onClick={() => router.push("/candidate/profile")}
                  >
                    <HStack>
                      <Icon as={FiUser} />
                      <Text>Update Profile</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="gray.300"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => router.push("/jobs")}
                  >
                    <HStack>
                      <Icon as={FiSearch} />
                      <Text>Search Jobs</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="gray.300"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => router.push("/candidate/applications")}
                  >
                    <HStack>
                      <Icon as={FiFileText} />
                      <Text>My Applications</Text>
                    </HStack>
                  </Button>
                  <Button
                    variant="outline"
                    borderColor="gray.300"
                    w="full"
                    justifyContent="flex-start"
                    _hover={{ bg: "gray.50" }}
                    onClick={() => router.push("/candidate/saved")}
                  >
                    <HStack>
                      <Icon as={FiBookmark} />
                      <Text>Saved Jobs</Text>
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
