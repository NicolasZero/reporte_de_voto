import ExcelJS from 'exceljs'; // Asegúrate de tener exceljs instalado: npm install exceljs

interface PersonData {
    id: string;
    name: string;
    idNumber: string;
    state: string;
    municipality: string;
    parish: string;
    registrationDate: string;
    email: string;
    phone: string;
}

export const exportToExcelFunction = async (setIsExporting: React.Dispatch<React.SetStateAction<boolean>>, registrationData: PersonData[]) => {
    setIsExporting(true);

    try {
        // Prepare data for Excel
        const excelData = registrationData.map((row: PersonData) => ({
            ID: row.id,
            "Full Name": row.name,
            "ID Number": row.idNumber,
            State: row.state,
            Municipality: row.municipality,
            Parish: row.parish,
            "Registration Date": new Date(row.registrationDate).toLocaleDateString(),
            Email: row.email,
            Phone: row.phone,
        }));

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        // Add a worksheet
        const worksheet = workbook.addWorksheet("Registrations");

        // Define columns and their properties, including width
        // exceljs uses a different structure for defining columns and their widths
        worksheet.columns = [
            { header: "ID", key: "ID", width: 5 },
            { header: "Full Name", key: "Full Name", width: 20 },
            { header: "ID Number", key: "ID Number", width: 15 },
            { header: "State", key: "State", width: 15 },
            { header: "Municipality", key: "Municipality", width: 15 },
            { header: "Parish", key: "Parish", width: 15 },
            { header: "Registration Date", key: "Registration Date", width: 15 },
            { header: "Email", key: "Email", width: 25 },
            { header: "Phone", key: "Phone", width: 15 },
        ];

        // Add rows to the worksheet
        // The addRows method automatically maps the objects to the defined columns
        worksheet.addRows(excelData);

        // Generate Excel file as array buffer
        const excelBuffer = await workbook.xlsx.writeBuffer();

        // Create blob and download
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `registrations_${new Date().toISOString().split("T")[0]}.xlsx`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error("Error exporting Excel:", error);
    } finally {
        setIsExporting(false);
    }
};
