import { inject, injectable } from "inversify";
import IAuction from "../../../types/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import IAuthenticationResult from "../../../types/IAuthenticationResult";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import Axios from "axios";
import IAuctionsResponse from "../../../types/IAuctionsResponse";
import IConfigurationProvider from "../../../util/interface/IConfigurationProvider";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor(
        @inject(DependencyIdentifier.AUTHCLIENT) private authenticationClient: IAuthenticationClient,
        @inject(DependencyIdentifier.CONFIGPROVIDER) private configuration: IConfigurationProvider) {
    }

    async getRunningAuctions(): Promise<IAuction[]> {
        const authenticationResult = await this.authenticationClient.authenticate(this.configuration.userMailId, {
            meta: "",
            password: this.configuration.userPassword
        })
        return Axios.get<IAuctionsResponse>(`${this.configuration.remoteHost}/api/v2/auction/buyer/?filter=${this.configuration.runningAuctionsFilter}`, {
            headers: {
                authtoken: authenticationResult.token,
                userid: authenticationResult.userId
            }
        }).then(response => response.data.items);
    }
}