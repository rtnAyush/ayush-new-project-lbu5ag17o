import { signIn, signOut } from "./auth";

export const handleGithubLogin = async () => {
    "user server";
    await signIn('github');
};

export const handleGithubLogout = async () => {
    "user server";
    await signOut();
}
