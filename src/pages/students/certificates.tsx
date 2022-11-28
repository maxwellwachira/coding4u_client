import {Card, Container, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';

import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import {  IconTrophy } from '@tabler/icons';
import { colors } from '../../constants/colors';


const Certificates: NextPage = () => {

    return (
        <>
        <Head>
            <title>Coding4U Student Certificates</title>
            <meta name="description" content="Coding4U Student Certificates" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <StudentLayout>
            <Container>
                <Card withBorder px={30} radius="md" mt="xl">
                    <Stack align="center">
                        <IconTrophy color={`${colors.primaryColor}`} size={45}/>
                        <Text mt="lg">You have no Certificate</Text>
                        <Text >Complete a course to get one</Text>
                    </Stack>
                </Card>
            </Container>
        </StudentLayout>
        </>
    )
}

export default Certificates;