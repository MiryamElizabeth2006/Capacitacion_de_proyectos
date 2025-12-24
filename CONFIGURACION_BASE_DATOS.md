# Guía de Configuración de Base de Datos

## 📋 Índice

1. [Requisitos Previos](#requisitos-previos)
2. [Configuración de Docker](#configuración-de-docker)
3. [Variables de Entorno](#variables-de-entorno)
4. [Comandos de Instalación](#comandos-de-instalación)
5. [Inicio de la Aplicación](#inicio-de-la-aplicación)
6. [Verificación de la Conexión](#verificación-de-la-conexión)
7. [Gestión con pgAdmin](#gestión-con-pgadmin)
8. [Solución de Problemas](#solución-de-problemas)

---

## 🔧 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** o **yarn**
- **Docker Desktop** (para Windows/Mac) o **Docker Engine** (para Linux)
- **Docker Compose** (incluido en Docker Desktop)

### Verificar Instalaciones

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar Docker
docker --version

# Verificar Docker Compose
docker-compose --version
```

---

## 🐳 Configuración de Docker

### Archivo docker-compose.yml

El proyecto incluye un archivo `docker-compose.yml` que configura:

1. **PostgreSQL 15**: Base de datos principal
2. **pgAdmin 4**: Interfaz web para gestión de la base de datos

### Configuración de la Base de Datos

```yaml
PostgreSQL:
  - Base de datos: nest_db
  - Usuario: admin
  - Contraseña: 123456
  - Puerto: 5432

pgAdmin:
  - URL: http://localhost:5050
  - Email: admin@mail.com
  - Contraseña: admin
```

---

## 🔐 Variables de Entorno

### Crear Archivo .env

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
# Configuración de Base de Datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=admin
DB_PASSWORD=123456
DB_NAME=nest_db
```

### ⚠️ Importante

- **NO** subas el archivo `.env` al control de versiones (debe estar en `.gitignore`)
- Ajusta las credenciales según tus necesidades de seguridad
- En producción, usa variables de entorno del sistema o un gestor de secretos

### Estructura del Archivo .env

```
project-example/
├── .env                    ← Crear este archivo
├── docker-compose.yml
├── package.json
└── src/
```

---

## 📦 Comandos de Instalación

### 1. Instalar Dependencias del Proyecto

```bash
# Navegar al directorio del proyecto
cd project-example

# Instalar todas las dependencias
npm install
```

Este comando instalará:
- NestJS y sus módulos
- TypeORM y el driver de PostgreSQL
- Validadores y transformadores
- Todas las dependencias de desarrollo

### 2. Iniciar Contenedores Docker

```bash
# Iniciar PostgreSQL y pgAdmin
docker-compose up -d
```

El flag `-d` ejecuta los contenedores en segundo plano (detached mode).

### Verificar que los Contenedores Están Corriendo

```bash
# Ver estado de los contenedores
docker-compose ps

# O con Docker directamente
docker ps
```

Deberías ver dos contenedores corriendo:
- `postgres-db` (PostgreSQL)
- `pgadmin` (pgAdmin)

---

## 🚀 Inicio de la Aplicación

### Modo Desarrollo (Recomendado)

```bash
# Iniciar en modo desarrollo con watch mode
npm run start:dev
```

Este comando:
- Compila TypeScript automáticamente
- Reinicia el servidor cuando detecta cambios
- Muestra logs detallados

### Modo Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar versión compilada
npm run start:prod
```

### Otros Modos Disponibles

```bash
# Modo normal (sin watch)
npm run start

# Modo debug
npm run start:debug
```

---

## ✅ Verificación de la Conexión

### 1. Verificar Logs de la Aplicación

Al iniciar la aplicación, deberías ver en la consola:

```
[Nest] INFO [NestFactory] Starting Nest application...
DB_USER: admin
DB_PASSWORD: 123456
[Nest] INFO [InstanceLoader] TypeOrmModule dependencies initialized
[Nest] INFO [InstanceLoader] UsersModule dependencies initialized
[Nest] INFO [InstanceLoader] ProductsModule dependencies initialized
[Nest] INFO [NestApplication] Nest application successfully started
```

### 2. Verificar Conexión a PostgreSQL

```bash
# Conectar directamente a PostgreSQL desde Docker
docker exec -it postgres-db psql -U admin -d nest_db

# Una vez dentro, puedes ejecutar comandos SQL:
# \dt          - Listar tablas
# \q           - Salir
```

### 3. Verificar que las Tablas se Crearon

TypeORM creará automáticamente las tablas `users` y `products` cuando la aplicación se inicie (debido a `synchronize: true`).

```sql
-- Dentro de psql
\dt

-- Deberías ver:
-- public | products
-- public | users
```

---

## 🖥️ Gestión con pgAdmin

### Acceder a pgAdmin

1. Abre tu navegador web
2. Ve a: `http://localhost:5050`
3. Inicia sesión con:
   - **Email**: `admin@mail.com`
   - **Password**: `admin`

### Configurar Conexión a PostgreSQL

1. Click derecho en **Servers** → **Register** → **Server**

2. En la pestaña **General**:
   - **Name**: `NestJS Database` (o cualquier nombre)

3. En la pestaña **Connection**:
   - **Host name/address**: `postgres-db` (nombre del contenedor)
   - **Port**: `5432`
   - **Maintenance database**: `nest_db`
   - **Username**: `admin`
   - **Password**: `123456`
   - ✅ Marcar **Save password**

4. Click en **Save**

### Verificar Datos

Una vez conectado, puedes:
- Explorar las tablas `users` y `products`
- Ejecutar consultas SQL
- Ver la estructura de las tablas
- Insertar/modificar datos manualmente

---

## 🔄 Comandos Útiles de Docker

### Gestión de Contenedores

```bash
# Iniciar contenedores
docker-compose up -d

# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v

# Ver logs de PostgreSQL
docker-compose logs postgres

# Ver logs de pgAdmin
docker-compose logs pgadmin

# Ver todos los logs
docker-compose logs -f

# Reiniciar contenedores
docker-compose restart
```

### Acceso Directo a PostgreSQL

```bash
# Acceder al contenedor PostgreSQL
docker exec -it postgres-db bash

# Ejecutar psql directamente
docker exec -it postgres-db psql -U admin -d nest_db

# Ejecutar comando SQL específico
docker exec -it postgres-db psql -U admin -d nest_db -c "SELECT * FROM users;"
```

### Backup y Restauración

```bash
# Crear backup de la base de datos
docker exec postgres-db pg_dump -U admin nest_db > backup.sql

# Restaurar desde backup
docker exec -i postgres-db psql -U admin nest_db < backup.sql
```

---

## 🛠️ Solución de Problemas

### Problema: Puerto 5432 ya está en uso

**Solución 1**: Cambiar el puerto en `docker-compose.yml`

```yaml
ports:
  - "5433:5432"  # Cambiar 5432 por 5433
```

Y actualizar `.env`:
```env
DB_PORT=5433
```

**Solución 2**: Detener el servicio PostgreSQL local

```bash
# Windows
net stop postgresql-x64-15

# Linux
sudo systemctl stop postgresql
```

### Problema: Error de conexión a la base de datos

**Verificar**:
1. Los contenedores están corriendo: `docker-compose ps`
2. Las variables de entorno en `.env` son correctas
3. El archivo `.env` existe en la raíz del proyecto
4. Los valores coinciden con `docker-compose.yml`

### Problema: Las tablas no se crean

**Verificar**:
1. `synchronize: true` está en `app.module.ts` (solo desarrollo)
2. La aplicación se inició correctamente
3. Revisar logs de la aplicación para errores

### Problema: Error "Cannot find module"

**Solución**:
```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Problema: pgAdmin no se conecta a PostgreSQL

**Verificar**:
- En pgAdmin, usar `postgres-db` como host (no `localhost`)
- Esto es porque ambos contenedores están en la misma red Docker

---

## 📊 Estructura de la Base de Datos

### Tabla: users

| Columna    | Tipo      | Descripción                    |
|------------|-----------|--------------------------------|
| id         | SERIAL    | Primary Key, Auto-increment    |
| name       | VARCHAR   | Nombre del usuario             |
| last       | VARCHAR   | Apellido del usuario           |
| telefono   | VARCHAR   | Teléfono de contacto           |
| age        | INTEGER   | Edad del usuario               |
| isActive   | BOOLEAN   | Estado activo (default: true)  |

### Tabla: products

| Columna     | Tipo      | Descripción                    |
|-------------|-----------|--------------------------------|
| id          | SERIAL    | Primary Key, Auto-increment    |
| name        | VARCHAR   | Nombre del producto            |
| price       | DECIMAL   | Precio del producto            |
| description | VARCHAR   | Descripción del producto       |
| isActive    | BOOLEAN   | Estado activo (default: true)  |

---

## 🔒 Consideraciones de Seguridad

### Desarrollo

- ✅ `synchronize: true` está activado (solo para desarrollo)
- ✅ Credenciales por defecto en `docker-compose.yml`

### Producción

⚠️ **IMPORTANTE**: Antes de desplegar a producción:

1. **Desactivar synchronize**:
   ```typescript
   synchronize: false  // En app.module.ts
   ```

2. **Usar migraciones de TypeORM**:
   ```bash
   npm install -g typeorm
   typeorm migration:generate -n InitialMigration
   typeorm migration:run
   ```

3. **Cambiar credenciales**:
   - Usar contraseñas seguras
   - No exponer credenciales en código
   - Usar variables de entorno del sistema

4. **Configurar SSL** para conexión a PostgreSQL en producción

---

## 📝 Resumen de Comandos Rápidos

```bash
# 1. Instalar dependencias
npm install

# 2. Crear archivo .env (copiar contenido de arriba)

# 3. Iniciar base de datos
docker-compose up -d

# 4. Iniciar aplicación
npm run start:dev

# 5. Verificar que funciona
# Abrir: http://localhost:3000/users
```

---

## 🎯 Checklist de Configuración

- [ ] Docker Desktop instalado y corriendo
- [ ] Node.js y npm instalados
- [ ] Dependencias del proyecto instaladas (`npm install`)
- [ ] Archivo `.env` creado con las variables correctas
- [ ] Contenedores Docker iniciados (`docker-compose up -d`)
- [ ] Aplicación iniciada (`npm run start:dev`)
- [ ] Logs muestran conexión exitosa a la base de datos
- [ ] Tablas `users` y `products` creadas
- [ ] pgAdmin accesible en `http://localhost:5050`
- [ ] Endpoints REST funcionando correctamente

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs: `docker-compose logs`
2. Verifica las variables de entorno
3. Asegúrate de que los puertos no estén en uso
4. Reinicia los contenedores: `docker-compose restart`

---

**Última actualización**: $(date)
**Versión**: 1.0.0

