import ExcelJS from 'exceljs'; // Asegúrate de tener exceljs instalado: npm install exceljs

interface RegistrationData {
    id: number;
    name: string;
    id_number: string;
    gender: string;
    state: string;
    municipality: string;
    parish: string;
    email: string;
    phone: string;
    create_on: string;
}

export const exportToExcelFunction = async (setIsExporting: React.Dispatch<React.SetStateAction<boolean>>, registrationData: PersonData[]) => {
    setIsExporting(true);

    try {
        // Prepare data for Excel
        const excelData = registrationData.map((row: PersonData) => ({
            ID: row.id,
            "Nombre": row.name,
            "Cedula": row.id_number,
            "Genero": row.gender,
            "Estado": row.state,
            "Municipio": row.municipality,
            "Parroquia": row.parish,
            "Correo": row.email,
            "Telefono": row.phone,
            "Registro": new Date(row.create_on).toLocaleDateString()
        }));

        // Create a new workbook
        const workbook = new ExcelJS.Workbook();
        // Add a worksheet
        const worksheet = workbook.addWorksheet("Registrations");

        // Define columns and their properties, including width
        // exceljs uses a different structure for defining columns and their widths
        worksheet.columns = [
            { header: "ID", key: "ID", width: 5 },
            { header: "Nombre", key: "Nombre", width: 20 },
            { header: "Cedula", key: "Cedula", width: 15 },
            { header: "Estado", key: "Estado", width: 15 },
            { header: "Municipio", key: "Municipio", width: 15 },
            { header: "Parroquia", key: "Parroquia", width: 15 },
            { header: "Registro", key: "Registro", width: 15 },
            { header: "Correo", key: "Correo", width: 25 },
            { header: "Telefono", key: "Telefono", width: 15 },
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
