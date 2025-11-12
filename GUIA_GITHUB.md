# 🚀 Guía para Subir el Proyecto a GitHub

## ✅ Preparación Completada

El proyecto está listo para subirse a GitHub. Se ha creado un `.gitignore` completo que excluye:
- ✅ `node_modules/`
- ✅ Archivos `.env` y variables de entorno
- ✅ Archivos de build y cache
- ✅ Archivos del sistema operativo
- ✅ Archivos temporales

---

## 📋 Pasos para Subir a GitHub

### 1. **Inicializar Git (si no está inicializado)**

```bash
# En la raíz del proyecto
git init
```

### 2. **Agregar todos los archivos**

```bash
# Ver qué archivos se van a agregar
git status

# Agregar todos los archivos
git add .
```

### 3. **Hacer el primer commit**

```bash
git commit -m "Initial commit: CrediPass - Pasaporte Financiero Digital"
```

### 4. **Crear repositorio en GitHub**

1. Ve a [GitHub.com](https://github.com)
2. Haz clic en "New repository"
3. Nombre sugerido: `credipass` o `credipass-blockchain`
4. **NO** inicialices con README, .gitignore o licencia (ya los tenemos)
5. Haz clic en "Create repository"

### 5. **Conectar repositorio local con GitHub**

```bash
# Reemplaza USERNAME y REPO_NAME con tus datos
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# O si prefieres SSH:
# git remote add origin git@github.com:USERNAME/REPO_NAME.git
```

### 6. **Subir el código**

```bash
# Primera vez (establecer upstream)
git push -u origin main

# O si tu rama se llama master:
# git branch -M main
# git push -u origin main
```

---

## ⚠️ **IMPORTANTE: Antes de Subir**

### ✅ Verificar que NO se suban archivos sensibles:

```bash
# Revisar qué archivos se van a subir
git status

# Verificar que .env NO esté incluido
git check-ignore .env
```

### 📝 Archivos que DEBEN estar en GitHub:

- ✅ Código fuente (`.tsx`, `.ts`, `.sol`)
- ✅ Archivos de configuración (`package.json`, `tsconfig.json`)
- ✅ Documentación (`.md`)
- ✅ Scripts de despliegue
- ✅ `env.example.txt` (plantilla de variables de entorno)

### 🚫 Archivos que NO deben estar:

- ❌ `.env` o `.env.local`
- ❌ `node_modules/`
- ❌ Claves privadas
- ❌ Archivos de build
- ❌ Cache de Hardhat

---

## 🔒 Seguridad

### Si accidentalmente subiste información sensible:

1. **Eliminar del historial de Git:**
   ```bash
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch .env" \
     --prune-empty --tag-name-filter cat -- --all
   ```

2. **O usar BFG Repo-Cleaner:**
   ```bash
   # Instalar BFG
   # java -jar bfg.jar --delete-files .env
   ```

3. **Forzar push (¡CUIDADO!):**
   ```bash
   git push origin --force --all
   ```

4. **Cambiar todas las claves/secretos** que se hayan expuesto

---

## 📦 Estructura Recomendada del Repositorio

```
credipass/
├── README.md                    # ⚠️ CREAR ESTE ARCHIVO
├── .gitignore                   # ✅ Ya creado
├── contracts/                   # ✅ Contratos Solidity
├── frontend/                    # ✅ Frontend Next.js
├── scripts/                     # ✅ Scripts de despliegue
├── docs/                        # 📝 Documentación (opcional)
│   ├── DESPLIEGUE_COMPLETO.md
│   ├── GUIA_DESPLIEGUE.md
│   └── ...
└── LICENSE                      # 📝 Considera agregar una licencia
```

---

## 🎯 Próximos Pasos Después de Subir

1. **Crear README.md** (mejora crítica)
2. **Configurar GitHub Actions** (CI/CD opcional)
3. **Agregar badges** al README
4. **Configurar GitHub Pages** (si quieres documentación web)
5. **Agregar issues template** (para contribuciones)

---

## 📚 Recursos Útiles

- [GitHub Docs](https://docs.github.com)
- [Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Gitignore Templates](https://github.com/github/gitignore)

---

## ✅ Checklist Antes de Push

- [ ] `.gitignore` configurado correctamente
- [ ] No hay archivos `.env` en el staging
- [ ] `node_modules/` está excluido
- [ ] README.md creado (o al menos planificado)
- [ ] No hay claves privadas en el código
- [ ] Los scripts funcionan correctamente
- [ ] La documentación está actualizada

---

**¡Listo para subir!** 🚀

