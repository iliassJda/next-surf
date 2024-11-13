import { Dispatch, SetStateAction } from "react";
import { items } from "../../../public/countries.json";
import styles from "./selection.module.css";

export default function CountrySelection({
  handler,
}: {
  handler: Dispatch<SetStateAction<string>>;
}) {
  return (
    <select
      name="nationality"
      id="nationality"
      className={styles.rounded}
      onChange={(event) => handler(event.target.value)}
    >
      <option value="select">Select a Country</option>
      {items.countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
}
