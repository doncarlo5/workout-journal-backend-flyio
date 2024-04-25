import { useContext } from "react";
import { AuthContext } from "./context-wrapper";

export default function () {
    return useContext(AuthContext);
}