export interface GetUploadUrlParams {
  urlId?: string;
  contentType: string;
  extension: string;
}
export interface GetUploadUrlSuccess {
  signedUrl: string;
  s3Key: string;
  assetUrl: string;
}

export interface GetHtmlTextParams {
  url: string;
  selector: string;
  ai: boolean;
}
export interface GetHtmlTextSuccess {
  data: string;
}
