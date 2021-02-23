import Router from "next/router";
import { useState, useEffect } from "react";
import FetchProvider from "./FetchProvider";

export function useAuth() {
    return AuthProvider.userData;
}

export default class AuthProvider {
    static userData;
    static accessKeyLifetime;
    static refreshTimeout;
    static REFRESH_PREEMPTION = 1000 * 15; // 15 seconds

    static startAutoRefresh() {
        this.refreshTimeout = setTimeout(() => this.refreshTokens(), this.accessKeyLifetime - this.REFRESH_PREEMPTION);
    }

    static stopAutoRefresh() {
        clearTimeout(this.refreshTimeout);
    }
    
    static setUser(json) {
        this.userData = json.user;
        this.accessKeyLifetime = json.accessKeyLifetime;
        this.stopAutoRefresh();
        this.startAutoRefresh();
        window.dispatchEvent(new CustomEvent("onauth"));
    }

    static clearUser() {
        this.stopAutoRefresh();
        this.userData = undefined;
        this.accessKeyLifetime = undefined;
        this.refreshTimeout = undefined;
        window.dispatchEvent(new CustomEvent("onauth"));
    }

    static register(email, name, birthdate, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ email, name, birthdate, password })
                });
                const json = await response.json();
                if(json.status === "success") resolve({ success: 1 });
                else resolve({ success: 0, reason: json.error, reasons: json.errors });
            } catch(e) { reject(); }
        });
    }

    static async verifyEmail(email, uuid) {
        const result = await FetchProvider.post("/api/auth/verify_email", { email, uuid });
        if(result.status === "success") return { success: 1 };
        else return { success: 0, reason: result.error };
    }

    static authenticate(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/authenticate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ email, password })
                });
                const json = await response.json();
                const success = json.status === "success";
                
                if(success) this.setUser(json);
                resolve([success, json.reason]);
            } catch(e) { reject(); }
        });
    }

    static async refreshTokens() {
        try {
            const response = await fetch("/api/auth/refresh_tokens", { method: "POST" });
            const json = await response.json();
            if(json.status === "success") this.setUser(json);
            else this.clearUser();
        } catch(e) { }
    }

    static deauthenticate() {
        fetch("/api/auth/deauthenticate", { method: "POST" });
        this.clearUser();
        if(/^\/account/.test(Router.pathname)) Router.push("/home");
    }

    static async change(newData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/change", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify(newData)
                });
                const json = await response.json();
                if(json.status === "success") {
                    this.userData = json.user;
                    window.dispatchEvent(new CustomEvent("onauth"));
                    resolve({ success: 1 });
                } else resolve({ success: 0, reason: json.error });
            } catch(e) { reject(); }
        })
    }

    static async registerToEvent(participantData) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/register_to_event", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify(participantData)
                });
                const json = await response.json();
                if(json.status === "success") {
                    this.userData.events = json.events;
                    resolve({ success: 1 });
                } else resolve({ success: 0, reason: json.reason });
            } catch(e) { reject(); }
        });
    }

    static async forgotPassword(email) {
        const result = await FetchProvider.post("/api/auth/forgot_password/mail", { email });
        if(result.status === "success") return { success: 1 };
        else return { success: 0, reason: result.error };
    }

    static async checkForgotPassword(email, uuid) {
        const result = await FetchProvider.post("/api/auth/forgot_password/check", { email, uuid });
        if(result.status === "success") return { success: 1 };
        else return { success: 0, reason: result.error };
    }

    static async resetPassword(email, uuid, password ) {
        const result = await FetchProvider.post("/api/auth/forgot_password/reset", { email, uuid, password  });
        if(result.status === "success") return { success: 1 };
        else return { success: 0, reason: result.error };
    }
}

export function ForGuest({ children }) {
    const [content, setContent] = useState(null);
    useEffect(() => {
        const handler = async () => setContent(AuthProvider.userData ? null : children);
        handler();
        window.addEventListener("onauth", handler);
        return () => window.removeEventListener("onauth", handler);
    }, [children]);

    return content;
}

export function ForUser({ children }) {
    const [content, setContent] = useState(null);
    useEffect(() => {
        const handler = async () => setContent(AuthProvider.userData ? children : null);
        handler();
        window.addEventListener("onauth", handler);
        return () => window.removeEventListener("onauth", handler);
    }, [children]);

    return content;
}

export function ForAdmin({ children }) {
    const [content, setContent] = useState(null);
    useEffect(() => {
        const handler = async () => setContent(AuthProvider.userData?.admin === true ? children : null);
        handler();
        window.addEventListener("onauth", handler);
        return () => window.removeEventListener("onauth", handler);
    }, [children]);

    return content;
}