export const editableApplicationFields = [
  "full_name",
  "email",
  "phone",
  "status",
  "institution",
  "message",
];

export function validateApplicationChanges(data) {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return "Application details are required";
  }

  if (
    Object.keys(data).some(
      (field) => !editableApplicationFields.includes(field),
    )
  ) {
    return "Application fields must be valid text fields";
  }

  if (
    typeof data.full_name !== "string" ||
    !data.full_name.trim() ||
    typeof data.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()) ||
    typeof data.phone !== "string" ||
    !data.phone.trim()
  ) {
    return "A valid name, email, and phone number are required";
  }

  if (
    editableApplicationFields.some(
      (field) =>
        field in data &&
        data[field] !== null &&
        typeof data[field] !== "string",
    )
  ) {
    return "Application fields must be text";
  }

  return null;
}
