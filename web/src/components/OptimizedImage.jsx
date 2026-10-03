export default function OptimizedImage({
  loading = "lazy",
  fetchPriority = "auto",
  ...props
}) {
  return (
    <img
      {...props}
      loading={loading}
      decoding="async"
      fetchpriority={fetchPriority}
    />
  );
}