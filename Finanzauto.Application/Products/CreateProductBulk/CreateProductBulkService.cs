using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;

namespace Finanzauto.Application.Products.CreateProductBulk;

public class CreateProductBulkService
{
    private readonly IProductRepository _productRepository;
    private readonly ICategoryRepository _categoryRepository;

    public CreateProductBulkService(
        IProductRepository productRepository,
        ICategoryRepository categoryRepository)
    {
        _productRepository = productRepository;
        _categoryRepository = categoryRepository;
    }

    public async Task<int> ExecuteAsync(Guid categoryId, int quantity)
    {
        if (quantity <= 0 || quantity > 100_000)
            throw new ArgumentException("Quantity must be between 1 and 100000");

        var category = await _categoryRepository.GetByIdAsync(categoryId);
        if (category == null)
            throw new InvalidOperationException("Category not found");

        var products = new List<Product>(quantity);

        for (int i = 0; i < quantity; i++)
        {
            var code = Guid.NewGuid().ToString("N")[..8];

            products.Add(new Product(
                $"Product-{code}",
                Random.Shared.Next(100, 5000),
                category.Id
            ));
        }

        await _productRepository.BulkInsertAsync(products);

        return products.Count;
    }
}