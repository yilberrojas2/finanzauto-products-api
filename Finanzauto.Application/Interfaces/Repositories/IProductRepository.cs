using Finanzauto.Domain.Entities;

namespace Finanzauto.Application.Interfaces.Repositories;

public interface IProductRepository
{
    Task AddAsync(Product product);
    Task UpdateAsync(Product product);
    Task DeleteAsync(Product product);

    Task<Product?> GetByIdAsync(Guid id);

    Task<(IEnumerable<Product> Items, int Total)> GetAsync(
        int page,
        int pageSize,
        string? search,
        Guid? categoryId
    );

    Task BulkInsertAsync(IEnumerable<Product> products);
}