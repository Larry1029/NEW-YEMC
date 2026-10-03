import { formatDate } from "./formatters";
export const exportToCSV = (applications) => {
  if (!applications || applications.length === 0) {
    alert("No applications to export");
    return;
  }
  const headers = [
    "Full Name",
    "Email",
    "Phone",
    "Status",
    "Institution",
    "Message",
    "Submitted At",
  ];
  const csvRows = [headers.join(",")];
  applications.forEach((app) => {
    const row = [
      `"${app.full_name?.replace(/"/g, '""') || ""}"`,
      `"${app.email?.replace(/"/g, '""') || ""}"`,
      `"${app.phone?.replace(/"/g, '""') || ""}"`,
      `"${app.status?.replace(/"/g, '""') || ""}"`,
      `"${app.institution?.replace(/"/g, '""') || ""}"`,
      `"${app.message?.replace(/"/g, '""') || ""}"`,
      `"${formatDate(app.created_at)}"`,
    ];
    csvRows.push(row.join(","));
  });
  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `yemc-applications-${new Date().toISOString().split("T")[0]}.csv`,
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
