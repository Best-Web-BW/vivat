import dynamic from "next/dynamic";

export default function TextEditor(props) {
    const SSRSafe = dynamic(import("./RawEditor"), { ssr: false });
    return <SSRSafe {...props} />;
}