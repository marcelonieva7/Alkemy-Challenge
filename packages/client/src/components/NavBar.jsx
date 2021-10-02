import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// import { ColorModeSwitcher } from '../ColorModeSwitcher';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';

const NavBar = ({ userData }) => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        align="center"
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom={1}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        borderStyle="solid"
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        px={{ base: 4 }}
        py={{ base: 2 }}
      >
        <Flex
          display={{ base: 'flex', md: 'none' }}
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
        >
          <IconButton
            aria-label="Toggle Navigation"
            icon={isOpen ? <CloseIcon h={3} w={3} /> : <HamburgerIcon h={5} w={5} />}
            variant="ghost"
            onClick={onToggle}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link as={RouterLink} to="/">
            <Text
              color={useColorModeValue('gray.800', 'white')}
              fontFamily="heading"
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            >
              Home
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav userData={userData} />
          </Flex>
        </Flex>
        <Stack
          align="center"
          direction="row"
          flex={{ base: 1, md: 0 }}
          justify="flex-end"
          spacing={6}
        >
          <IconButton
            alignSelf="flex-end"
            icon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
            isRound="true"
            size="lg"
            onClick={toggleColorMode}
          />
          {userData ? <Logout mobile={false} /> : <Login mobile={false} />}
        </Stack>
      </Flex>

      <Collapse animateOpacity in={isOpen}>
        <MobileNav userData={userData} />
      </Collapse>
    </Box>
  );
};

const Login = ({ mobile }) => (
  <Button
    _hover={{
      bg: 'pink.300',
    }}
    as={RouterLink}
    bg="pink.400"
    color="white"
    display={{ base: mobile ? 'inline-flex' : 'none', md: !mobile ? 'inline-flex' : 'none' }}
    fontSize="sm"
    fontWeight={600}
    to="/login"
  >
    Iniciar Sesión
  </Button>
);

const Logout = ({ mobile }) => (
  <Button
    _hover={{
      bg: 'red.300',
    }}
    as={Link}
    bg="pink.400"
    color="white"
    display={{ base: mobile ? 'inline-flex' : 'none', md: !mobile ? 'inline-flex' : 'none' }}
    fontSize="sm"
    fontWeight={600}
    href="https://covidcentre.herokuapp.com/"
  >
    Cerrar Sesión
  </Button>
);

const NAV_ITEMS = (userData) => [
  {
    label: 'Operaciones',
    href: '/operations',
  },
  // {
  //   label: 'Operaciones',
  //   children: [
  //     {
  //       label: 'La Rioja',
  //       // subLabel: 'La Rioja Capital',
  //       href: '/operations',
  //     },
  //   ],
  // },
  userData?.roles === 'User'
    ? {
        label: 'Administrar',
        children: [
          {
            label: 'Centros de vacunación',
            // subLabel: 'Find your dream design job',
            href: '/admin/centers',
          },
          // {
          //   label: 'Freelance Projects',
          //   subLabel: 'An exclusive list for contract work',
          //   href: '#',
          // },
        ],
      }
    : null,
];

const DesktopNav = ({ userData }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const navItems = NAV_ITEMS(userData);

  return (
    <Stack direction="row" spacing={4}>
      {navItems.map(
        (navItem) =>
          navItem && (
            <Box key={navItem.label}>
              <Popover placement="bottom-start" trigger="hover">
                <PopoverTrigger>
                  <Link
                    _hover={{
                      textDecoration: 'none',
                      color: linkHoverColor,
                    }}
                    as={RouterLink}
                    color={linkColor}
                    fontSize="sm"
                    fontWeight={500}
                    p={2}
                    to={navItem.href ?? '#'}
                  >
                    {navItem.label}
                  </Link>
                </PopoverTrigger>

                {navItem.children && (
                  <PopoverContent
                    bg={popoverContentBgColor}
                    border={0}
                    boxShadow="xl"
                    minW="sm"
                    p={4}
                    rounded="xl"
                  >
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            </Box>
          ),
      )}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href }) => (
  <Link
    _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}
    as={RouterLink}
    display="block"
    p={2}
    role="group"
    rounded="md"
    to={href}
  >
    <Stack align="center" direction="row">
      <Box>
        <Text _groupHover={{ color: 'pink.400' }} fontWeight={500} transition="all .3s ease">
          {label}
        </Text>
        {/* <Text fontSize="sm">{subLabel}</Text> */}
      </Box>
      <Flex
        _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
        align="center"
        flex={1}
        justify="flex-end"
        opacity={0}
        transform="translateX(-10px)"
        transition="all .3s ease"
      >
        <Icon as={ChevronRightIcon} color="pink.400" h={5} w={5} />
      </Flex>
    </Stack>
  </Link>
);

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        _hover={{
          textDecoration: 'none',
        }}
        align="center"
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        py={2}
      >
        <Text color={useColorModeValue('gray.600', 'gray.200')} fontWeight={600}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            h={6}
            transform={isOpen ? 'rotate(180deg)' : ''}
            transition="all .25s ease-in-out"
            w={6}
          />
        )}
      </Flex>

      <Collapse animateOpacity in={isOpen} style={{ marginTop: '0!important' }}>
        <Stack
          align="start"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          borderLeft={1}
          borderStyle="solid"
          mt={2}
          pl={4}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} as={RouterLink} py={2} to={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const MobileNav = ({ userData }) => {
  const navItems = NAV_ITEMS(userData);

  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} display={{ base: 'flex', md: 'none' }} p={4}>
      {navItems.map((navItem) => navItem && <MobileNavItem key={navItem.label} {...navItem} />)}
      {userData ? <Logout mobile /> : <Login mobile />}
    </Stack>
  );
};

export default NavBar;
