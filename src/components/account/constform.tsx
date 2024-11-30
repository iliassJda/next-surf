import ROInput from "./roinput";
import styles from "@/app/account/account.module.css";

export default function Form(probs: any) {
  return (
    <form action="">
      <ROInput type="text" value="Name" />
      <br></br>
      <ROInput type="text" value="Surname" />
      <br></br>
      <ROInput type="email" value="name.surname@mail.com" />
      <br></br>
      <ROInput type="text" value="Colombia" />
      <br></br>
    </form>
  );
}