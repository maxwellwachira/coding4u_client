import { jsPDF } from "jspdf";


const certificateMaker = (uuid: any, courseId: any, name: string, finishDate: string) => {
    const date = new Date(finishDate);
    const fullDate = date.toLocaleString('default', { year: 'numeric', month: 'long', day: 'numeric' });

    const courseName = courseId == 1 ? "beginner" : courseId == 2 ? "intermediate" : "advance"

    const qrCodeApi = 'https://api.qrserver.com/v1/create-qr-code';

    const qrData = `https://coding-4u.com/cert/${courseName}?certid=${uuid}`;

    // Default export is a4 paper, portrait, using millimeters for units
    const doc = new jsPDF({
        orientation: "landscape",
    });

    const course = `CODING4U ${courseName.toUpperCase()} COURSE. On ${fullDate}`;
    const img = new Image();
    img.src = courseId == 1 ? "/certs/beginner_cert.jpeg" : "/certs/intermediate_cert.jpeg";

    const qrCode = new Image();
    qrCode.src = `${qrCodeApi}/?data=${encodeURIComponent(qrData)}&size=100x100`;

    doc.addImage(img, 'JPEG', 0, 0, 297, 210);

    doc.addImage(qrCode, 'PNG', 257, 176, 28, 28);

    doc.setFontSize(36);
    switch(courseId){
        case 1:
            doc.setTextColor(202, 0, 2);
            break;
        case 2:
            doc.setTextColor(27, 40, 207);
            break;
        default:
            doc.setTextColor(202, 0, 2);
            break;
    }

    doc.setFont('Helvetica-Bold');
    doc.text(name, (doc.internal.pageSize.width / 2) + 15, 139, { align: 'center' });
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(15);
    doc.text(course, (doc.internal.pageSize.width / 2) + 15, 154, { align: 'center' });
    doc.setFontSize(17);
    doc.text("Congratulations!", (doc.internal.pageSize.width / 2) + 15, 162, { align: 'center' });
    doc.save("Certificate.pdf");
}

export default certificateMaker;


