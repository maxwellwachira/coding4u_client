import { Table } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";

interface ReferralData {
   type?: string;
   data: {
    id: string;
    count: number;
    fullName: string;
    email: string;
    hasEnrolled: boolean | string;
    date: string;
    paid: boolean;
   }[]
};

const ReferralTable = ({data, type}: ReferralData) => {
    const { width } = useViewportSize();

    const rows =  data.map((element)=> (
        <tr key={element.fullName}>
            <td>{element.count}</td>
            <td>{element.fullName}</td>
            {width > 768 && <td>{element.email}</td>}
            <td>{element.hasEnrolled === "loading..." ?  "loading...": element.hasEnrolled === false ? "No" : "Yes" }</td>
            {width > 768 && <td>{element.date}</td>}
            <td>{element.paid ? "Yes" : "No"}</td>
        </tr>
    ))
    return (
        <Table  striped highlightOnHover captionSide="bottom" mt={60}>
            <caption>Coding4U Referrals</caption>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    {width > 768 && <th>Email</th>}
                    <th>Has Enrolled</th>
                    {width > 768 && <th>Date</th>}
                    <th>Paid</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>

    );
}

export default ReferralTable;