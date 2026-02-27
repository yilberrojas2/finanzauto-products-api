using Finanzauto.Domain.Entities;

namespace Finanzauto.Application.Interfaces.Repositories;

public interface IProductRepository
{
    Task BulkInsertAsync(IEnumerable<Product> products);

    Task<(IEnumerable<Product> Items, int Total)> GetAsync(
        int page,
        int pageSize,
        string? search,
        Guid? categoryId);

    Task<Product?> GetByIdAsync(Guid id);

    Task AddAsync(Product product);

    Task DeleteAsync(Product product);
}