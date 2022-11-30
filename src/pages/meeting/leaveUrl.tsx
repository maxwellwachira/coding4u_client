import { Box,  Container, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import MainLayout from '../../layouts/mainLayout/mainLayout';
import FooterLinks from '../../components/footer/footer';
import { footerData } from '../../constants/footer';
import { colors } from '../../constants/colors';
import clapImage from '../../assets/claps.jpg';
import { useAuthContext } from '../../features/authentication';

const LeaveSession: NextPage = () => {
    const { userMe, auth } = useAuthContext();
  return (
    <>
      <Head>
        <title>Coding4U | Meeting End</title>
        <meta name="description" content="Meeting End Coding4U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container mt="md" mb={50}>
            <Stack justify="center" align="center">
                {auth ? (
                    <Text weight={600} size={28} color={`${colors.primaryColor}`}>Dear {`${userMe.firstName} ${userMe.lastName}`},</Text>   
                    ) : ""}
                <Text> Thank you for joining the live session.</Text>
                <Text>I hope you enjoyed the lesson.</Text>
                <Image 
                    src={clapImage}
                    height={350}
                    width={320}
                    alt="clapImage"
                />
            </Stack>
                    
        </Container>
        <Box>
            <FooterLinks data={footerData}/>
        </Box>
      </MainLayout>
    </>
  );
}

export default LeaveSession;