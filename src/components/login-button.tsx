import Link from "next/link";
import { Button } from "./ui/button";

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button>Zaloguj się</Button>
    </Link>
  );
}
