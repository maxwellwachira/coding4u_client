import { useEffect, useState } from 'react';
import { Badge, Center, Container, Grid, Group, Pagination, Paper, Stack, Text } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import axios from 'axios';

import { colors } from '../../constants/colors';
import { useAuthContext } from '../../features/authentication';
import { urls } from '../../constants/urls';
import ReferralTable from '../../features/referrals/components/referralTable/referralsTable';
import { StudentLayout } from '../../layouts/studentLayout/studentLayout';
import network from '../../assets/network.png';
import { getCookie } from 'cookies-next';

interface ReferralData {
    totalReferrals: number;
    totalPages: number;
    currentPage: number;
    referrals: {
        id: string;
        UserId: string;
        fullName: string;
        email: string;
        paid: boolean;
        createdAt: string;
        updatedAt: string;
    }[]
}

interface TableData {
    id: string;
    count: number;
    fullName: string;
    email: string;
    hasEnrolled: boolean | string;
    date: string;
    paid: boolean;
}

const Referrals: NextPage = () => {
    const [activePage, setPage] = useState(1);
    const [hasEnrolled, setHasEnrolled] = useState<Array<number> | null>(null);
    const [referralData, setReferralData] = useState<ReferralData | null>(null);

    const limit = 10;

    const { userMe } = useAuthContext();

    let token = getCookie('accessToken');


    const hasReferralEnrolled = async(referrals: ReferralData) => {
        let enrolmentArr : Array<number> = [];
        try {
            if(referrals){
                await Promise.all(referrals.referrals.map(async (el) => {
                    const referral = await axios.get(`${urls.baseUrl}/user/email/${el.email}`);
                    const { data } = await axios.get(`${urls.baseUrl}/enrolment/count/${referral.data.id}`);
                    if (data) enrolmentArr.push(data.count);
                }))
            }
            setHasEnrolled(enrolmentArr);
            console.log(enrolmentArr)
        } catch (error) {
            console.log(error);
        }
    }

    const getAllReferrals = async () => {
        try {
            const { data } = await axios.get(`${urls.baseUrl}/referral/my-referrals`, { headers: { Authorization: `Bear ${token}` } });
            setReferralData(data);
            hasReferralEnrolled(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const computeHasEnrolled = (index: number) => {
        if(hasEnrolled){
            if(hasEnrolled[index] > 0) return true;
            return false;
        }
        return "loading...";
    }

    const tableData = () => {
        let data: TableData[] = [];
        referralData?.referrals.map(async (el, index) => {
            let referral = {
                id: el.id,
                hasEnrolled: computeHasEnrolled(index),
                count: (activePage - 1) * limit + ++index,
                fullName: el.fullName,
                email: el.email,
                paid: el.paid,
                date: (new Date(el.createdAt)).toLocaleString()
            }
            data.push(referral);
        });

        return data;
    }

    useEffect(() => {
        getAllReferrals();
    }, [activePage]);


    return (
        <>
            <Head>
                <title>Luddoc | Referrals</title>
                <meta name="description" content="Network, Referrals" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <StudentLayout>
                <Container>
                    <Paper withBorder mt='xl'>
                        <Grid>
                            <Grid.Col md={6}>
                                <Stack p='xl' style={{ minHeight: 350 }} justify="center" align="center">
                                    <Image
                                        src={network}
                                        height={300}
                                        width={300}
                                        alt="Network"
                                    />
                                </Stack>
                            </Grid.Col>
                            <Grid.Col md={6}>
                                <Stack p='xl' style={{ minHeight: 350 }} justify="center" align="center">
                                    <Text size={28} color={`${colors.primaryColor}`} weight={600} mt="lg" >My Referrals</Text>
                                    <Group position='apart'>
                                        <Text>Total referrals:</Text>
                                        <Badge color="dark">{referralData?.totalReferrals} Referrals</Badge>
                                    </Group>
                                    <Text><b>NB:</b> You will only be paid once your referral has paid for a course. All payments are done on Friday every week</Text>
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Paper>
                    <ReferralTable data={tableData()} />
                    <Center mt="xl">
                        <Pagination total={referralData ? referralData.totalPages : 2} color='gray' page={activePage} onChange={setPage} />
                    </Center>
                </Container>
            </StudentLayout>
        </>
    )

}

export default Referrals;