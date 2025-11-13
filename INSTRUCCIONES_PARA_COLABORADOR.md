# 👥 Instrucciones para Colaborador - CrediPass

## 📍 Información del Repositorio

**URL del Repositorio:**
```
https://github.com/BruteKaliSecurity/Sistecr-ditoHackathon.git
```

**Repositorio Web:**
https://github.com/BruteKaliSecurity/Sistecr-ditoHackathon

---

## 🚀 Pasos para Clonar y Configurar el Proyecto

### 1️⃣ Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/BruteKaliSecurity/Sistecr-ditoHackathon.git

# Navegar al directorio
cd Sistecr-ditoHackathon
```

### 2️⃣ Instalar Dependencias

#### Contratos (Smart Contracts)
```bash
cd contracts
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado:

- ✅ **Node.js 18+** ([Descargar](https://nodejs.org/))
- ✅ **npm** (viene con Node.js)
- ✅ **Git** ([Descargar](https://git-scm.com/))
- ✅ **MetaMask** (extensión del navegador) ([Descargar](https://metamask.io/))

---

## 🎯 Despliegue Rápido (Opción Automática)

### Windows (PowerShell)
```powershell
# Desde la raíz del proyecto
.\scripts\start-all.ps1
```

### Linux/Mac (Bash)
```bash
# Dar permisos de ejecución
chmod +x scripts/start-all.sh

# Ejecutar script
./scripts/start-all.sh
```

Este script automáticamente:
1. ✅ Inicia Hardhat Node (puerto 8545)
2. ✅ Despliega todos los contratos
3. ✅ Configura variables de entorno
4. ✅ Inicia Node-RED (puerto 1880)
5. ✅ Inicia Frontend (puerto 3000)

---

## 🔧 Despliegue Manual (Paso a Paso)

### Terminal 1: Hardhat Node
```bash
cd contracts
npx hardhat node
```
Deja esta terminal abierta. Verás 20 cuentas con fondos.

### Terminal 2: Desplegar Contratos
```bash
cd contracts
npx hardhat run scripts/deploy-local.js --network localhost
```

**⚠️ IMPORTANTE**: Copia las direcciones de los contratos que aparecen:
- `CreditNFT: 0x...`
- `RewardSystem: 0x...`
- `MockCCOP: 0x...`

### Terminal 3: Frontend
```bash
cd frontend
npm run dev
```

El frontend estará disponible en: **http://localhost:3000**

---

## ⚙️ Configuración de Variables de Entorno

Si el script automático no creó el archivo `.env.local`, créalo manualmente:

**Ubicación:** `frontend/.env.local`

```env
NEXT_PUBLIC_LOCAL_NFT_CONTRACT=0x... (dirección de CreditNFT)
NEXT_PUBLIC_LOCAL_REWARD_CONTRACT=0x... (dirección de RewardSystem)
NEXT_PUBLIC_LOCAL_CCOP_CONTRACT=0x... (dirección de MockCCOP)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:1880
NODE_ENV=development
```

---

## 🔌 Configurar MetaMask

### 1. Agregar Red Local

1. Abre MetaMask
2. Ve a **Settings → Networks → Add Network**
3. Agrega la siguiente configuración:
   - **Network Name**: `Hardhat Local`
   - **RPC URL**: `http://localhost:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: `ETH`

### 2. Importar Cuenta de Prueba

1. En MetaMask, ve a **Account → Import Account**
2. Usa el mnemonic que aparece en la terminal de Hardhat:
   ```
   test test test test test test test test test test test junk
   ```
3. O importa una clave privada de las cuentas mostradas en Hardhat

---

## 📂 Estructura del Proyecto

```
Sistecr-ditoHackathon/
├── contracts/          # Contratos inteligentes (Solidity)
│   ├── contracts/     # Código fuente de contratos
│   ├── scripts/       # Scripts de despliegue
│   └── deployments/  # Direcciones de contratos desplegados
├── frontend/          # Aplicación Next.js
│   ├── src/
│   │   ├── app/      # Páginas y layouts
│   │   └── components/ # Componentes React
│   └── .env.local    # Variables de entorno (crear manualmente)
└── scripts/          # Scripts de despliegue automático
```

---

## 🌐 URLs de los Servicios

Una vez desplegado, los servicios estarán disponibles en:

- **Frontend**: http://localhost:3000
- **Hardhat Node**: http://localhost:8545
- **Node-RED** (Backend): http://localhost:1880

---

## 📝 Comandos Útiles

### Ver estado de Git
```bash
git status
```

### Ver ramas
```bash
git branch
```

### Crear nueva rama para trabajar
```bash
git checkout -b nombre-de-tu-rama
```

### Ver commits recientes
```bash
git log --oneline -10
```

### Actualizar desde el repositorio remoto
```bash
git pull origin main
```

---

## 🐛 Solución de Problemas

### Error: "Puerto ya en uso"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: "Contratos no configurados"
- Verifica que `frontend/.env.local` exista
- Verifica que las direcciones sean correctas
- Verifica que Hardhat node esté ejecutándose

### Error: "MetaMask no detectado"
- Instala MetaMask
- Refresca la página
- Verifica que MetaMask esté desbloqueado

### Error: "Network mismatch"
- Cambia a red "Hardhat Local" en MetaMask
- Verifica Chain ID: 31337

---

## 📚 Documentación Adicional

En el repositorio encontrarás:

- `README.md` - Documentación principal del proyecto
- `DESPLIEGUE_COMPLETO.md` - Guía completa de despliegue
- `INICIO_RAPIDO.md` - Inicio rápido
- `GUIA_DESPLIEGUE.md` - Guía detallada de despliegue
- `LOCALHOST_SETUP.md` - Configuración para localhost

---

## ✅ Checklist de Verificación

Antes de empezar a trabajar, verifica:

- [ ] Repositorio clonado
- [ ] Dependencias instaladas (`npm install` en contracts y frontend)
- [ ] Hardhat Node ejecutándose (puerto 8545)
- [ ] Contratos desplegados
- [ ] Frontend ejecutándose (puerto 3000)
- [ ] MetaMask configurado con red localhost
- [ ] Variables de entorno configuradas

---

## 💡 Notas Importantes

- ⚠️ **Los datos son locales**: Todo se pierde al reiniciar Hardhat node
- ⚠️ **Solo para desarrollo**: No uses en producción
- ✅ **Tokens de prueba**: Las cuentas de Hardhat tienen 10,000 ETH
- ✅ **NFTs de prueba**: El script de despliegue crea un NFT de prueba automáticamente

---

## 📞 Contacto

Si tienes dudas o problemas, consulta:
- La documentación en el repositorio
- Los archivos `.md` en la raíz del proyecto
- El README.md principal

---

**¡Listo para empezar a trabajar! 🚀**

