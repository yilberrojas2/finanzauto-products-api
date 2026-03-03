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

    // CREATE
    public async Task AddAsync(Product product)
    {
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
    }

    // UPDATE (incluye soft delete)
    public async Task UpdateAsync(Product product)
    {
        _context.Products.Update(product);
        await _context.SaveChangesAsync();
    }

    // DELETE FÍSICO (NO USADO)
    // Se mantiene por contrato, pero NO se usa
    public async Task DeleteAsync(Product product)
    {
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }

    // GET BY ID (solo activos)
    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.Id == id && p.IsActive);
    }

    // LISTADO + PAGINACIÓN
    public async Task<(IEnumerable<Product> Items, int Total)> GetAsync(
        int page,
        int pageSize,
        string? search,
        Guid? categoryId)
    {
        var query = _context.Products
            .Include(p => p.Category)
            .Where(p => p.IsActive) // 🔥 FILTRO CLAVE
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(search))
        {
            query = query.Where(p =>
                p.Name.ToLower().Contains(search.ToLower()));
        }

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var total = await query.CountAsync();

        var items = await query
            .OrderByDescending(p => p.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return (items, total);
    }

    // BULK INSERT
    public async Task BulkInsertAsync(IEnumerable<Product> products)
    {
        _context.Products.AddRange(products);
        await _context.SaveChangesAsync();
    }
}