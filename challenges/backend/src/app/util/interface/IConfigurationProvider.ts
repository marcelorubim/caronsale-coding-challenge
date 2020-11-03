export default interface IConfigurationProvider {
    remoteHost: string;
    userMailId: string;
    userPassword: string;
    passwordCycles: number;
    runningAuctionsFilter: string;
}