import { inject, injectable } from "inversify";
import IAuction from "../../../types/IAuction";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import IAuthenticationResult from "../../../types/IAuthenticationResult";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import Axios from "axios";
import IAuctionsResponse from "../../../types/IAuctionsResponse";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {
    public constructor(@inject(DependencyIdentifier.AUTHCLIENT) private authenticationClient: IAuthenticationClient) {
    }

    async getRunningAuctions(): Promise<IAuction[]> {
        const authenticationResult = await this.authenticationClient.authenticate("salesman@random.com", {
            meta: "",
            password: "123test"
        })
        console.log(authenticationResult)
        return Axios.get<IAuctionsResponse>("https://caronsale-backend-service-dev.herokuapp.com/api/v2/auction/buyer/?filter=salesman", {
            headers: {
                authtoken: authenticationResult.token,
                userid: authenticationResult.userId
            }
        }).then(response => response.data.items);
    }
}