# Nexus Backend - Advanced Backend API

A production-ready, scalable backend API built with **Node.js**, **Express**, **TypeScript**, and **MongoDB**.

## 🚀 Features

### Authentication & Authorization
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control (RBAC)
- ✅ User registration and login
- ✅ Profile management

### E-Commerce Features
- 🛍️ Product catalog with categories
- 🛒 Shopping cart management
- 📦 Order management and tracking
- ⭐ Product reviews and ratings
- 📊 Stock management and validation

### Security & Performance
- 🔐 Helmet for HTTP security headers
- 🔒 CORS support
- ⚡ Rate limiting
- 💾 In-memory caching
- 🗂️ Request validation with Joi
- 📝 Comprehensive logging with Winston

### Developer Experience
- 📖 API documentation
- 🧪 Jest testing framework
- 🔍 ESLint configuration
- 💅 Prettier code formatting
- 🐳 Docker & Docker Compose
- 🔄 GitHub Actions CI/CD

## 📦 Tech Stack

- **Runtime:** Node.js 16+
- **Language:** TypeScript 5+
- **Framework:** Express.js 4+
- **Database:** MongoDB with Mongoose
- **Cache:** Redis + In-Memory Cache
- **Email:** Nodemailer
- **Validation:** Joi
- **Security:** bcryptjs, JWT, Helmet
- **Logging:** Winston, Morgan
- **Testing:** Jest

## 🏗️ Project Structure

```
src/
├── config/              # Configuration files
├── controllers/         # Request handlers
├── database/           # Database connections
├── middleware/         # Express middleware
├── models/            # MongoDB schemas
├── routes/            # API routes
├── services/          # Business logic
├── types/             # TypeScript interfaces
├── utils/             # Helper functions
├── validators/        # Request validators
├── __tests__/         # Test files
├── app.ts             # Express app setup
└── index.ts           # Server entry point

docs/                  # Documentation
tests/                 # Integration tests
docker/                # Docker configuration
.github/workflows/     # CI/CD workflows
```

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB (local or cloud)
- Redis (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/maximilianorojas2705-lumi/nexus-backend.git
cd nexus-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
cp .env.example .env
```

4. **Configure `.env` file**
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/nexus
JWT_SECRET=your_secret_key_here
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Lint code
npm run lint

# Format code
npm run format
```

### Production

```bash
# Build project
npm run build

# Start production server
npm start
```

## 🐳 Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/me` - Update profile
- `DELETE /api/auth/me` - Delete account

### Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart/add` - Add to cart
- `DELETE /api/cart/remove/:productId` - Remove from cart
- `PUT /api/cart/update/:productId` - Update quantity
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update status (Admin)
- `PUT /api/orders/:id/cancel` - Cancel order
- `DELETE /api/orders/:id` - Delete order (Admin)

### Reviews
- `POST /api/products/:productId/reviews` - Create review
- `GET /api/products/:productId/reviews` - Get product reviews
- `GET /api/reviews/:id` - Get review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Health
- `GET /api/health` - Server status
- `GET /api/health/ready` - Readiness check

## 📖 Documentation

- [API Documentation](./docs/API.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Changelog](./CHANGELOG.md)

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation and sanitization
- SQL injection protection via Mongoose
- XSS protection

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm test -- --coverage
```

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📝 License

MIT License - see LICENSE file for details

## 📞 Support

- 📧 Email: support@nexus-backend.com
- 🐛 Issues: [GitHub Issues](https://github.com/maximilianorojas2705-lumi/nexus-backend/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/maximilianorojas2705-lumi/nexus-backend/discussions)

## 🎯 Roadmap

- [ ] Payment gateway integration
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Advanced search and filtering
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] GraphQL API
- [ ] WebSocket notifications

## 🙏 Acknowledgments

- Express.js community
- Mongoose documentation
- TypeScript team

---

**Made with ❤️ by Maximilian Rojas**

Last Updated: May 28, 2026
