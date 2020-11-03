import IAuthenticationRequest from "../../../types/IAuthenticationRequest";
import IAuthenticationResult from "../../../types/IAuthenticationResult";

/**
 * This service describes an interface to access authentication APIs on CarOnSale.
 */
export interface IAuthenticationClient {
    authenticate(userMailId: string, request: IAuthenticationRequest): Promise<IAuthenticationResult>;
    hashPasswordWithCycles(password: string, cycles: number): string;
}