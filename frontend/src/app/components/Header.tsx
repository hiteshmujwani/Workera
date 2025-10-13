"use client";

import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Link,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function Header() {
  const router = useRouter();
  const { data } = useSelector((state: any) => state.user);
  const isAuthenticated = data?.user;

  const handleLogin = () => {
    router.push("/login");
  };

  const handleRegister = () => {
    router.push("/register");
  };

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
          {isAuthenticated ? (
            <HStack>
              <Button
                variant={"outline"}
                fontWeight={"medium"}
                color={"black"}
                onClick={() => router.push(`/${data.user.role}`)}
              >
                Dashboard
              </Button>
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
    </Container>
  );
}
