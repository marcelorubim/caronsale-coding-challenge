import {inject, injectable} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
    @inject(DependencyIdentifier.CAR_ON_SALE_CLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        const auctions = await this.carOnSaleClient.getRunningAuctions();

        this.logger.log(JSON.stringify(auctions))
    }

}