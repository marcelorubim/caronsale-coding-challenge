import {Container} from "inversify";
import {ILogger} from "./services/Logger/interface/ILogger";
import {Logger} from "./services/Logger/classes/Logger";
import {AuctionMonitorApp} from "./AuctionMonitorApp";
import {DependencyIdentifier} from "./DependencyIdentifiers";
import { CarOnSaleClient } from "./services/CarOnSaleClient/classes/CarOnSaleClient";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuthenticationClient } from "./services/CarOnSaleClient/interface/IAuthenticationClient";
import { AuthenticationClient } from "./services/CarOnSaleClient/classes/AuthenticationClient";
import IConfigurationProvider from "./util/interface/IConfigurationProvider";
import ConfigurationProvider from "./util/classes/ConfigurationProvider";

/*
 * Create the DI container.
 */
const container = new Container({
    defaultScope: "Singleton",
});

/*
 * Register dependencies in DI environment.
 */
container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
container.bind<ICarOnSaleClient>(DependencyIdentifier.CAR_ON_SALE_CLIENT).to(CarOnSaleClient);
container.bind<IAuthenticationClient>(DependencyIdentifier.AUTHCLIENT).to(AuthenticationClient);
container.bind<IConfigurationProvider>(DependencyIdentifier.CONFIGPROVIDER).to(ConfigurationProvider);


/*
 * Inject all dependencies in the application & retrieve application instance.
 */
const app = container.resolve(AuctionMonitorApp);

/*
 * Start the application
 */
(async () => {
    await app.start();
})();
