export interface UserPlan {
  createdAt: number;
  id: string;
  userId: string;
  productName: "Mandarino Free" | "Mandarino Pro";
  productId: string;
  userStatus: "Free" | "Pro";
  isExpired?: boolean;
  daysTillExpiry?: number;
}
