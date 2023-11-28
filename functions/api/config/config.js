const config = {};

config.IS_TESTNET = process.env.IS_TESTNET === 'TRUE';

config.FIRESTORE_USER_ROOT = process.env.FIRESTORE_USER_ROOT;
config.FIRESTORE_NFT_MINT_SUBSCRIPTION_ROOT =
  process.env.FIRESTORE_NFT_MINT_SUBSCRIPTION_ROOT;
config.FIRESTORE_WALLET_USER_ROOT = process.env.FIRESTORE_WALLET_USER_ROOT;

config.LIKE_CO_CLIENT_ID = process.env.LIKE_CO_CLIENT_ID;
config.LIKE_CO_CLIENT_SECRET = process.env.LIKE_CO_CLIENT_SECRET;

config.COOKIE_SECRET = process.env.COOKIE_SECRET;

config.CRISP_USER_HASH_SECRET = process.env.CRISP_USER_HASH_SECRET;

config.LIKECOIN_CHAIN_API = process.env.LIKECOIN_CHAIN_API;
config.LIKECOIN_API_BASE = process.env.LIKECOIN_API_BASE;
config.EXTERNAL_URL = process.env.EXTERNAL_URL;

config.GET_WALLET_API_SECRET = process.env.GET_WALLET_API_SECRET;

config.LIKECOIN_NFT_API_WALLET = process.env.LIKECOIN_NFT_API_WALLET;

config.NOTION_API_KEY = process.env.NOTION_API_KEY;
config.NOTION_DATABASE_ID_FOR_BOOKSTORE_ITEMS =
  process.env.NOTION_DATABASE_ID_FOR_BOOKSTORE_ITEMS;
config.NOTION_DATABASE_ID_FOR_BOOKSTORE_LISTS =
  process.env.NOTION_DATABASE_ID_FOR_BOOKSTORE_LISTS;

module.exports = config;
