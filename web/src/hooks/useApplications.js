import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export function useApplications(searchQuery) {
  const queryClient = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applications", searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      const response = await fetch(`/api/applications/list?${params}`);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch applications");
      }
      return result;
    },
    refetchInterval: 30000,
  });
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const response = await fetch("/api/applications/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to delete application");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error) => {
      console.error("Error deleting application:", error);
    },
  });
  const requestMutation = useMutation({
    mutationFn: async ({ applicationId, action, changes }) => {
      const response = await fetch("/api/applications/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ applicationId, action, changes }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to send approval request");
      }
      return result;
    },
    onError: (error) => {
      console.error("Error submitting application change request:", error);
    },
  });
  return {
    applications: data?.applications || [],
    total: data?.total || 0,
    isAdmin: data?.isAdmin || false,
    isLoading,
    error,
    deleteMutation,
    requestMutation,
    refetch,
  };
}
