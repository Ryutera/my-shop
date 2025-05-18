import Link from "next/link";
import { Button } from "./ui/button";

export function EnvVarWarning() {
  return (
    <div className="flex gap-4 items-center">
    
      <div className="flex gap-2">
        <Button
          asChild
          size="sm"
          variant={"outline"}
          
          className="opacity-75 hover:cursor-pointer "
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant={"default"}
          
          className="opacity-75 hover:cursor-pointer"
        >
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
