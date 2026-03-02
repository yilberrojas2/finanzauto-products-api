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
        // ✅ Validación de negocio
        if (quantity <= 0 || quantity > 100_000)
            throw new ArgumentException("La cantidad debe estar entre 1 y 100.000");

        // ✅ Verificar existencia de la categoría
        var category = await _categoryRepository.GetByIdAsync(categoryId);
        if (category == null)
            throw new InvalidOperationException("La categoría no existe");

        // ✅ Preparar lista con capacidad definida (performance)
        var products = new List<Product>(capacity: quantity);

        for (int i = 0; i < quantity; i++)
        {
            var code = Guid.NewGuid().ToString("N")[..8];

            products.Add(new Product(
                name: $"Product-{code}",
                price: Random.Shared.Next(100, 5_000),
                categoryId: category.Id
            ));
        }

        // ✅ Inserción masiva
        await _productRepository.BulkInsertAsync(products);

        return products.Count;
    }
}