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

export interface DashHeader {
    email: string | null;
    handlelogout: () => void;
    handleCreateMessage?: () => void;
}

export interface TableData {
  id: string;
  title: string;
  message: string;
  type: string;
  status: string;
  role: 'user' | 'admin' | 'employee';
  updatedAt: string;
}

export type MessageTableProps = {
  data: TableData[];
  onDelete: (id: string) => void;
  isDeletingId: string | null;
};
