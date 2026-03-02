using Finanzauto.Application.DTOs.Category;
using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Finanzauto.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly ICategoryRepository _repository;

    public CategoryController(ICategoryRepository repository)
    {
        _repository = repository;
    }

    // POST /api/Category
    [HttpPost]
    public async Task<IActionResult> Create(CreateCategoryDto dto)
    {
        var category = new Category(dto.Name, dto.ImageUrl);
        await _repository.AddAsync(category);

        return Ok(category.Id);
    }

    // GET /api/Category
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var categories = await _repository.GetAllAsync();
        return Ok(categories);
    }
}