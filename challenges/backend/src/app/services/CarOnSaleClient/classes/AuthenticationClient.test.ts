import "reflect-metadata"
import { Container } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { IAuthenticationClient } from "../interface/IAuthenticationClient";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { AuthenticationClient } from "./AuthenticationClient";
import { CarOnSaleClient } from "./CarOnSaleClient";
import { expect } from "chai";
import nock from "nock"

describe('AuthenticationClient service', () => {
    let authenticationClient: IAuthenticationClient

    before(() => {
        // Configure InversifyJS container (AuthenticationClient currently does not inject any dependency, but its better to let the test prepared)
        const container = new Container({
            defaultScope: "Singleton",
        });
        authenticationClient = container.resolve(AuthenticationClient);
    })

    it("should hash the given password", () => {
        const password = "password123"
        expect(authenticationClient.hashPasswordWithCycles(password, 10)).to.equal("5ed7237bc46b4eeefba439dd54cfd8f09acf2ba60afdd47527e4647eb830ead8f5bc10de2d6b737196bbe4a802cffb53e2329cf9a5ce2ca4a45b7c1ba63b25f8");
        expect(authenticationClient.hashPasswordWithCycles(password, 5)).to.equal("a771baf15ea5100cd9607cb65661a5752df79f2ce8aabdcf8f49c7960fda4425dd48272e4d520d527a5ebed0fa6d3d2e34b5a3585514665e54df453ad22c84ba");
    })

    it("should authenticate", async () => {
        // Configure the http mocks
        const apiMock = nock("https://caronsale-backend-service-dev.herokuapp.com/")
        apiMock.put(/\/api\/v1\/authentication\/.*/, {
            password: "0142dd27a7f23815c294b537f437966ce7ecfffd8ecb57f81450f054c813dbcdb5b584f71e26c4e852357629cad39347443db588b8c68909022652f70c20e264",
            meta: "",  
        }).reply(200, require("../../../samples/authenticationResponse.json"))

        const authenticationResponse = await authenticationClient.authenticate("marcelorubim@gmail.com", {
            password: "PaSsWoRd123",
            meta: ""
        })

        expect(authenticationResponse.authenticated).to.equal(true)
    })
})