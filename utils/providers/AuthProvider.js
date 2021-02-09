import { useState, useEffect } from "react";

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
                console.log(json);
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
                console.log(json);
                resolve(json.status === "success");
            } catch(e) { reject(); }
            
        });
    }

    static async refreshTokens() {
        try {
            const response = await fetch("/api/auth/refresh_tokens", { method: "POST" });
            const json = await response.json();
            console.log(json);
            if(json.status === "success") this.setUser(json);
            else this.clearUser();
        } catch(e) { }
    }

    static deauthenticate() {
        fetch("/api/auth/deauthenticate", { method: "POST" });
        this.clearUser();
    }
}

export function AuthVariableComponent({ forUser, forGuest }) {
    const [component, setComponent] = useState(null);
    useEffect(() => {
        const authHandler = () => setComponent(AuthProvider.userData ? forUser : forGuest);
        window.addEventListener("onauth", authHandler);
        return () => window.removeEventListener("onauth", authHandler);
    }, []);

    return component;
}

export function AdminVariableComponent({ forCommon, forAdmin }) {
    const [component, setComponent] = useState(null);
    useEffect(() => {
        const adminHandler = () => setComponent(AuthProvider.userData?.admin === true ? forAdmin : forCommon);
        window.addEventListener("onauth", adminHandler);
        return () => window.removeEventListener("onauth", adminHandler);
    });

    return component;
}