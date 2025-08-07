export type UserPlanStatus = "Free User" | "Pro User";
export type ProductNames = "Mandarino Free" | "Mandarino Pro";

export const userPlanStatus = {
  free: "Free User",
  pro: "Pro User",
} as const;

export const productNames = {
  free: "Mandarino Free",
  pro: "Mandarino Pro",
} as const;

export interface UserPlan {
  createdAt: number;
  id: string;
  userId: string;
  productName: ProductNames;
  productId: string;
  userStatus: UserPlanStatus;
  isExpired?: boolean;
  daysTillExpiry?: number;
}
