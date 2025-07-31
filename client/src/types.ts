export interface LoginResponse {
    message: string;
    role: "admin" | "user" | "employee";
};

export interface responseDataShape {
    email: string;
    role: "admin" | "user" | "employee" | null;
};

export type BroadcastMessage  = {
    id: string;
    message: string;
}

export interface BannerProps{
    messages: BroadcastMessage[],
    onDismiss?: (broadcastid: string) => void
}