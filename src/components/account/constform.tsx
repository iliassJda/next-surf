
import ROInput from "./roinput";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
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
      <ROInput type="text" value={name} />
      <br></br>
      <ROInput type="text" value={surname} />
      <br></br>
      <ROInput type="email" value={email} />
      <br></br>
      <ROInput type="text" value={nationality} />
      <br></br>
    </form>
  );
}