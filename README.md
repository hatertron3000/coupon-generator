
# BigCommerce Coupon Generator
Given a [Coupon Promotion](https://support.bigcommerce.com/s/article/Coupon-Promotions?language=en_US) in a BigCommerce store and an API key for the same store, you may use the utility scripts in this repo to bulk generate coupons.

The coupons it creates are randomly generated alphanumeric strings of a length that you define. The scripts _do not_ check for existing codes in BigCommerce prior to attempting to create them.

## Configuration

1. Create a [Coupon Promotion](https://support.bigcommerce.com/s/article/Coupon-Promotions?language=en_US) in your BigCommerce store
2. Generate API keys for your store with the _Marketing: modify_ scope
3. Clone the repo, copy the environment variables template, install dependencies
```
git clone https://github.com/hatertron3000/coupon-generator
cd coupon-generator
cp .env-template .env
npm i
```
4. Configure the following environment variables in .env:

| Environment Variable | Description                                                   |
|----------------------|---------------------------------------------------------------|
| STORE_HASH           | BigCommerce store has (example: abcde12345)                   |
| API_TOKEN            | BigCommerce API token                                         |
| QUANTITY             | The number of coupons to generate                             |
| CODE_LENGTH          | The desired character length of coupon codes (min: 6 max: 50) |
| PROMOTION_ID         | The promotion_id to use for the codes                         |

## Usage

This repo provides two utilities: a coupon generator and a code generator.

To create coupon codes in BigCommerce:
```
npm run start
```

To generate a CSV file of codes but not push them to BigCommerce:
```
npm run csv
```

Results are stored in timestamped files saved to the `./results/` directory. If the coupon generation script is interrupted before all codes have been created in BC, the file will contain any coupon codes that were generated in BigCommerce.
