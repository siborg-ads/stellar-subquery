import { Increment, Initialization, OFFER, Payment, Proposal, Review } from "../types";
import { SorobanEvent } from "@subql/types-stellar";
// import * as stellar from "@stellar/stellar-sdk";
import {
  scValToNative,
} from "@stellar/stellar-sdk";


// Contract Initialization indexation :: to test the indexation
export async function handleInitialization(event: SorobanEvent): Promise<void> {
  logger.info(`Transaction hash: ${event.transaction!.hash.toString()}`);
  if (event.type.toString() == "contract") {
    let humanEvent = scValToNative(event.value);
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
    let humanEvent = scValToNative(event.value);
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
    let humanEvent = scValToNative(event.value);
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
    let humanEvent = scValToNative(event.value);
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
    let humanEvent = scValToNative(event.value);
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