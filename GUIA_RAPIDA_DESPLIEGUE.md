# 🚀 Guía Rápida para Volver a Desplegar el Proyecto

## ✅ Estado Actual

- ✅ **Proyecto guardado en**: `E:\HACKATHON131125`
- ✅ **Proyecto subido a GitHub**: https://github.com/BruteKaliSecurity/Sistecr-ditoHackathon
- ✅ **Todo está guardado y listo**

---

## 📋 Para Volver a Desplegar el Proyecto

### Paso 1: Navegar al Proyecto

```powershell
cd E:\HACKATHON131125
```

### Paso 2: Desplegar Todo (Opción Automática)

**Windows PowerShell:**
```powershell
.\scripts\start-all.ps1
```

O manualmente:

### Paso 3: Despliegue Manual

#### Terminal 1: Hardhat Node
```powershell
cd contracts
npm install  # Solo la primera vez
npx hardhat node
```

#### Terminal 2: Desplegar Contratos
```powershell
cd contracts
npm run deploy:local
```

#### Terminal 3: Frontend
```powershell
cd frontend
npm install  # Solo la primera vez
npm run dev
```

---

## 🔗 Enlaces Importantes

- **Repositorio GitHub**: https://github.com/BruteKaliSecurity/Sistecr-ditoHackathon
- **Frontend**: http://localhost:3000
- **Hardhat Node**: http://localhost:8545
- **Node-RED** (si se usa): http://localhost:1880

---

## 📚 Documentación Completa

- `DESPLIEGUE_COMPLETO.md` - Guía completa de despliegue
- `INICIO_RAPIDO.md` - Inicio rápido
- `GUIA_DESPLIEGUE.md` - Guía detallada

---

## ✅ Checklist de Despliegue

- [ ] Hardhat Node ejecutándose (puerto 8545)
- [ ] Contratos desplegados
- [ ] Frontend ejecutándose (puerto 3000)
- [ ] MetaMask conectado a red localhost (Chain ID: 31337)
- [ ] Variables de entorno configuradas

---

## 🎯 Comandos Rápidos

```powershell
# Iniciar todo automáticamente
.\scripts\start-all.ps1

# O paso a paso:
cd contracts && npx hardhat node
# (En otra terminal)
cd contracts && npm run deploy:local
# (En otra terminal)
cd frontend && npm run dev
```

---

## 📝 Notas

- Los datos de Hardhat Node se pierden al cerrarlo (es normal)
- El frontend funciona en modo demo si no hay wallet conectada
- Los contratos se despliegan automáticamente con direcciones en `contracts/deployments/localhost.json`

---

**¡Todo está guardado y listo para cuando lo necesites!** 🎉

