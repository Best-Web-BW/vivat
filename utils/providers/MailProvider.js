export default class MailProvider {
    static async sendFeedbackEmail(name, email, phone, question) {
        try {
            const response = await fetch("/api/mail/feedback", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({ name, email, phone, question })
            });
            const json = await response.json();
            if(json.status === "success") return { success: 1 };
            else return { success: 0, reason: json.error };
        } catch(e) { console.log(e); return { success: 0, reason: "connection_failed" }; }
    }

    static async sendRentEmail(email, phone, service, time) {
        try {
            const response = await fetch("/api/mail/rent", {
                method: "POST",
                headers: { "Content-Type": "application/json;charset=utf-8" },
                body: JSON.stringify({ email, phone, service, time })
            });
            const json = await response.json();
            if(json.status === "success") return { success: 1 };
            else return { success: 0, reason: json.error };
        } catch(e) { console.log(e); return { success: 0, reason: "connection_failed" }; }
    }
}