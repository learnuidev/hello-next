export interface IFile {
  fileName: string;
  fileSize: number;
  userId: string;
  fileId: string;
  status: "UPLOADED" | "PENDING" | "DELETED"; // updated status type
  createdAt: number;
  deletedAt?: number;
  updatedAt?: number;
  contentType: string;
  s3Key: string;
  presignedUrl: string;
}
