import "reflect-metadata"
import { Container } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { AuthenticationClient } from "./AuthenticationClient";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { expect } from "chai";
import nock from "nock"
import IConfigurationProvider from "../../../util/interface/IConfigurationProvider";
import ConfigurationProvider from "../../../util/classes/ConfigurationProvider";

describe('CarOnSaleClient service', () => {
    let carOnSaleClient: ICarOnSaleClient

    before(() => {
        // Configure InversifyJS container
        const container = new Container({
            defaultScope: "Singleton",
        });
        container.bind<IAuthenticationClient>(DependencyIdentifier.AUTHCLIENT).to(AuthenticationClient);
        container.bind<IConfigurationProvider>(DependencyIdentifier.CONFIGPROVIDER).to(ConfigurationProvider);
        carOnSaleClient = container.resolve(CarOnSaleClient);

        // Configure the http mocks
        const apiMock = nock("https://caronsale-backend-service-dev.herokuapp.com/")

        apiMock.put(/\/api\/v1\/authentication\/.*/).reply(200, require("../../../samples/authenticationResponse.json"))
        apiMock.get("/api/v2/auction/buyer/").query(true).reply(200, require("../../../samples/runningAuctionsResponse.json"))
    })

    it("should retrieve the running auctions", async () => {
        const auctions = await carOnSaleClient.getRunningAuctions();
        expect(auctions).to.have.lengthOf(1);
        expect(auctions[0].id).to.equal(9520);

    })
})