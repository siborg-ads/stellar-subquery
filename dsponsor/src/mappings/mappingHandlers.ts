import { Increment, Initialization, OFFER, Payment, Proposal, Review, MarketplaceInit, Listing, ListingCancel, ListingSold, Auction, Bid, AuctionSold, AuctionNoBid } from "../types";
import { SorobanEvent } from "@subql/types-stellar";
// import * as stellar from "@stellar/stellar-sdk";
import {
  scValToNative,
} from "@stellar/stellar-sdk";


// Contract Initialization indexation :: to test the indexation
export async function handleInitialization(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const nftFactory = humanEvent[0]
    const nativeXlm = humanEvent[1]
    const bps = humanEvent[2]
    const admin = humanEvent[3]

    const initialization = Initialization.create({
      id: event.transaction!.hash,
      nft_factory: nftFactory,
      native_xlm: nativeXlm,
      bps: BigInt(bps),
      admin: admin,
    });
    await initialization.save();
  }
}

// Offer indexation :: Offer creation events indexation
export async function handleOffer(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const nftContract = humanEvent[0]
    const offerId = humanEvent[1]
    const offer = OFFER.create({
      id: event.transaction!.hash,
      nft_contract: nftContract,
      offer_id: offerId
    });
    await offer.save();
  }
}


// Proposal indexation :: SubmitProposal events indexation
export async function handleProposal(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const nftContract = humanEvent[0]
    const tokenId = humanEvent[1]
    const to = humanEvent[2]
    const currency = humanEvent[3]
    const price = humanEvent[4]
    const proposal = Proposal.create({
      id: event.transaction!.hash,
      nft_contract: nftContract,
      token_id: tokenId,
      to: to,
      currency: currency,
      price: price
    });
  }
}

// Payment indexation :: Payment events indexation
export async function handlePayment(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const from = humanEvent[0]
    const to = humanEvent[1]
    const amount = humanEvent[2]
    const currency = humanEvent[3]
    const payment = Payment.create({
      id: event.transaction!.hash,
      from: from,
      to: to,
      amount: amount,
      currency: currency
    });
    await payment.save();
  }
}

// Review indexation :: Review events indexation
export async function handleReview(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const offerId = humanEvent[0]
    const tokenId = humanEvent[1]
    const proposalId = humanEvent[2]
    const adParameter = humanEvent[3]
    const validated = humanEvent[4]
    const reason = humanEvent[5]
    const review = Review.create({
      id: event.transaction!.hash,
      offer_id: offerId,
      token_id: tokenId,
      proposal_id: proposalId,
      ad_parameter: adParameter,
      validated: validated,
      reason: reason
    });
    await review.save();
  }
}

// ===== MARKETPLACE HANDLERS =====

// Marketplace Initialization
export async function handleMarketplaceInit(event: SorobanEvent): Promise<void> {
  logger.info(`Marketplace Init: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const admin = humanEvent[0];
    const nativeXlm = humanEvent[1];
    const feeBps = humanEvent[2];

    const marketplaceInit = MarketplaceInit.create({
      id: event.transaction!.hash,
      admin: admin,
      native_xlm: nativeXlm,
      fee_bps: BigInt(feeBps),
    });
    await marketplaceInit.save();
  }
}

// Listing Creation
export async function handleListing(event: SorobanEvent): Promise<void> {
  logger.info(`Listing Created: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const nftContract = humanEvent[0];
    const tokenId = humanEvent[1];
    const price = humanEvent[2];

    const listing = Listing.create({
      id: event.transaction!.hash,
      listing_id: BigInt(0), // Will be updated from contract state
      nft_contract: nftContract,
      token_id: BigInt(tokenId),
      price: BigInt(price),
      seller: "", // Will be extracted from contract state
      currency: "", // Will be extracted from contract state
      active: true,
      created_at: BigInt(event.ledger?.sequence || 0),
    });
    await listing.save();
  }
}

// Listing Cancellation
export async function handleListingCancel(event: SorobanEvent): Promise<void> {
  logger.info(`Listing Cancelled: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const listingId = humanEvent[0];

    const listingCancel = ListingCancel.create({
      id: event.transaction!.hash,
      listing_id: BigInt(listingId),
      cancelled_at: BigInt(event.ledger?.sequence || 0),
    });
    await listingCancel.save();
  }
}

// Listing Sold
export async function handleListingSold(event: SorobanEvent): Promise<void> {
  logger.info(`Listing Sold: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const listingId = humanEvent[0];
    const buyer = humanEvent[1];

    const listingSold = ListingSold.create({
      id: event.transaction!.hash,
      listing_id: BigInt(listingId),
      buyer: buyer,
      sold_at: BigInt(event.ledger?.sequence || 0),
    });
    await listingSold.save();
  }
}

// Auction Creation
export async function handleAuction(event: SorobanEvent): Promise<void> {
  logger.info(`Auction Created: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const nftContract = humanEvent[0];
    const tokenId = humanEvent[1];
    const reservePrice = humanEvent[2];

    const auction = Auction.create({
      id: event.transaction!.hash,
      auction_id: BigInt(0), // Will be updated from contract state
      nft_contract: nftContract,
      token_id: BigInt(tokenId),
      reserve_price: BigInt(reservePrice),
      seller: "", // Will be extracted from contract state
      currency: "", // Will be extracted from contract state
      active: true,
      created_at: BigInt(event.ledger?.sequence || 0),
    });
    await auction.save();
  }
}

// Bid Placement
export async function handleBid(event: SorobanEvent): Promise<void> {
  logger.info(`Bid Placed: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const auctionId = humanEvent[0];
    const amount = humanEvent[1];

    const bid = Bid.create({
      id: event.transaction!.hash,
      auction_id: BigInt(auctionId),
      bidder: "", // Will be extracted from transaction
      amount: BigInt(amount),
      bid_at: BigInt(event.ledger?.sequence || 0),
    });
    await bid.save();
  }
}

// Auction Sold
export async function handleAuctionSold(event: SorobanEvent): Promise<void> {
  logger.info(`Auction Sold: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const auctionId = humanEvent[0];
    const winner = humanEvent[1];

    const auctionSold = AuctionSold.create({
      id: event.transaction!.hash,
      auction_id: BigInt(auctionId),
      winner: winner,
      final_price: BigInt(0), // Will be extracted from contract state
      sold_at: BigInt(event.ledger?.sequence || 0),
    });
    await auctionSold.save();
  }
}

// Auction No Bid
export async function handleAuctionNoBid(event: SorobanEvent): Promise<void> {
  logger.info(`Auction No Bid: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value as any);
    const auctionId = humanEvent[0];

    const auctionNoBid = AuctionNoBid.create({
      id: event.transaction!.hash,
      auction_id: BigInt(auctionId),
      ended_at: BigInt(event.ledger?.sequence || 0),
    });
    await auctionNoBid.save();
  }
}