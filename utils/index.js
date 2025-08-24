const ExcelJS = require("exceljs");

async function createExcelWithHeader() {
  // Step 1: Create a new workbook and add a worksheet
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Sheet with Header",{
    headerFooter:{firstHeader: "Hello Exceljs", firstFooter: "Hello World"}
  });
    sheet.pageSetup.horizontalCentered = true
  // Step 2: Define the header row
  const header = ["ID", "Name", "Age", "City"];

  // Step 3: Add the header row to the worksheet
  const headerRow = sheet.addRow(header);

  // Step 4: Apply styles to the header row
  headerRow.eachCell((cell) => {
    cell.font = { bold: true }; // Make header text bold
    cell.alignment = { horizontal: "center", vertical: "middle" }; // Center-align text
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB6C1" }, // Light pink background color
    };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Step 5: Add data rows under the header
  const data = [
    [1, "Alice", 25, "New York"],
    [2, "Bob", 30, "Los Angeles"],
    [3, "Charlie", 35, "Chicago"],
  ];

  data.forEach((row) => sheet.addRow(row));

  // Step 6: Adjust column widths
  sheet.columns = [
    { width: 10 }, // Adjust width for "ID"
    { width: 20 }, // Adjust width for "Name"
    { width: 10 }, // Adjust width for "Age"
    { width: 25 }, // Adjust width for "City"
  ];

  // Save the workbook to a file
 
  await workbook.xlsx.writeFile("excel-with-header.xlsx");
  console.log("Excel file created with header: excel-with-header.xlsx");
}

createExcelWithHeader();
