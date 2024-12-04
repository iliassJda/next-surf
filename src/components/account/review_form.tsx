import Input from "./input";
import LoginButton from "./button";
import styles from "@/app/account/account.module.css";

export default function ReviewForm(probs: any) {
  return (
    <form action="">
      <Input type="text" placeholder="Name" />
      <br></br>
      <Input type="text" placeholder="Surname" />
      <br></br>
      <Input type="email" placeholder="name.surname@mail.com" />
      <br></br>
      <Input type="password" />
      <br></br>
      <LoginButton value="Update" />
    </form>
  );
}