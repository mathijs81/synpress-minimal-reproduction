import { testWithSynpress } from "@synthetixio/synpress";
import { MetaMask, metaMaskFixtures } from "@synthetixio/synpress/playwright";
import basicSetup from "../test/wallet-setup/basic.setup";

const test = testWithSynpress(metaMaskFixtures(basicSetup));
const { expect } = test;

test("connect wallet and verify balance label", async ({
  context,
  page,
  metamaskPage,
  extensionId
}) => {
  //console.log(context);
  const metamask = new MetaMask(context, metamaskPage, basicSetup.walletPassword, extensionId);

  await page.goto("/");

  const balanceLabel = page.locator("#balance-label");

  await expect(balanceLabel).toHaveText("hello world");

  await expect(page.locator('button:has-text("Connect Wallet")')).toBeVisible();

  await page.locator('button:has-text("Connect Wallet")').click();

  await metamask.connectToDapp();

  await expect(balanceLabel).not.toHaveText("hello world");

  await expect(balanceLabel).toContainText("ETH");
});
