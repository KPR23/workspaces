import { signIn } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Github } from "lucide-react";

async function handleGitHubSignIn() {
  try {
    await signIn.social({ provider: "github" });
  } catch (error) {
    console.error("Error signing in with GitHub:", error);
  }
}
export default function Login() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-semibold">Witaj ponownie 👋🏻</h1>
            <p className="text-balance text-sm text-muted-foreground">
              Zaloguj się za pomocą swojego konta GitHub
            </p>
          </div>
          <Button
            onClick={handleGitHubSignIn}
            className="flex w-full items-center justify-center gap-2"
          >
            <Github className="h-4 w-4" />
            Zaloguj się przez GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
