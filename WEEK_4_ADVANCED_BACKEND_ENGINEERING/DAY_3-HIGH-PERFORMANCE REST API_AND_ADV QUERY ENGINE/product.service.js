import productRepository from '../repositories/product.repository.js';

class ProductService {
  async createProduct(data) {
    return productRepository.create(data);
  }
}

export default new ProductService();

// Product service: business logic layer bridging controller and repository
