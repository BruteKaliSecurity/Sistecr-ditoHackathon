const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Desplegando contratos en Testnet...\n");

  const network = hre.network.name;
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  
  console.log(`Red: ${network}`);
  console.log(`Chain ID: ${chainId}\n`);

  const [deployer] = await hre.ethers.getSigners();
  console.log("Desplegando con la cuenta:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Balance:", hre.ethers.formatEther(balance), "ETH/Token\n");

  if (balance < hre.ethers.parseEther("0.01")) {
    console.log("⚠️ ADVERTENCIA: Balance bajo. Asegúrate de tener suficiente gas para el despliegue.\n");
  }

  // 1. Desplegar MockCCOP
  console.log("1️⃣ Desplegando MockCCOP...");
  const MockCCOP = await hre.ethers.getContractFactory("MockCCOP");
  const mockCCOP = await MockCCOP.deploy(deployer.address);
  await mockCCOP.waitForDeployment();
  const mockCCOPAddress = await mockCCOP.getAddress();
  console.log("✅ MockCCOP desplegado en:", mockCCOPAddress);

  // Mint tokens iniciales
  try {
    await mockCCOP.mint(deployer.address, hre.ethers.parseEther("1000000"));
    console.log("✅ Tokens minteados para deployer\n");
  } catch (error) {
    console.log("⚠️ Error al mintear tokens:", error.message, "\n");
  }

  // 2. Desplegar CreditNFT
  console.log("2️⃣ Desplegando CreditNFT...");
  const CreditNFT = await hre.ethers.getContractFactory("CreditNFT");
  const creditNFT = await CreditNFT.deploy(deployer.address);
  await creditNFT.waitForDeployment();
  const creditNFTAddress = await creditNFT.getAddress();
  console.log("✅ CreditNFT desplegado en:", creditNFTAddress);

  // Autorizar minter
  try {
    await creditNFT.authorizeMinter(deployer.address);
    console.log("✅ Deployer autorizado como minter\n");
  } catch (error) {
    console.log("⚠️ Error al autorizar minter:", error.message, "\n");
  }

  // 3. Desplegar RewardSystem
  console.log("3️⃣ Desplegando RewardSystem...");
  const RewardSystem = await hre.ethers.getContractFactory("RewardSystem");
  const rewardSystem = await RewardSystem.deploy(deployer.address, mockCCOPAddress, creditNFTAddress);
  await rewardSystem.waitForDeployment();
  const rewardSystemAddress = await rewardSystem.getAddress();
  console.log("✅ RewardSystem desplegado en:", rewardSystemAddress);

  // Autorizar registrador
  try {
    await rewardSystem.authorizeRegistrar(deployer.address);
    console.log("✅ Deployer autorizado como registrador\n");
  } catch (error) {
    console.log("⚠️ Error al autorizar registrador:", error.message, "\n");
  }

  // 4. Depositar fondos en RewardSystem
  console.log("4️⃣ Depositando fondos en RewardSystem...");
  try {
    const depositAmount = hre.ethers.parseEther("100000");
    await mockCCOP.approve(rewardSystemAddress, depositAmount);
    await rewardSystem.depositFunds(depositAmount);
    console.log("✅ Fondos depositados:", hre.ethers.formatEther(depositAmount), "mcCOP\n");
  } catch (error) {
    console.log("⚠️ Error al depositar fondos:", error.message, "\n");
  }

  // Guardar información de despliegue
  const deploymentInfo = {
    network: network,
    chainId: chainId.toString(),
    deployer: deployer.address,
    contracts: {
      mockCCOP: mockCCOPAddress,
      creditNFT: creditNFTAddress,
      rewardSystem: rewardSystemAddress,
    },
    timestamp: new Date().toISOString(),
    explorer: getExplorerUrl(network, chainId),
  };

  const deploymentsDir = path.join(__dirname, "..", "deployments");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir, { recursive: true });
  }

  const deploymentFile = path.join(deploymentsDir, `${network}.json`);
  fs.writeFileSync(deploymentFile, JSON.stringify(deploymentInfo, null, 2));

  console.log("📄 Información de despliegue guardada en:", deploymentFile);
  console.log("\n" + "=".repeat(60));
  console.log("🎉 ¡Despliegue completado exitosamente!");
  console.log("=".repeat(60));
  console.log("\n📋 Direcciones de contratos:\n");
  console.log("MockCCOP:", mockCCOPAddress);
  console.log("CreditNFT:", creditNFTAddress);
  console.log("RewardSystem:", rewardSystemAddress);
  
  if (deploymentInfo.explorer) {
    console.log("\n🔍 Explorador de bloques:");
    console.log(`MockCCOP: ${deploymentInfo.explorer}/address/${mockCCOPAddress}`);
    console.log(`CreditNFT: ${deploymentInfo.explorer}/address/${creditNFTAddress}`);
    console.log(`RewardSystem: ${deploymentInfo.explorer}/address/${rewardSystemAddress}`);
  }

  console.log("\n💡 Configura estas direcciones en frontend/.env.production:");
  console.log(`NEXT_PUBLIC_ASTAR_NFT_CONTRACT=${creditNFTAddress}`);
  console.log(`NEXT_PUBLIC_CELO_REWARD_CONTRACT=${rewardSystemAddress}`);
  console.log(`NEXT_PUBLIC_LOCAL_CCOP_CONTRACT=${mockCCOPAddress}`);
  console.log("\n");

  return deploymentInfo;
}

function getExplorerUrl(network, chainId) {
  const explorers = {
    "astar-testnet": "https://blockscout.com/astar-testnet",
    "astar": "https://astar.subscan.io",
    "celo-alfajores": "https://alfajores.celoscan.io",
    "celo": "https://celoscan.io",
    "shibuya": "https://blockscout.com/astar-shibuya",
  };

  if (explorers[network]) {
    return explorers[network];
  }

  // Por chainId
  const chainIdMap = {
    "592": "https://astar.subscan.io", // Astar Mainnet
    "4369": "https://blockscout.com/astar-testnet", // Astar Testnet
    "44787": "https://alfajores.celoscan.io", // Celo Alfajores
    "42220": "https://celoscan.io", // Celo Mainnet
  };

  return chainIdMap[chainId.toString()] || null;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


