export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-6 md:gap-12 items-start px-4 md:px-0">{children}</div>
  );
}
