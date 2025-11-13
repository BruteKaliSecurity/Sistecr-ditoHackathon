const hre = require("hardhat");

async function main() {
  const network = hre.network.name;
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  
  console.log(`\n🔍 Verificando balance en ${network} (Chain ID: ${chainId})\n`);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Wallet:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  const balanceFormatted = hre.ethers.formatEther(balance);
  
  const tokenSymbol = network === "astar" ? "ASTR" : network === "celo" ? "CELO" : "ETH";
  console.log(`Balance: ${balanceFormatted} ${tokenSymbol}`);
  
  const minBalance = hre.ethers.parseEther("0.1");
  if (balance < minBalance) {
    console.log("\n⚠️  ADVERTENCIA: Balance bajo!");
    console.log(`Balance actual: ${balanceFormatted} ${tokenSymbol}`);
    console.log(`Balance mínimo recomendado: 0.1 ${tokenSymbol}`);
    console.log("\n💡 Para obtener tokens:");
    if (network === "astar") {
      console.log("   - Compra ASTR en exchange (Binance, Coinbase, etc.)");
      console.log("   - Transfiere a tu wallet MetaMask");
    } else if (network === "celo") {
      console.log("   - Compra CELO en exchange (Binance, Coinbase, etc.)");
      console.log("   - Transfiere a tu wallet MetaMask");
    }
  } else {
    console.log("\n✅ Balance suficiente para desplegar");
  }
  
  console.log("\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

