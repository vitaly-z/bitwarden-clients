import { SecretVerificationRequest } from "./secretVerificationRequest";

export class TwoFactorEmailRequest extends SecretVerificationRequest {
  email: string;
  deviceIdentifier: string;
  authRequestId: string;
  authRequestAccessCode: string;
}
