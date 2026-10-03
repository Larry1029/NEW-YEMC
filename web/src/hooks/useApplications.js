import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
export function useApplications(searchQuery) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["applications", searchQuery],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      const response = await fetch(`/api/applications/list?${params}`);
      if (!response.ok) throw new Error("Failed to fetch applications");
      return response.json();
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
      if (!response.ok) throw new Error("Failed to delete application"); 
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["applications"]);
    },
    onError: (error) => {
      console.error("Error deleting application:", error);
      alert("Failed to delete application. Please try again.");
    },
  });
  return {
    applications: data?.applications || [],
    total: data?.total || 0,
    isLoading,
    error,
    deleteMutation,
  };
}
