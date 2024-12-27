interface DocumentsLayoutProps {
  children: React.ReactNode;
}
const DocumentLayout = ({ children }: DocumentsLayoutProps) => {
  return (
    // <div className="flex flex-col gap-y-4">
    //   <nav className="w-full bg-red-500">Document navbar</nav>
    //   {children}
    // </div>
    <div>{children}</div>
  );
};

export default DocumentLayout;
