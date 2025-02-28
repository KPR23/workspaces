import { signIn } from "~/lib/auth-client";
import { Button } from "./ui/button";

async function handleGitHubSignIn() {
  try {
    await signIn.social({ provider: "github" });
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
  }
}

export default function Login() {
  return <Button onClick={handleGitHubSignIn}>Zaloguj się</Button>;
}
