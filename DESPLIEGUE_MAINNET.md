# 🌐 Guía de Despliegue en Mainnet - CrediPass

Guía completa para desplegar el proyecto CrediPass en Mainnet (Astar o Celo).

---

## ⚠️ ADVERTENCIAS IMPORTANTES

- **Tokens REALES**: Mainnet usa tokens con valor económico real
- **Transacciones PERMANENTES**: No se pueden revertir
- **Costos REALES**: Necesitas pagar gas fees (~$1-5 USD)
- **Prueba primero**: Siempre prueba en Testnet antes de Mainnet

---

## 📋 Requisitos Previos

### 1. Wallet con Fondos

Necesitas tener tokens en tu wallet:

- **Para Astar Mainnet**: ASTR tokens (~0.1 ASTR mínimo)
- **Para Celo Mainnet**: CELO tokens (~0.1 CELO mínimo)

**Cómo obtener tokens:**
1. Comprar en exchange (Binance, Coinbase, etc.)
2. Transferir a tu wallet MetaMask
3. Verificar balance antes de desplegar

### 2. Clave Privada

- Exporta la clave privada de tu wallet MetaMask
- **⚠️ NUNCA compartas tu clave privada**
- Usa una wallet dedicada solo para despliegue

### 3. Node.js y Dependencias

```bash
cd contracts
npm install
```

---

## 🔧 Configuración

### Paso 1: Crear archivo .env

```bash
cd contracts
cp .env.example .env
```

### Paso 2: Editar .env

Abre `contracts/.env` y agrega:

```env
PRIVATE_KEY=tu_clave_privada_aqui
```

**⚠️ IMPORTANTE:**
- El archivo `.env` está en `.gitignore` (no se subirá a GitHub)
- Nunca compartas tu clave privada
- Usa una wallet dedicada

### Paso 3: Verificar Balance

Antes de desplegar, verifica que tengas suficiente balance:

```bash
# Ver balance en Astar Mainnet
npx hardhat run scripts/check-balance.js --network astar

# Ver balance en Celo Mainnet
npx hardhat run scripts/check-balance.js --network celo
```

---

## 🚀 Despliegue en Astar Mainnet

### Paso 1: Obtener ASTR Tokens

1. Compra ASTR en un exchange
2. Transfiere a tu wallet MetaMask
3. Agrega red Astar Mainnet en MetaMask:
   - **Network Name**: Astar Mainnet
   - **RPC URL**: https://evm.astar.network
   - **Chain ID**: 592
   - **Currency Symbol**: ASTR

### Paso 2: Desplegar Contratos

```bash
cd contracts
npx hardhat run scripts/deploy-mainnet.js --network astar
```

El script:
- ✅ Valida que tienes balance suficiente
- ✅ Muestra advertencias de seguridad
- ✅ Despliega los 3 contratos
- ✅ Guarda las direcciones en `deployments/astar-mainnet.json`

### Paso 3: Verificar Contratos (Opcional)

```bash
# Verificar CreditNFT
npx hardhat verify --network astar <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>

# Ejemplo:
npx hardhat verify --network astar 0x... 0x...
```

### Paso 4: Actualizar Frontend

Crea `frontend/.env.production`:

```env
NEXT_PUBLIC_ASTAR_NFT_CONTRACT=0x... (dirección de CreditNFT)
NEXT_PUBLIC_ASTAR_REWARD_CONTRACT=0x... (dirección de RewardSystem)
NEXT_PUBLIC_ASTAR_CCOP_CONTRACT=0x... (dirección de MockCCOP)
NEXT_PUBLIC_ASTAR_CHAIN_ID=592
```

---

## 🌾 Despliegue en Celo Mainnet

### Paso 1: Obtener CELO Tokens

1. Compra CELO en un exchange
2. Transfiere a tu wallet MetaMask
3. Agrega red Celo Mainnet en MetaMask:
   - **Network Name**: Celo Mainnet
   - **RPC URL**: https://forno.celo.org
   - **Chain ID**: 42220
   - **Currency Symbol**: CELO

### Paso 2: Desplegar Contratos

```bash
cd contracts
npx hardhat run scripts/deploy-mainnet.js --network celo
```

### Paso 3: Verificar Contratos (Opcional)

```bash
npx hardhat verify --network celo <CONTRACT_ADDRESS> <CONSTRUCTOR_ARGS>
```

### Paso 4: Actualizar Frontend

Crea `frontend/.env.production`:

```env
NEXT_PUBLIC_CELO_NFT_CONTRACT=0x... (dirección de CreditNFT)
NEXT_PUBLIC_CELO_REWARD_CONTRACT=0x... (dirección de RewardSystem)
NEXT_PUBLIC_CELO_CCOP_CONTRACT=0x... (dirección de MockCCOP)
NEXT_PUBLIC_CELO_CHAIN_ID=42220
```

---

## 📊 Costos Estimados

### Astar Mainnet:
- **Desplegar CreditNFT**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Desplegar RewardSystem**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Desplegar MockCCOP**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Transacciones adicionales**: ~0.001 ASTR cada una
- **Total estimado**: ~$1-5 USD

### Celo Mainnet:
- **Desplegar CreditNFT**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Desplegar RewardSystem**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Desplegar MockCCOP**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Transacciones adicionales**: ~0.001 CELO cada una
- **Total estimado**: ~$1-5 USD

---

## ✅ Verificación Post-Despliegue

### 1. Verificar en Explorador

- **Astar**: https://astar.subscan.io
- **Celo**: https://celoscan.io

Busca las direcciones de tus contratos y verifica:
- ✅ Contratos desplegados correctamente
- ✅ Transacciones exitosas
- ✅ Balance de tokens correcto

### 2. Probar Funcionalidades

1. Conecta MetaMask a la red Mainnet
2. Abre el frontend (desplegado en Vercel)
3. Conecta tu wallet
4. Prueba:
   - Ver NFT
   - Registrar pago
   - Reclamar recompensas

### 3. Documentar Direcciones

Guarda las direcciones de los contratos en:
- `contracts/deployments/[network]-mainnet.json`
- `README.md`
- Documentación del proyecto

---

## 🔍 Exploradores de Bloques

### Astar Mainnet:
- **Subscan**: https://astar.subscan.io
- **Blockscout**: https://blockscout.com/astar

### Celo Mainnet:
- **CeloScan**: https://celoscan.io
- **Blockscout**: https://explorer.celo.org

---

## 🐛 Solución de Problemas

### Error: "Insufficient funds"
- **Solución**: Obtén más tokens (ASTR o CELO) en tu wallet

### Error: "Nonce too high"
- **Solución**: Espera unos segundos y vuelve a intentar

### Error: "Network mismatch"
- **Solución**: Verifica que estés usando la red correcta en Hardhat

### Error: "Contract verification failed"
- **Solución**: Verifica que los argumentos del constructor sean correctos

---

## 📝 Checklist de Despliegue

Antes de desplegar:
- [ ] Wallet con balance suficiente (0.1+ tokens)
- [ ] Clave privada configurada en `.env`
- [ ] Archivo `.env` no está en Git (verificado)
- [ ] Probado en Testnet primero
- [ ] Código revisado y sin errores

Durante el despliegue:
- [ ] Script ejecutado correctamente
- [ ] Direcciones de contratos guardadas
- [ ] Transacciones exitosas en explorador

Después del despliegue:
- [ ] Contratos verificados en explorador
- [ ] Frontend actualizado con nuevas direcciones
- [ ] Funcionalidades probadas en Mainnet
- [ ] Documentación actualizada

---

## 🎯 Recomendaciones

### Para Sistecredito:
- **Opcional**: Mainnet aumenta credibilidad pero no es requerido
- **Recomendado**: Testnet es suficiente

### Para Celo Colombia:
- **Obligatorio**: Debe estar en Celo Mainnet
- **Requisito**: Transacciones reales on-chain

### Para Startale:
- **Obligatorio**: Debe estar en Astar Mainnet
- **Requisito**: Transacciones reales on-chain

---

## 📚 Recursos Adicionales

- **Astar Docs**: https://docs.astar.network/
- **Celo Docs**: https://docs.celo.org/
- **Hardhat Docs**: https://hardhat.org/docs
- **MetaMask**: https://metamask.io/

---

## 🚨 Seguridad

- ⚠️ **NUNCA** compartas tu clave privada
- ⚠️ **NUNCA** subas el archivo `.env` a GitHub
- ⚠️ Usa una wallet dedicada solo para despliegue
- ⚠️ Verifica las direcciones antes de confirmar transacciones
- ⚠️ Prueba en Testnet antes de Mainnet

---

**¡Listo para desplegar en Mainnet! 🚀**

Si tienes dudas, consulta primero la documentación o prueba en Testnet.

