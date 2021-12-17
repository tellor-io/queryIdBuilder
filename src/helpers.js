import { ethers } from "ethers";

export const legacyDataHelper = (feed) => {
  let jsonStringToUse;
  let json_bytes;
  let json_keccak_queryId;

  switch (feed) {
    case "eth/usd":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 1 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x0000000000000000000000000000000000000000000000000000000000000001";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    case "btc/usd":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 2 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x0000000000000000000000000000000000000000000000000000000000000002";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    case "ampl/usd":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 10 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x000000000000000000000000000000000000000000000000000000000000000a";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    case "uspce":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 41 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x0000000000000000000000000000000000000000000000000000000000000029";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    case "trb/usd":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 50 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x0000000000000000000000000000000000000000000000000000000000000032";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    case "eth/jpy":
      jsonStringToUse = JSON.stringify(
        `{ type: "LegacyRequest", legacy_id: 59 }`
      );
      json_bytes = ethers.utils.toUtf8Bytes(jsonStringToUse);
      json_keccak_queryId =
        "0x000000000000000000000000000000000000000000000000000000000000003b";
      return [jsonStringToUse, json_bytes, json_keccak_queryId];
    default:
      return;
  }
};
