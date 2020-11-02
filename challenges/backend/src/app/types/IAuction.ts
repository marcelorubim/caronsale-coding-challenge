import { CountryCodes } from ".";
import IVehicle from "./IVehicle";

enum AuctionState {
    DRAFTED,
    ACTIVE,
    CLOSED_WAITING_FOR_PAYMENT,
    CLOSED_WAITING_FOR_PICKUP,
    FINISHED,
    CLOSED_NO_BIDS,
    CLOSED_BELOW_MIN_ASK,
    DISABLED,
}


export default interface IAuction {
    label: string;
    state: AuctionState;
    endingTime: string;
    remainingTimeInSeconds: number;
    remainingTimeForInstantPurchaseInSeconds: number;
    createdAt: string;
    updatedAt: string;
    paymentDueDate: string;
    pickupDueDate: string;
    purchaseConfirmedAt: string;
    purchaseRejectedAt: string;
    rejectionReason: number;
    rejectionReasonNote: string;
    startingBidValue: number;
    currentHighestBidValue: number;
    minimumRequiredAsk: number;
    originalMinimumRequiredAsk: number;
    numBids: number;
    purchasePrice: number;
    associatedVehicle: 	IVehicle;
    isRatedByDealership: boolean;
    isRatedByBuyer: boolean;
    isPaidByBuyer: boolean;
    outgoingPaymentConfirmedAt: string;
    incomingPaymentConfirmedAt: string;
    pickupConfirmedAt: string;
    locationCountryCode: CountryCodes;
    locationAddress: string;
    locationCity: string;
    locationZip: string;
    locationGeoLat: string;
    locationGeoLon: number;
    sellerIban: string;
    urlToInvoice: string;
    hotBid: boolean;
    instantPurchasePrice: number;
    allowInstantPurchase: boolean;
    didEndWithInstantPurchase: boolean;
    instantPurchasePossibleUntil: string;
    auctioningIterations: number;
    priority: number;
    advertisementHtmlContent: string;
    buyerComplaint: 0 | 1 | 2 | 3 | 4 | 5;
    internalReferenceText: string;
    _fk_associatedVehicle: number;
    _fk_uuid_vehicle: string;
    _fk_associatedDealershipUser: number;
    _fk_uuid_sellerUser: string;
    _fk_highestBiddingSalesmanUser: number;
    _fk_uuid_highestBiddingBuyerUser: string;
    _fk_involvedInternalUser: number;
    _fk_uuid_involvedInternalUser: string;
    involvedInternalUserRole: 0 | 1 | 2 | 3;
    internalUserCommission: number;
    _fk_involvedInternalResolverUser: number;
    _fk_uuid_involvedInternalResolverUser: string;
    involvedInternalResolverUserRole: 0;
    internalResolverUserCommission: number;
    invoiceReference: string;
    thirdPartyInvoiceReference: string;
    thirdPartyTransferReference: string;
    thirdPartyPayoutReference: string;
    urlToPaymentSite: string;
    needsReview: boolean;
    reviewReason: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    reviewComment: string;
    pickupPinCode: string;
    pickupPinCodeEnteredAt: string;
    urlToPickupBuyerDocument: string;
    urlToPickupSellerDocument: string;
    paymentProcess: 0 | 1 | 2;
    _fk_uuid_associatedBankAccount: string;
    draftReviewIterations: number;
    complaintTimeWindowExtendedAt: string;
    isSuspectedCashPayment: boolean;
    reviewStartedAt: string;
    _fk_uuid_clonedFrom: string;
    type: 0 | 1 | 2;
    counterOfferByBuyer: number;
    id: number;
    uuid: string;
    lastOfferBySeller: number;
    buyerRecommendationScore: number;
    inspectionWasCommissionedByCos: boolean;
    creatorType: 0 | 1;
    _fk_uuid_creatingInternalUser: string;
}