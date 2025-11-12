# 🚀 Comandos para Conectar con GitHub

## ✅ Estado Actual

- ✅ Git inicializado
- ✅ Archivos agregados al staging
- ✅ Commit inicial realizado

---

## 📋 Pasos para Conectar con GitHub

### 1. **Crear Repositorio en GitHub**

1. Ve a [https://github.com/new](https://github.com/new)
2. **Repository name**: `credipass` (o el nombre que prefieras)
3. **Description**: "CrediPass - Tu pasaporte financiero digital. Sistema de reputación crediticia basado en blockchain"
4. **Visibility**: 
   - ✅ Public (recomendado para hackathon)
   - ⚠️ Private (si prefieres mantenerlo privado)
5. **NO marques**:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Haz clic en **"Create repository"**

---

### 2. **Conectar Repositorio Local con GitHub**

**Opción A: HTTPS (Más fácil para principiantes)**

```bash
# Reemplaza USERNAME con tu nombre de usuario de GitHub
# Reemplaza REPO_NAME con el nombre del repositorio que creaste

git remote add origin https://github.com/USERNAME/REPO_NAME.git
```

**Ejemplo:**
```bash
git remote add origin https://github.com/tuusuario/credipass.git
```

**Opción B: SSH (Más seguro, requiere configuración previa)**

```bash
git remote add origin git@github.com:USERNAME/REPO_NAME.git
```

---

### 3. **Verificar la Conexión**

```bash
# Ver el remote configurado
git remote -v

# Deberías ver algo como:
# origin  https://github.com/USERNAME/REPO_NAME.git (fetch)
# origin  https://github.com/USERNAME/REPO_NAME.git (push)
```

---

### 4. **Renombrar Rama Principal (si es necesario)**

```bash
# Verificar nombre de rama actual
git branch

# Si dice "master", renombrar a "main"
git branch -M main
```

---

### 5. **Subir el Código a GitHub**

```bash
# Primera vez (establecer upstream)
git push -u origin main

# O si tu rama se llama "master":
# git push -u origin master
```

**Si GitHub te pide autenticación:**
- **HTTPS**: Usa un Personal Access Token (no tu contraseña)
  - Cómo crear: [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
- **SSH**: Asegúrate de tener tu clave SSH configurada

---

## 🔄 Comandos para Futuros Cambios

Una vez conectado, para futuros cambios:

```bash
# Ver cambios
git status

# Agregar archivos modificados
git add .

# O agregar archivos específicos
git add archivo1.tsx archivo2.tsx

# Hacer commit
git commit -m "Descripción de los cambios"

# Subir cambios
git push
```

---

## 📝 Comandos Útiles Adicionales

### Ver el historial de commits
```bash
git log --oneline
```

### Ver qué archivos están siendo rastreados
```bash
git ls-files
```

### Ver diferencias antes de commit
```bash
git diff
```

### Deshacer cambios en un archivo
```bash
git checkout -- nombre-archivo.tsx
```

### Crear una nueva rama
```bash
git checkout -b nombre-rama
```

---

## ⚠️ Solución de Problemas

### Error: "remote origin already exists"
```bash
# Eliminar el remote existente
git remote remove origin

# Agregar el nuevo
git remote add origin https://github.com/USERNAME/REPO_NAME.git
```

### Error: "failed to push some refs"
```bash
# Si GitHub tiene un README inicial, hacer pull primero
git pull origin main --allow-unrelated-histories

# Luego hacer push
git push -u origin main
```

### Error: "authentication failed"
- **HTTPS**: Usa Personal Access Token en lugar de contraseña
- **SSH**: Verifica que tu clave SSH esté agregada a GitHub

---

## 🎯 Checklist Final

Antes de hacer push, verifica:

- [ ] Repositorio creado en GitHub
- [ ] Remote agregado correctamente (`git remote -v`)
- [ ] Rama principal renombrada a `main` (si es necesario)
- [ ] Autenticación configurada (Token o SSH)
- [ ] `.gitignore` está funcionando (no hay archivos sensibles)

---

## ✅ Comandos Listos para Copiar y Pegar

**Una vez que tengas el nombre de tu repositorio:**

```bash
# 1. Agregar remote (REEMPLAZA USERNAME y REPO_NAME)
git remote add origin https://github.com/USERNAME/REPO_NAME.git

# 2. Verificar
git remote -v

# 3. Renombrar rama si es necesario
git branch -M main

# 4. Subir código
git push -u origin main
```

---

**¡Listo para conectar!** 🚀

Después de ejecutar estos comandos, tu proyecto estará en GitHub y podrás:
- Compartir el enlace con evaluadores
- Configurar despliegue automático
- Colaborar con otros desarrolladores
- Mostrar tu trabajo en tu perfil

