"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Clock, X } from "lucide-react";

const formatField = (value) => (value === null || value === "" ? "—" : value);

export function ApprovalRequests({ isDark }) {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["application-change-requests"],
    queryFn: async () => {
      const response = await fetch("/api/applications/requests");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to load approval requests");
      }
      return result;
    },
    refetchInterval: 30000,
  });
  const reviewMutation = useMutation({
    mutationFn: async ({ id, decision }) => {
      const response = await fetch(`/api/applications/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to review request");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application-change-requests"] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });

  const panelClass = isDark
    ? "bg-slate-900 border border-slate-800 text-slate-200"
    : "bg-white/70 border border-purple-200 text-gray-700";
  const requests = data?.requests || [];

  return (
    <section className={`rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 ${panelClass}`}>
      <div className="flex items-center gap-3 mb-4">
        <Clock size={20} className="text-violet-500" />
        <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
          Applicant Change Requests
        </h2>
        {requests.length > 0 && (
          <span className="rounded-full bg-violet-600 px-2.5 py-1 text-xs font-bold text-white">
            {requests.length}
          </span>
        )}
      </div>
      {isLoading ? (
        <p className="text-sm opacity-70">Loading requests...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : requests.length === 0 ? (
        <p className="text-sm opacity-70">There are no requests awaiting review.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <article
              key={request.id}
              className={`rounded-xl border p-4 ${
                isDark ? "border-slate-700 bg-slate-950/60" : "border-purple-100 bg-white/70"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-bold">
                    {request.request_type === "delete"
                      ? "Delete applicant"
                      : "Edit applicant"}{" "}
                    <span className="font-normal">
                      (application #{request.application_id})
                    </span>
                  </p>
                  <p className="text-sm opacity-75 mt-1 break-all">
                    Requested by {request.requester_name || request.requester_email} ·{" "}
                    {request.requester_email}
                  </p>
                  <p className="text-xs opacity-60 mt-1">
                    {new Date(request.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  <button
                    type="button"
                    onClick={() =>
                      reviewMutation.mutate({
                        id: request.id,
                        decision: "reject",
                      })
                    }
                    disabled={reviewMutation.isPending}
                    className="min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-semibold bg-red-600/10 text-red-500 hover:bg-red-600/20 disabled:opacity-50 sm:flex-none"
                  >
                    <X size={16} className="inline mr-1" />
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      reviewMutation.mutate({
                        id: request.id,
                        decision: "approve",
                      })
                    }
                    disabled={reviewMutation.isPending}
                    className="min-h-11 flex-1 rounded-lg px-3 py-2 text-sm font-semibold bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 sm:flex-none"
                  >
                    <Check size={16} className="inline mr-1" />
                    Approve
                  </button>
                </div>
              </div>
              {request.request_type === "edit" && (
                <div className="grid md:grid-cols-2 gap-4 mt-4 text-sm">
                  <div>
                    <h3 className="text-xs font-bold uppercase opacity-60 mb-2">
                      Current applicant details
                    </h3>
                    <dl className="space-y-2">
                      {Object.keys(request.request_data || {}).map((field) => (
                        <div key={field} className="min-w-0">
                          <dt className="text-xs uppercase opacity-60">
                            {field.replaceAll("_", " ")}
                          </dt>
                          <dd className="break-words">
                            {formatField(request[`current_${field}`])}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase opacity-60 mb-2">
                      Requested changes
                    </h3>
                    <dl className="space-y-2">
                      {Object.entries(request.request_data || {}).map(
                        ([field, value]) => (
                          <div key={field} className="min-w-0">
                            <dt className="text-xs uppercase opacity-60">
                              {field.replaceAll("_", " ")}
                            </dt>
                            <dd className="break-words">{formatField(value)}</dd>
                          </div>
                        ),
                      )}
                    </dl>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
      {reviewMutation.error && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          {reviewMutation.error.message}
        </p>
      )}
    </section>
  );
}
