import CallSignalListener from "../../components/userChat/CallSignalListener";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <CallSignalListener />
    </>
  );
} 