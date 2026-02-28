using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Finanzauto.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Finanzauto.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly FinanzautoDbContext _context;

    public CategoryRepository(FinanzautoDbContext context)
    {
        _context = context;
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _context.Categories
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}