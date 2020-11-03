import { injectable } from "inversify";
import IConfigurationProvider from "../interface/IConfigurationProvider";

@injectable()
export default class ConfigurationProvider implements IConfigurationProvider {
    remoteHost: string;
    userMailId: string;
    userPassword: string;
    passwordCycles: number;
    runningAuctionsFilter: string;
    public constructor() {
        this.remoteHost = process.env.REMOTE_HOST || "https://caronsale-backend-service-dev.herokuapp.com";
        this.userMailId = process.env.USER_MAIL_ID || "salesman@random.com";
        this.userPassword = process.env.USER_PASSWORD || "123test";
        this.passwordCycles = process.env.PASSWORD_CYCLES ? Number(process.env.PASSWORD_CYCLES) : 5;
        this.runningAuctionsFilter = process.env.RUNNING_AUCTIONS_FILTER || "salesman";
    }
}