using Finanzauto.Application.DTOs.Category;
using Finanzauto.Domain.Entities;
using Finanzauto.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace Finanzauto.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly FinanzautoDbContext _context;

    public CategoryController(FinanzautoDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryDto dto)
    {
        var category = new Category(dto.Name, dto.ImageUrl);

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return Ok(new CategoryDto
        {
            Id = category.Id,
            Name = category.Name,
            ImageUrl = category.ImageUrl
        });
    }
}