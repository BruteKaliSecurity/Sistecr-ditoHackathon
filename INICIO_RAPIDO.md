# 🚀 Inicio Rápido - Confianza Móvil Localhost

## Pasos Rápidos para Ver el Proyecto Funcionando

### 1️⃣ Instalar Dependencias

```bash
# Contratos
cd contracts
npm install

# Frontend  
cd ../frontend
npm install
```

### 2️⃣ Iniciar Hardhat Node (Terminal 1)

```bash
cd contracts
npm run node
```

Deja esta terminal abierta. Verás 20 cuentas con fondos.

### 3️⃣ Desplegar Contratos (Terminal 2)

```bash
cd contracts
npm run deploy:local
```

**⚠️ IMPORTANTE**: Copia las direcciones de los contratos que aparecen al final:
- `CreditNFT: 0x...`
- `RewardSystem: 0x...`
- `MockCCOP: 0x...`

### 4️⃣ Configurar Frontend

Crea `frontend/.env.local` con las direcciones:

```env
NEXT_PUBLIC_LOCAL_NFT_CONTRACT=0x... (pega la dirección de CreditNFT)
NEXT_PUBLIC_LOCAL_REWARD_CONTRACT=0x... (pega la dirección de RewardSystem)
NEXT_PUBLIC_LOCAL_CCOP_CONTRACT=0x... (pega la dirección de MockCCOP)
NODE_ENV=development
```

### 5️⃣ Configurar MetaMask

1. Abre MetaMask
2. Agrega red:
   - Nombre: `Hardhat Local`
   - RPC: `http://localhost:8545`
   - Chain ID: `31337`
   - Símbolo: `ETH`
3. Importa cuenta usando el mnemonic que aparece en la terminal de Hardhat:
   ```
   test test test test test test test test test test test junk
   ```

### 6️⃣ Iniciar Frontend (Terminal 3)

```bash
cd frontend
npm run dev
```

### 7️⃣ Abrir en Navegador

1. Abre `http://localhost:3000`
2. Haz clic en "Conectar con MetaMask"
3. Acepta en MetaMask
4. ¡Listo! Verás el dashboard

## ✅ Verificación

Si todo está bien, deberías ver:
- ✅ Dashboard cargando
- ✅ Tu dirección de wallet en el header
- ✅ Tarjetas de reputación, recompensas, crédito
- ✅ NFT de prueba (si se creó durante el despliegue)

## 🐛 Problemas Comunes

### "Contratos no configurados"
- Verifica que `.env.local` tenga las direcciones correctas
- Verifica que Hardhat node esté ejecutándose

### "MetaMask no detectado"
- Instala MetaMask
- Refresca la página

### "Network mismatch"
- Cambia a red "Hardhat Local" en MetaMask
- Verifica Chain ID: 31337

## 📝 Notas

- Los contratos se despliegan automáticamente con un NFT de prueba
- Puedes obtener tokens cCOP llamando al método `faucet()` del contrato MockCCOP
- Todos los datos son locales y se pierden al reiniciar Hardhat node

## 🎉 ¡Listo!

Ahora puedes:
- Ver tu reputación
- Ver tus recompensas
- Ver tu crédito disponible
- Ver tus NFTs

