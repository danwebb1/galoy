import { getAuth } from "../utils";
import { LightningUserWallet } from "../LightningUserWallet";
const BitcoindClient = require('bitcoin-core')
import * as jwt from 'jsonwebtoken';
import { TEST_NUMBER, login } from "../text";
import { LightningAdminWallet } from "../LightningAdminImpl"
const mongoose = require("mongoose")
const User = mongoose.model("User")

const lnService = require('ln-service')
const cert = process.env.TLS

export const lndMain = lnService.authenticatedLndGrpc(getAuth()).lnd

export const lndOutside1 = lnService.authenticatedLndGrpc({
  cert,
  macaroon: process.env.MACAROONOUTSIDE1,
  socket: `${process.env.LNDOUTSIDE1ADDR}:${process.env.LNDOUTSIDE1RPCPORT}`,
}).lnd;

export const lndOutside2 = lnService.authenticatedLndGrpc({
  cert,
  macaroon: process.env.MACAROONOUTSIDE2,
  socket: `${process.env.LNDOUTSIDE2ADDR}:${process.env.LNDOUTSIDE2RPCPORT}`,
}).lnd;

const connection_obj = {
  network: 'regtest', username: 'rpcuser', password: 'rpcpass',
  host: process.env.BITCOINDADDR, port: process.env.BITCOINDPORT
}

export const bitcoindClient = new BitcoindClient(connection_obj)

export const RANDOM_ADDRESS = "2N1AdXp9qihogpSmSBXSSfgeUFgTYyjVWqo"

export const getUidFromToken = async userNumber => {
  const raw_token = await login(TEST_NUMBER[userNumber])
  const token = jwt.verify(raw_token, process.env.JWT_SECRET);
  return token.uid
}

export const getUserWallet = async userNumber => {
  const uid = await getUidFromToken(userNumber)
  const userWallet = new LightningUserWallet({ uid })
  return userWallet
}

export const checkIsBalanced = async () => {
	const admin = await User.findOne({ role: "admin" })
	const adminWallet = new LightningAdminWallet({ uid: admin._id })
  await adminWallet.updateUsersPendingPayment()
	const { assetsEqualLiabilities, lndBalanceSheetAreSynced } = await adminWallet.balanceSheetIsBalanced()
	expect(assetsEqualLiabilities).toBeTruthy()
	expect(lndBalanceSheetAreSynced).toBeTruthy()
}