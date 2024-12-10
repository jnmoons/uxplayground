import "@mantine/core/styles.css";
import Head from "next/head";
import { MantineProvider, AppShell, Button, NavLink } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { theme } from "../theme";
import { IconBook, IconBuilding, IconHome2, IconMenu, IconMenu2, IconUser } from "@tabler/icons-react";
import Link from 'next/link';
import styles from "../styles/appshell.module.css"; // Import the CSS module
import '../styles/global.css';

export default function App({ Component, pageProps }: any) {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>UX Playground</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header className={styles.header}>UX Playground</AppShell.Header>
        <AppShell.Navbar>
          
            <NavLink
              href="/courses"
              label="Courses"
              leftSection={<IconBook size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="/clients"
              label="Clients"
              leftSection={<IconBuilding size="1rem" stroke={1.5} />}
            />
            <NavLink
              href="/teachers"
              label="Teachers"
              leftSection={<IconUser size="1rem" stroke={1.5} />}
            />

        </AppShell.Navbar>
        <AppShell.Main>
          {/* <Button onClick={toggleDesktop} visibleFrom="sm">
            <IconMenu2/>
          </Button>
          <Button onClick={toggleMobile} hiddenFrom="sm">
            Toggle navbar
          </Button> */}
          <Component {...pageProps} />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
