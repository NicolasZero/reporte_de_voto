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

export const exportToExcelFunction = async (setIsExporting: React.Dispatch<React.SetStateAction<boolean>>, registrationData: any) => {
    setIsExporting(true)

    try {
        // Dynamic import of xlsx library
        const XLSX = await import("xlsx")

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
        }))

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new()
        const worksheet = XLSX.utils.json_to_sheet(excelData)

        // Set column widths
        const columnWidths = [
            { wch: 5 }, // ID
            { wch: 20 }, // Full Name
            { wch: 15 }, // ID Number
            { wch: 15 }, // State
            { wch: 15 }, // Municipality
            { wch: 15 }, // Parish
            { wch: 15 }, // Registration Date
            { wch: 25 }, // Email
            { wch: 15 }, // Phone
        ]
        worksheet["!cols"] = columnWidths

        // Add worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations")

        // Generate Excel file as array buffer (browser-compatible)
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        })

        // Create blob and download
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        })

        const link = document.createElement("a")
        const url = URL.createObjectURL(blob)
        link.setAttribute("href", url)
        link.setAttribute("download", `registrations_${new Date().toISOString().split("T")[0]}.xlsx`)
        link.style.visibility = "hidden"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    } catch (error) {
        console.error("Error exporting Excel:", error)
    } finally {
        setIsExporting(false)
    }
}