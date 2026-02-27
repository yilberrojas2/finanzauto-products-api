using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Finanzauto.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Finanzauto.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly FinanzautoDbContext _context;

    public ProductRepository(FinanzautoDbContext context)
    {
        _context = context;
    }

    // ✅ INSERTAR UN PRODUCTO (POST /api/Product)
    public async Task AddAsync(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
    }

    // ✅ INSERT MASIVO (100.000 productos)
    public async Task BulkInsertAsync(IEnumerable<Product> products)
    {
        await _context.Products.AddRangeAsync(products);
        await _context.SaveChangesAsync();
    }

    // ✅ UPDATE
    public async Task UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
    }

    // ✅ PAGINACIÓN + FILTROS
    public async Task<(IEnumerable<Product> Items, int Total)> GetAsync(
        int page,
        int pageSize,
        string? search,
        Guid? categoryId)
    {
        var query = _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.Name.Contains(search));

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId);

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    // ✅ GET BY ID
    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _context.Products
            .AsNoTracking()
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    // ✅ DELETE
    public async Task DeleteAsync(Product product)
    {
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }
}