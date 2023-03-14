import { useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import {  Alert,  Center, Container,Paper, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconCheck } from '@tabler/icons';

import MainLayout from '../layouts/mainLayout/mainLayout';
import { urls } from '../constants/urls';
import { useAuthContext } from '../features/authentication';

const PaymentNotification: NextPage = () => {
   
    const router = useRouter();
    const { OrderTrackingId } = router.query;
    const { userMe } = useAuthContext();
    const [ response, setResponse ] = useState('') ;

    const enroll = async(UserId: string, CourseId: string) => {
        try {
            const { status } = await axios.post(`${urls.baseUrl}/enrolment`, {UserId, CourseId});
            if (status === 201){
                return {
                    message: "success"
                };
            }
        } catch (error) {
            console.log(error);
            return {
                message: "error"
            };
        }
    }

    const transactionStatus = async() => {
        try {
            const postData = {
                orderTrackingId: OrderTrackingId
            };
            console.log(postData)
            const { data } = await axios.post(`${urls.baseUrl}/pesapal/transaction-status`, postData );
            if (data.status_code === 1){
                switch (data.amount) {
                    case 649:
                        const machineLearning = await enroll(userMe.id, '6');
                        if (machineLearning?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                    case 599:
                        const web3 = await enroll(userMe.id, '5');
                        if (web3?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                    case 249:
                        const advanced2 = await enroll(userMe.id, '4');
                        if (advanced2?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                    case 199:
                        const advanced = await enroll(userMe.id, '3');
                        if (advanced?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                    case 149:
                        const intermediate = await enroll(userMe.id, '2');
                        if (intermediate?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                    case 99:
                        const beginner = await enroll(userMe.id, '1');
                        if (beginner?.message === "success"){
                            setResponse("Payment was successful");
                            setTimeout(() => {
                                router.push('/students');
                            }, 6000);
                        }
                        break;
                
                    default:
                        setResponse("Error. Contact 254703519593 for further assistance");
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        transactionStatus(); 
    }, []);

    return (
        <>
        <Head>
            <title>Coding4U | Payment Notification</title>
            <meta name="description" content="Coding4U Payment Notification Page" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainLayout>
            <Container>
                <Stack justify="center" align="center" mt={30}>
                    <Paper radius={40} withBorder style={{maxWidth: 400}}>
                      <Center>
                        {
                            response === "" ? "" :
                            <Alert icon={<IconCheck size={16} />} title="Payment status" color="green" radius={40} style={{maxWidth: 400}}>
                                {response}
                            </Alert>
                        }                        
                      </Center>
                    </Paper>
                </Stack>
            </Container>
        </MainLayout>
        </>
    );
}

export default PaymentNotification;