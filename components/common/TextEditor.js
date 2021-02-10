import dynamic from "next/dynamic";

export default function TextEditor() {
    const SSRSafe = dynamic(import("./Editor"), { ssr: false });
    return <SSRSafe />;
}