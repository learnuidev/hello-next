export interface UserPlan {
  createdAt: number;
  id: string;
  userId: string;
  productName: "Mandarino Free" | "Mandarino Pro";
  productId: string;
  userStatus: "Free User" | "Pro User";
  isExpired?: boolean;
  daysTillExpiry?: number;
}
