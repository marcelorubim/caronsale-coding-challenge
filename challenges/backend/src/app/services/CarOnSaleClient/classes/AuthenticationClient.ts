import { inject, injectable } from "inversify";
import IAuthenticationRequest from "../../../types/IAuthenticationRequest";
import IAuthenticationResult from "../../../types/IAuthenticationResult";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import crypto from "crypto";
import Axios from "axios";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import IConfigurationProvider from "../../../util/interface/IConfigurationProvider";

@injectable()
export class AuthenticationClient implements IAuthenticationClient {
    public constructor(@inject(DependencyIdentifier.CONFIGPROVIDER) private configuration: IConfigurationProvider) {
    }
    hashPasswordWithCycles(password: string, cycles: number): string {
        let hash = `${password}`;

        for (let i = 0; i < cycles; i++) {
            hash = crypto.createHash("sha512").update(hash).digest("hex");
        }

        return hash;
    }
    authenticate(userMailId: string, request: IAuthenticationRequest): Promise<IAuthenticationResult> {
        return Axios.put<IAuthenticationResult>(`${this.configuration.remoteHost}/api/v1/authentication/${userMailId}`, {
            ...request,
            password: this.hashPasswordWithCycles(request.password, this.configuration.passwordCycles),
        }).then(response => response.data);
    }
}