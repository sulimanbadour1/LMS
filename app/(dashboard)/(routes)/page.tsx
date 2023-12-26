import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      Hello World
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
