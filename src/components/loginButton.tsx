import { useSession, signIn, signOut } from "next-auth/react";
import ButtonComponent from "@/src/components/Button";

const SignInOutButton = () => {
  const { data: session } = useSession();
  const googleIcon =
    "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg";

  return (
    <>
      {session?.user?.image ? (
        <ButtonComponent pic={session.user.image} onClick={() => signOut()} />
      ) : (
        <ButtonComponent
          pic={googleIcon}
          text={"Sign in with Google"}
          onClick={() => signIn("google")}
        />
      )}
    </>
  );
};

export default SignInOutButton;
