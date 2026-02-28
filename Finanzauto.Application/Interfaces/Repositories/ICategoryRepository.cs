using Finanzauto.Domain.Entities;

namespace Finanzauto.Application.Interfaces.Repositories;

public interface ICategoryRepository
{
    Task<Category?> GetByIdAsync(Guid id);
}