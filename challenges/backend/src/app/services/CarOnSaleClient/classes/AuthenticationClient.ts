import { injectable } from "inversify";
import IAuthenticationRequest from "../../../types/IAuthenticationRequest";
import IAuthenticationResult from "../../../types/IAuthenticationResult";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import crypto from "crypto";
import Axios from "axios";

@injectable()
export class AuthenticationClient implements IAuthenticationClient {
    hashPasswordWithCycles(password: string, cycles: number): string {
        let hash = `${password}`

        for(let i = 0; i < cycles; i++){
            hash = crypto.createHash("sha512").update(hash).digest("hex")
        }
    
        return hash
    }
    authenticate(userMailId: string, request: IAuthenticationRequest): Promise<IAuthenticationResult> {
        return Axios.put<IAuthenticationResult>(`https://caronsale-backend-service-dev.herokuapp.com/api/v1/authentication/${userMailId}`, {
            ...request,
            password: this.hashPasswordWithCycles(request.password, 5),
        }).then(response => response.data)
    }
}