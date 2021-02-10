import Router from "next/router";
import { useState, useEffect } from "react";

export function useAuth() {
    return AuthProvider.userData;
}

export default class AuthProvider {
    static userData;
    static accessKeyLifetime;
    static refreshInterval;
    static REFRESH_PREEMPTION = 1000 * 15; // 15 seconds

    static startAutoRefresh() {
        this.refreshInterval = setInterval(() => this.refreshTokens(), this.accessKeyLifetime - this.REFRESH_PREEMPTION);
    }

    static stopAutoRefresh() {
        clearInterval(this.refreshInterval);
    }
    
    static setUser(json) {
        this.userData = json.user;
        this.accessKeyLifetime = json.accessKeyLifetime;
        this.startAutoRefresh();
        window.dispatchEvent(new CustomEvent("onauth"));
    }

    static clearUser() {
        this.stopAutoRefresh();
        this.userData = undefined;
        this.accessKeyLifetime = undefined;
        this.refreshInterval = undefined;
        window.dispatchEvent(new CustomEvent("onauth"));
    }

    static register(email, name, birthdate) {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json;charset=utf-8" },
                    body: JSON.stringify({ email, name, birthdate })
                });
                const json = await response.json();
                const success = json.status === "success";
                const reasons = json.reasons;

                if(success) this.setUser(json);
                resolve([success, reasons]);
            } catch(e) { reject(); }
        });
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
                // console.log(json);
                const success = json.status === "success";
                
                if(success) this.setUser(json);
                resolve([success, json.reason]);
            } catch(e) { reject(); }
        });
    }

    static authorize() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch("/api/auth/authorize", { method: "POST" });
                const json = await response.json();
                // console.log(json);
                resolve(json.status === "success");
            } catch(e) { reject(); }
            
        });
    }

    static async refreshTokens() {
        try {
            const response = await fetch("/api/auth/refresh_tokens", { method: "POST" });
            const json = await response.json();
            // console.log(json);
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
                } else resolve({ success: 0, reason: json.reason });
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
}

export function AuthVariableComponent({ children }) {
    // First child for users, second for guests
    const [content, setContent] = useState();
    useEffect(() => {
        const authHandler = async () => setContent(AuthProvider.userData ? children[0] : children[1]);
        authHandler();
        window.addEventListener("onauth", authHandler);
        return () => window.removeEventListener("onauth", authHandler);
    }, [children]);

    return content ?? null;
}

export function AdminVariableComponent({ children }) {
    // Children for admins, null for commons
    const [content, setContent] = useState();
    useEffect(() => {
        const adminHandler = async () => setContent(AuthProvider.userData?.admin === true && children);
        adminHandler();
        window.addEventListener("onauth", adminHandler);
        return () => window.removeEventListener("onauth", adminHandler);
    }, [children]);

    return /* content ?? */ null;
}