export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-center font-semibold uppercase  py-3 text-rose-flora bg-red-100  rounded-lg">
      {children}
    </div>
  );
}
