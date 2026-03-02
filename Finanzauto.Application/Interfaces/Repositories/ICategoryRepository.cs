using Finanzauto.Domain.Entities;

namespace Finanzauto.Application.Interfaces.Repositories;

public interface ICategoryRepository
{
    Task AddAsync(Category category);
    Task<Category?> GetByIdAsync(Guid id);
    Task<List<Category>> GetAllAsync();
}