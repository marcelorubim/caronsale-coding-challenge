import IAuction from "./IAuction";

export default interface IAuctionsResponse {
    items: IAuction[];
    page: number;
    total: number;
}