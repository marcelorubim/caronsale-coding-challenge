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
        try {
            this.logger.log(`Auction Monitor started.`);

            const auctions = await this.carOnSaleClient.getRunningAuctions();
    
            const averageNumberOfBids = (auctions.reduce((acc, curr) => acc+curr.numBids,0) / auctions.length).toFixed(2)
    
            const averagePercentOfAuctionProgress = ((auctions.reduce((acc, curr) => acc+(curr.currentHighestBidValue/curr.minimumRequiredAsk),0) / auctions.length) * 100).toFixed(2)
    
            this.logger.log(`Number of actions: ${auctions.length}`)
            this.logger.log(`Average number of bids: ${averageNumberOfBids}`)
            this.logger.log(`Average percent auction progress: ${averagePercentOfAuctionProgress}%`)
        }catch(err){
            console.error(err)
            process.exit(-1)
        }
    }

}