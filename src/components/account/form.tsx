import Input from "./input";
import LoginButton from "./button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import CountrySelection from "../selection/selection";
import styles from "@/app/account/account.module.css";

export default async function Form(probs: any) {
  const session = await auth();
  let name = "";
  let surname = "";
  let email = "";
  let nationality = "";
    if (session){
    const user = session?.user
    email = user?.email  as string;
    const existinguser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (existinguser){
      name = existinguser.firstname;
      surname = existinguser.lastname;
      nationality = existinguser.nationality;
    }
    }
  return (
    <form action="">
      <Input type="text" placeholder={name} />
      <br></br>
      <Input type="text" placeholder={surname} />
      <br></br>
      <CountrySelection className={`${styles.input} py-3 px-2`}/>
      <br></br>
      <Input type="password" />
      <br></br>
      <Input type="password" />
      <br></br>
      <LoginButton value="Update" />
    </form>
  );
}
