interface RegistrationData {
    id: number;
    name: string;
    idNumber: string;
    state: string;
    municipality: string;
    parish: string;
    registrationDate: string;
    email: string;
    phone: string;
}

export const exportToCsvFunction = (
    data: RegistrationData[],
    setIsExporting: (status: boolean) => void,
    filename: string = "registrations"
) => {
    setIsExporting(true);
    try {
        const headers = [
            "ID",
            "Full Name",
            "ID Number",
            "State",
            "Municipality",
            "Parish",
            "Registration Date",
            "Email",
            "Phone",
        ];

        // *** CAMBIO CLAVE 1: Usar punto y coma como delimitador ***
        const CSV_DELIMITER = ";";

        const rows = data.map((row) => {
            // Asegúrate de escapar comillas dobles dentro de los campos
            // y luego rodear el campo con comillas dobles si contiene el delimitador o saltos de línea.
            const escapeAndQuote = (value: any) => {
                let stringValue = String(value);
                if (stringValue.includes(CSV_DELIMITER) || stringValue.includes('"') || stringValue.includes('\n')) {
                    return `"${stringValue.replace(/"/g, '""')}"`;
                }
                return stringValue;
            };

            return [
                escapeAndQuote(row.id),
                escapeAndQuote(row.name),
                escapeAndQuote(row.idNumber),
                escapeAndQuote(row.state),
                escapeAndQuote(row.municipality),
                escapeAndQuote(row.parish),
                escapeAndQuote(new Date(row.registrationDate).toLocaleDateString("es-VE")), // Formato de fecha para Venezuela
                escapeAndQuote(row.email),
                escapeAndQuote(row.phone),
            ].join(CSV_DELIMITER);
        });

        const csvContent = [
            headers.join(CSV_DELIMITER),
            ...rows,
        ].join("\n");

        // *** CAMBIO CLAVE 2: Añadir el BOM (Byte Order Mark) para UTF-8 ***
        // Esto ayuda a Excel a reconocer la codificación correctamente, especialmente con acentos y 'ñ'.
        const BOM = "\uFEFF";
        const finalCsvContent = BOM + csvContent;

        // *** CAMBIO CLAVE 3: Especificar un tipo MIME más genérico si el anterior causa problemas ***
        // text/csv;charset=utf-8; está bien, pero a veces application/csv es más tolerante
        const blob = new Blob([finalCsvContent], { type: "text/csv;charset=utf-8;" });
        
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${filename}_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error exporting CSV:", error);
        // Aquí podrías añadir una notificación al usuario, por ejemplo, un "toast"
    } finally {
        setIsExporting(false);
    }
}