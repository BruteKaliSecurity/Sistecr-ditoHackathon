# 🌐 Guía: ¿Qué es Mainnet?

## 📚 Conceptos Básicos

### ¿Qué es Mainnet?

**Mainnet** (Red Principal) es la **blockchain real y pública** donde las transacciones tienen valor real y son permanentes. Es la versión de producción de una blockchain, donde se usan tokens reales (no de prueba) y todas las transacciones son definitivas e inmutables.

### Diferencia entre Mainnet, Testnet y Localhost

#### 1. **Localhost** (Red Local)
- ✅ **Qué es**: Blockchain que corre en tu computadora
- ✅ **Tokens**: Falsos/simulados (sin valor real)
- ✅ **Transacciones**: Instantáneas y gratuitas
- ✅ **Propósito**: Desarrollo y pruebas locales
- ✅ **Ejemplo**: Hardhat Node (localhost:8545)
- ✅ **Ventajas**: Rápido, gratis, perfecto para desarrollo
- ❌ **Desventajas**: No es real, no se puede verificar públicamente

#### 2. **Testnet** (Red de Prueba)
- ✅ **Qué es**: Blockchain pública pero de prueba
- ✅ **Tokens**: De prueba (sin valor real, se obtienen gratis)
- ✅ **Transacciones**: Gratuitas pero más lentas que localhost
- ✅ **Propósito**: Pruebas en ambiente similar a producción
- ✅ **Ejemplo**: Astar Testnet, Celo Alfajores Testnet
- ✅ **Ventajas**: Ambiente realista, gratis, público
- ❌ **Desventajas**: No es la red real, tokens sin valor

#### 3. **Mainnet** (Red Principal) ⭐
- ✅ **Qué es**: Blockchain real y pública
- ✅ **Tokens**: Reales (con valor económico real)
- ✅ **Transacciones**: Requieren pagar gas fees (costos reales)
- ✅ **Propósito**: Producción, aplicaciones reales
- ✅ **Ejemplo**: Astar Mainnet, Celo Mainnet
- ✅ **Ventajas**: Es real, verificable públicamente, producción
- ❌ **Desventajas**: Costos reales, transacciones permanentes

---

## 🎯 ¿Por qué es Importante Mainnet para el Hackathon?

### Para Sistecredito:

1. **Demostración Real**: Muestra que el proyecto funciona en producción real
2. **Verificabilidad**: Los evaluadores pueden verificar contratos en exploradores de bloques
3. **Transacciones Reales**: Demuestra que las transacciones on-chain funcionan
4. **Credibilidad**: Proyecto desplegado en Mainnet es más creíble
5. **Requisitos del Reto**: Algunos retos requieren despliegue en Mainnet

### Para Celo Colombia:

- ✅ **Requisito Obligatorio**: Debe estar desplegado en Celo Mainnet
- ✅ **Transacciones Reales**: Debe generar transacciones reales on-chain
- ✅ **Verificación**: Contratos deben estar verificados en explorador

### Para Startale:

- ✅ **Requisito Obligatorio**: Debe estar desplegado en Astar Mainnet
- ✅ **Transacciones Reales**: Debe generar transacciones reales on-chain
- ✅ **Verificación**: Contratos deben estar verificados en explorador

---

## 🔍 Mainnets Disponibles para tu Proyecto

### 1. **Astar Network Mainnet**

#### Características:
- **Chain ID**: 592
- **Símbolo**: ASTR
- **Explorador**: https://astar.subscan.io/
- **RPC**: https://evm.astar.network
- **Gas Token**: ASTR (necesitas ASTR para pagar gas)

#### Ventajas:
- ✅ Tu proyecto ya tiene contratos para Astar (CreditNFT.sol)
- ✅ Red activa y bien establecida
- ✅ Bajo costo de gas
- ✅ Buen soporte para NFTs

#### Consideraciones:
- ⚠️ Necesitas ASTR tokens para pagar gas
- ⚠️ Costos reales de despliegue (~$5-20 USD)
- ⚠️ Transacciones son permanentes

#### Cómo obtener ASTR:
1. Comprar en exchange (Binance, Coinbase, etc.)
2. Transferir a wallet MetaMask
3. Usar para pagar gas fees

---

### 2. **Celo Network Mainnet**

#### Características:
- **Chain ID**: 42220
- **Símbolo**: CELO
- **Explorador**: https://celoscan.io/
- **RPC**: https://forno.celo.org
- **Gas Token**: CELO (necesitas CELO para pagar gas)

#### Ventajas:
- ✅ Tu proyecto ya usa cCOP (MockCCOP)
- ✅ Enfoque en inclusión financiera (alineado con Sistecredito)
- ✅ Bajo costo de gas
- ✅ Buen soporte para stablecoins

#### Consideraciones:
- ⚠️ Necesitas CELO tokens para pagar gas
- ⚠️ Costos reales de despliegue (~$5-20 USD)
- ⚠️ Transacciones son permanentes
- ⚠️ Para Celo Colombia, debes usar cCOP real (no MockCCOP)

#### Cómo obtener CELO:
1. Comprar en exchange (Binance, Coinbase, etc.)
2. Transferir a wallet MetaMask
3. Usar para pagar gas fees

---

## 💰 Costos de Despliegue en Mainnet

### Estimación de Costos:

#### Astar Mainnet:
- **Desplegar CreditNFT**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Desplegar RewardSystem**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Desplegar MockCCOP**: ~0.01-0.05 ASTR (~$0.10-0.50 USD)
- **Transacciones de prueba**: ~0.001 ASTR cada una (~$0.01 USD)
- **Total estimado**: ~$1-5 USD

#### Celo Mainnet:
- **Desplegar CreditNFT**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Desplegar RewardSystem**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Desplegar MockCCOP**: ~0.01-0.05 CELO (~$0.10-0.50 USD)
- **Transacciones de prueba**: ~0.001 CELO cada una (~$0.01 USD)
- **Total estimado**: ~$1-5 USD

### Nota sobre Costos:
- Los costos son **reales** (no simulados)
- Necesitas tener tokens en tu wallet antes de desplegar
- Los costos pueden variar según el precio del token y la congestión de la red

---

## 🔐 Seguridad y Consideraciones

### Antes de Desplegar en Mainnet:

1. **Prueba en Testnet primero**:
   - Despliega en Testnet (Astar Testnet o Celo Alfajores)
   - Prueba todas las funcionalidades
   - Verifica que todo funcione correctamente

2. **Revisa el código**:
   - Asegúrate de que el código esté probado
   - Verifica que no haya errores
   - Revisa la seguridad de los contratos

3. **Prepara tu wallet**:
   - Asegúrate de tener tokens suficientes (ASTR o CELO)
   - Verifica que tu wallet esté segura
   - Ten backup de tus claves privadas

4. **Documenta las direcciones**:
   - Guarda las direcciones de los contratos desplegados
   - Verifica los contratos en el explorador
   - Documenta en README.md

---

## 📋 Proceso de Despliegue en Mainnet

### Pasos Generales:

1. **Preparar ambiente**:
   ```bash
   # Configurar variables de entorno
   # Agregar claves privadas de forma segura
   # Configurar red en Hardhat
   ```

2. **Obtener tokens**:
   - Comprar ASTR o CELO en exchange
   - Transferir a wallet MetaMask
   - Verificar balance

3. **Desplegar contratos**:
   ```bash
   # Ejecutar script de despliegue
   npm run deploy:mainnet
   ```

4. **Verificar contratos**:
   - Verificar en explorador de bloques
   - Probar funcionalidades
   - Documentar direcciones

5. **Actualizar frontend**:
   - Actualizar direcciones de contratos
   - Configurar red en MetaMask
   - Probar conexión

---

## 🎯 Recomendación para tu Proyecto

### Para Sistecredito:

**Opción 1: Astar Mainnet** (Recomendado)
- ✅ Ya tienes contratos para Astar
- ✅ Menor complejidad
- ✅ Bajo costo
- ✅ Buen soporte para NFTs

**Opción 2: Celo Mainnet**
- ✅ Enfoque en inclusión financiera
- ✅ Compatible con cCOP
- ✅ Alineado con impacto social

### Para Celo Colombia:

**Obligatorio: Celo Mainnet**
- ✅ Requisito del reto
- ✅ Debe usar cCOP real (no MockCCOP)
- ✅ Debe estar en producción

### Para Startale:

**Obligatorio: Astar Mainnet**
- ✅ Requisito del reto
- ✅ Debe usar tecnología de Astar
- ✅ Debe generar transacciones reales

---

## 🚀 Próximos Pasos

### 1. Decidir Blockchain:
- **Sistecredito**: Astar o Celo (tu elección)
- **Celo Colombia**: Celo (obligatorio)
- **Startale**: Astar (obligatorio)

### 2. Preparar Wallet:
- Crear/verificar wallet MetaMask
- Obtener tokens (ASTR o CELO)
- Verificar balance

### 3. Probar en Testnet:
- Desplegar en Testnet primero
- Probar todas las funcionalidades
- Verificar que todo funcione

### 4. Desplegar en Mainnet:
- Ejecutar script de despliegue
- Verificar contratos
- Documentar direcciones

### 5. Actualizar Frontend:
- Actualizar direcciones de contratos
- Configurar red en MetaMask
- Probar en Mainnet

---

## ❓ Preguntas Frecuentes

### ¿Necesito pagar para desplegar en Mainnet?
Sí, necesitas pagar gas fees en tokens reales (ASTR o CELO). El costo es bajo (~$1-5 USD).

### ¿Puedo desplegar en Mainnet sin probar antes?
No es recomendable. Siempre prueba en Testnet primero.

### ¿Qué pasa si cometo un error en Mainnet?
Las transacciones en Mainnet son permanentes. Por eso es importante probar primero en Testnet.

### ¿Necesito verificar los contratos?
Sí, es recomendable verificar los contratos en el explorador para que sean públicos y verificables.

### ¿Puedo usar MockCCOP en Mainnet?
Para desarrollo puedes usar MockCCOP, pero para Celo Colombia necesitas usar cCOP real.

---

## 📚 Recursos Adicionales

### Astar Network:
- **Documentación**: https://docs.astar.network/
- **Explorador**: https://astar.subscan.io/
- **Faucet Testnet**: https://faucet.astar.network/

### Celo Network:
- **Documentación**: https://docs.celo.org/
- **Explorador**: https://celoscan.io/
- **Faucet Testnet**: https://faucet.celo.org/

### Herramientas:
- **Hardhat**: https://hardhat.org/
- **MetaMask**: https://metamask.io/
- **Remix**: https://remix.ethereum.org/

---

## 🎯 Conclusión

**Mainnet** es la blockchain real donde tu proyecto funciona en producción. Es importante para el hackathon porque:

1. ✅ Demuestra que el proyecto funciona en producción
2. ✅ Permite verificación pública de contratos
3. ✅ Muestra transacciones reales on-chain
4. ✅ Aumenta credibilidad del proyecto
5. ✅ Cumple con requisitos de algunos retos

**Recomendación**: Para Sistecredito, puedes elegir Astar o Celo Mainnet. Para Celo Colombia o Startale, la elección es obligatoria (Celo o Astar respectivamente).

---

**¿Listo para crear el script de despliegue?** 🚀

Si estás listo, puedo crear el script de despliegue para Astar Mainnet o Celo Mainnet (o ambos). Solo necesito que me digas:
1. ¿Qué blockchain quieres usar? (Astar o Celo)
2. ¿Tienes tokens en tu wallet? (ASTR o CELO)
3. ¿Quieres probar en Testnet primero?

