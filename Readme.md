## **步骤一：准备工作**

### **1. 安装 Python 和 Node.js**

- **Python**：确保您已安装 Python 3.x。
- **Node.js**：确保您已安装 Node.js（用于运行 React 前端）。

---

## **步骤二：设置后端（Django）**

### **1. 创建并激活虚拟环境**

```bash
# 在项目根目录下
python -m venv petlog
```

**对于 Windows：**

```bash
venv\Scripts\activate
```

**对于 macOS/Linux：**

```bash
source venv/bin/activate
```

### **2. 安装项目依赖**

```bash
pip install -r requirements.txt
```

### **3. 设置环境变量**

#### **创建 `.env` 文件**

在项目的根目录下创建一个名为 `.env` 的文件，用于存储环境变量。

```bash
# 在项目根目录下
echo > .env
```

#### **编辑 `.env` 文件**

使用文本编辑器打开 `.env` 文件，添加以下内容：

```ini
SECRET_KEY=生成的Django密钥
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

EMAIL_HOST_USER=您的邮箱地址
EMAIL_HOST_PASSWORD=您的邮箱密码

CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

**注意：**

- **SECRET_KEY**：您可以使用以下命令生成一个新的密钥：

  ```bash
  python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
  ```

- **EMAIL_HOST_USER 和 EMAIL_HOST_PASSWORD**：用于发送邮件的邮箱配置，如果暂时不需要发送邮件，可以留空或使用占位符。

- **CELERY_BROKER_URL 和 CELERY_RESULT_BACKEND**：如果您不使用 Celery，可以暂时注释掉相关配置。

### **4. 迁移数据库**

```bash
python manage.py migrate
```

### **5. 创建超级用户（可选）**

```bash
python manage.py createsuperuser
```

按照提示输入用户名、邮箱和密码。

### **6. 收集静态文件**

```bash
python manage.py collectstatic
```

---

## **步骤三：运行后端服务器**

### **1. 启动 Django 开发服务器**

```bash
python manage.py runserver
```

Django 开发服务器将在默认的 `http://127.0.0.1:8000/` 运行。

### **2. 测试后端 API**

您可以使用浏览器或 Postman 等工具访问后端 API 端点，例如：

- `http://127.0.0.1:8000/api/posts/`：获取所有帖子
- `http://127.0.0.1:8000/admin/`：访问 Django 管理后台（使用您创建的超级用户登录）

---

## **步骤四：设置前端（React）**

### **1. 进入前端项目目录**

根据项目结构，您的前端代码可能位于 `frontend` 或 `reactjs` 文件夹中。例如：

```bash
cd frontend
```

### **2. 安装前端依赖**

```bash
npm install
# 或者使用 yarn
yarn install
```

### **3. 运行前端开发服务器**

```bash
npm start
# 或者使用 yarn
yarn start
```

前端开发服务器将在 `http://localhost:3000/` 运行。

### **4. 访问网站页面**

在浏览器中打开 `http://localhost:3000/`，您应该能够看到网站的主页面。

---

## **步骤五：确保前后端通信正常**

### **1. CORS 设置**

您的 Django 项目已配置了 `corsheaders`，并允许来自 `http://localhost:3000` 的请求。

在 `settings.py` 中：

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://reactjs-pet-blog.netlify.app",
]
```

### **2. 检查 API 请求**

在前端，确保所有 API 请求都指向后端服务器的正确地址，例如 `http://localhost:8000/api/...`。

### **3. 代理设置（可选）**

如果前端项目需要代理请求到后端，可以在前端的 `package.json` 中添加：

```json
"proxy": "http://localhost:8000"
```

---

## **常见问题及解决方法**

### **1. 环境变量未生效**

- 确保您已在项目根目录下创建 `.env` 文件，并正确设置了变量。
- 确保您的 `settings.py` 中已使用 `load_dotenv()` 加载环境变量。

### **2. 后端无法连接到 Redis（Celery）**

- 如果您不需要使用 Celery，可以暂时注释掉相关配置，或者安装并运行 Redis。

### **3. 前端无法访问后端 API**

- 确保 Django 开发服务器正在运行。
- 检查前端代码中的 API 请求地址，确保指向 `http://localhost:8000`。
- 检查后端的 CORS 设置，确保允许来自前端的请求。

### **4. 数据库问题**

- 如果在迁移数据库时遇到问题，确保您的数据库设置正确，或者尝试删除旧的数据库文件（如 `db.sqlite3`），重新迁移。

### **5. 静态文件无法加载**

- 确保您已运行 `python manage.py collectstatic`。
- 检查 `STATIC_URL` 和 `STATIC_ROOT` 的配置。
