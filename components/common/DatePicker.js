import { useEffect, useState } from "react"

export default function _DatePicker(props) {
    const [imported, setImported] = useState();
    useEffect(async () => setImported({ DP: (await import("react-datepicker")).default }), []);
    return imported ? <DatePicker {...imported} props={props} /> : null;
}

function DatePicker({ DP, props }) { return <DP {...props} />; }