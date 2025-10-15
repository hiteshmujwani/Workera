"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
  Avatar,
  DrawerRoot,
  DrawerBody,
  DrawerHeader,
  DrawerBackdrop,
  DrawerContent,
  DrawerCloseTrigger,
  VStack,
  Text,
  Separator,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout, logoutUser } from "@/redux/userSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const isAuthenticated = data?.user;
  const userRole = data?.user?.role;
  const userName = data?.user?.name || data?.user?.firstName || "User";

  const handleLogin = () => {
    router.push("/candidate/login");
  };

  const handleRegister = () => {
    router.push("/candidate/register");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    onClose();
    router.push("/");
  };

  const getCandidateNavLinks = () => [
    { label: "Jobs", href: "/jobs" },
    { label: "Companies", href: "/companies" },
    { label: "Career Resources", href: "/resources" },
    { label: "My Applications", href: "/candidate/applications" },
  ];

  const getEmployerNavLinks = () => [
    { label: "Post Job", href: "/employer/post-job" },
    { label: "Manage Jobs", href: "/employer/jobs" },
    { label: "Candidates", href: "/employer/candidates" },
    { label: "Company Profile", href: "/employer/profile" },
  ];

  const getCandidateMenuItems = () => [
    { label: "Dashboard", href: "/candidate" },
    { label: "Profile", href: "/candidate/profile" },
    { label: "My Applications", href: "/candidate/applications" },
    { label: "Saved Jobs", href: "/candidate/saved" },
    { label: "Settings", href: "/candidate/settings" },
  ];

  const getEmployerMenuItems = () => [
    { label: "Dashboard", href: "/employer" },
    { label: "Company Profile", href: "/employer/profile" },
    { label: "Manage Jobs", href: "/employer/jobs" },
    { label: "Candidates", href: "/employer/candidates" },
    { label: "Settings", href: "/employer/settings" },
  ];

  const navLinks =
    userRole === "employer" ? getEmployerNavLinks() : getCandidateNavLinks();
  const menuItems =
    userRole === "employer" ? getEmployerMenuItems() : getCandidateMenuItems();

  return (
    <Container className="bg-white">
      <Flex justifyContent={"space-between"} alignItems={"center"} minH="16">
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
          {isAuthenticated ? (
            <HStack gap={8} display={{ base: "none", lg: "flex" }}>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  textDecoration={"none"}
                  outline={"none"}
                  fontSize={"sm"}
                  fontWeight={"semibold"}
                  color={"gray.700"}
                  _hover={{ color: "black" }}
                >
                  {link.label}
                </Link>
              ))}
            </HStack>
          ) : (
            <HStack gap={8}>
              <Link
                href="/jobs"
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
                href="/companies"
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
                href="/resources"
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
                href="/employer"
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
          )}
        </Box>
        <Box>
          {isAuthenticated ? (
            <HStack>
              <Avatar.Root
                size="sm"
                bg="blue.500"
                color="white"
                cursor="pointer"
                onClick={onOpen}
                _hover={{ bg: "blue.600" }}
              >
                <Avatar.Fallback>
                  {userName.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
            </HStack>
          ) : (
            <HStack>
              <Button
                variant={"outline"}
                fontWeight={"medium"}
                color={"black"}
                _hover={{ color: "white" }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Button
                variant={"subtle"}
                fontWeight={"medium"}
                onClick={handleRegister}
              >
                Register
              </Button>
            </HStack>
          )}
        </Box>
      </Flex>

      {/* User Menu Drawer */}
      <DrawerRoot
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
        placement="end"
      >
        <DrawerBackdrop />
        <DrawerContent
          bg="gray.50"
          h="100vh"
          w="320px"
          position="fixed"
          right="0"
          top="0"
          borderLeft="1px solid"
          borderColor="gray.200"
          shadow="xl"
        >
          <DrawerCloseTrigger
            position="absolute"
            top="4"
            right="4"
            zIndex="10"
          />
          <DrawerHeader
            bg="white"
            borderBottom="1px solid"
            borderColor="gray.200"
            py="6"
            px="6"
          >
            <VStack align="start" gap={3}>
              <Avatar.Root size="lg" bg="blue.500" color="white">
                <Avatar.Fallback>
                  {userName.charAt(0).toUpperCase()}
                </Avatar.Fallback>
              </Avatar.Root>
              <Box>
                <Text fontSize="xl" fontWeight="bold" color="gray.800">
                  {userName}
                </Text>
                <Text fontSize="sm" color="gray.600" textTransform="capitalize">
                  {userRole}
                </Text>
              </Box>
            </VStack>
          </DrawerHeader>

          <DrawerBody p="6">
            <VStack align="stretch" gap={2}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  justifyContent="flex-start"
                  h="12"
                  px="4"
                  fontSize="md"
                  fontWeight="medium"
                  color="gray.700"
                  _hover={{
                    bg: "white",
                    color: "gray.900",
                    shadow: "sm",
                  }}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                >
                  {item.label}
                </Button>
              ))}

              <Separator my="6" borderColor="gray.300" />

              <Button
                variant="ghost"
                justifyContent="flex-start"
                h="12"
                px="4"
                fontSize="md"
                fontWeight="medium"
                color="red.600"
                _hover={{
                  bg: "red.50",
                  color: "red.700",
                }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </DrawerRoot>
    </Container>
  );
}
