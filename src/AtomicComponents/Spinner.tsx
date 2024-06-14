export const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-[--fg-accent] border-t-[--text-color]" />
    </div>
  );
};
