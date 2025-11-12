# 🚀 Guía de Despliegue Local - Confianza Móvil

## Cambios Realizados para MetaMask y Localhost

### ✅ Cambios Completados

1. **Frontend actualizado para usar solo MetaMask**
   - Eliminada dependencia de WalletConnect
   - Configurado para usar `injected` connector (MetaMask)
   - Configuración para red local de Hardhat (Chain ID: 31337)

2. **Contratos configurados para desarrollo local**
   - Hardhat node configurado con Chain ID 31337
   - Script de despliegue local creado
   - MockCCOP token para testing

3. **Scripts de despliegue**
   - `contracts/scripts/deploy-local.js` - Despliega todos los contratos
   - `scripts/start-local.sh` - Script completo de inicio

## 📋 Pasos para Desplegar en Localhost

### 1. Instalar Dependencias

```bash
# Contratos
cd contracts
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Iniciar Hardhat Node

En una terminal separada:

```bash
cd contracts
npm run node
```

Esto iniciará Hardhat node en `http://localhost:8545` con 20 cuentas de prueba.

### 3. Desplegar Contratos

En otra terminal:

```bash
cd contracts
npm run deploy:local
```

El script desplegará:
- MockCCOP
- CreditNFT
- RewardSystem
- SiteVerification
- PaymentReceipt

**⚠️ IMPORTANTE**: Copia las direcciones de los contratos que se muestran al final del despliegue.

### 4. Configurar Frontend

Crea el archivo `frontend/.env.local`:

```env
NEXT_PUBLIC_LOCAL_NFT_CONTRACT=0x... (dirección de CreditNFT)
NEXT_PUBLIC_LOCAL_REWARD_CONTRACT=0x... (dirección de RewardSystem)
NEXT_PUBLIC_LOCAL_CCOP_CONTRACT=0x... (dirección de MockCCOP)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:1880
NODE_ENV=development
```

### 5. Configurar MetaMask

#### Agregar Red Local

1. Abre MetaMask
2. Ve a Settings > Networks > Add Network
3. Agrega:
   - **Network Name**: Hardhat Local
   - **RPC URL**: http://localhost:8545
   - **Chain ID**: 31337
   - **Currency Symbol**: ETH

#### Importar Cuenta de Prueba

Usa el mnemonic que aparece en la consola de Hardhat:
```
test test test test test test test test test test test junk
```

O importa una clave privada de las cuentas que muestra Hardhat node.

### 6. Iniciar Frontend

```bash
cd frontend
npm run dev
```

Abre `http://localhost:3000` en tu navegador.

### 7. Conectar MetaMask

1. Haz clic en "Conectar con MetaMask"
2. Acepta la conexión en MetaMask
3. Asegúrate de estar en la red "Hardhat Local"
4. ¡Listo! Deberías ver el dashboard

## 🔧 Script Automático (Recomendado)

Para simplificar todo el proceso:

```bash
./scripts/start-local.sh
```

Este script:
1. Instala dependencias
2. Compila contratos
3. Inicia Hardhat node
4. Despliega contratos
5. Configura el frontend
6. Inicia el frontend

## 🧪 Testing

### Crear un NFT de Prueba

Después del despliegue, el script crea automáticamente un NFT de prueba para el deployer. Para crear más:

```bash
cd contracts
npx hardhat console --network localhost
```

```javascript
const CreditNFT = await ethers.getContractFactory("CreditNFT");
const nft = await CreditNFT.attach("DIRECCION_DEL_CONTRATO");
const [signer] = await ethers.getSigners();

const tx = await nft.mintCreditNFT(
  signer.address,
  850, // paymentScore
  5,   // consecutivePayments
  "https://api.example.com/nft/1"
);
await tx.wait();
```

### Obtener Tokens cCOP

```javascript
const MockCCOP = await ethers.getContractFactory("MockCCOP");
const cCOP = await MockCCOP.attach("DIRECCION_DEL_CONTRATO");

// Llamar al faucet para obtener tokens gratis
await cCOP.faucet();
```

## 📝 Archivos Modificados

### Frontend
- `src/app/providers.tsx` - Configurado para MetaMask y localhost
- `src/app/page.tsx` - Mejorada conexión con MetaMask
- `src/components/Welcome.tsx` - Agregado soporte para MetaMask
- `src/components/Dashboard.tsx` - Configurado para localhost
- `src/components/RewardsCard.tsx` - Actualizado para localhost
- `next.config.js` - Agregadas variables de entorno locales
- `package.json` - Eliminadas dependencias de WalletConnect

### Contratos
- `hardhat.config.js` - Configurado Chain ID 31337
- `scripts/deploy-local.js` - Script de despliegue local
- `celo/MockCCOP.sol` - Token mock para testing

## 🐛 Solución de Problemas

### Error: "MetaMask no detectado"
- Asegúrate de tener MetaMask instalado
- Refresca la página
- Verifica que MetaMask esté desbloqueado

### Error: "Contratos no configurados"
- Verifica que los contratos estén desplegados
- Verifica las direcciones en `.env.local`
- Asegúrate de que Hardhat node esté ejecutándose

### Error: "Network mismatch"
- Verifica que MetaMask esté en "Hardhat Local"
- Verifica Chain ID: 31337
- Verifica RPC URL: http://localhost:8545

### Error: "Insufficient funds"
- Las cuentas de Hardhat tienen 10,000 ETH
- Verifica que estés usando una cuenta con fondos
- Importa una cuenta de prueba

## ✅ Verificación

Después del despliegue, verifica:

1. ✅ Hardhat node ejecutándose en puerto 8545
2. ✅ Contratos desplegados (ver direcciones)
3. ✅ Frontend ejecutándose en puerto 3000
4. ✅ MetaMask configurado con red local
5. ✅ Cuenta conectada en MetaMask
6. ✅ Dashboard mostrando datos

## 🎉 Siguiente Paso

Una vez que todo esté funcionando:
1. Explora el dashboard
2. Crea NFTs de prueba
3. Prueba las funcionalidades
4. Revisa los contratos en Hardhat

## 📚 Recursos

- [Documentación de Hardhat](https://hardhat.org/docs)
- [Documentación de Wagmi](https://wagmi.sh)
- [Documentación de MetaMask](https://docs.metamask.io)

## 🔗 Enlaces Útiles

- Frontend: http://localhost:3000
- Hardhat Node: http://localhost:8545
- Documentación: Ver `docs/` directory

