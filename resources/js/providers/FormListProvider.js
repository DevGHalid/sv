import React, { useContext } from "react";
import FormListContext from "../contexts/FormListContext";

export default function FormListProvider({ children }) {
 return <FormListContext>{children}</FormListContext>;
}
