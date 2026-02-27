using Finanzauto.Application.DTOs.Product;
using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Finanzauto.Infrastructure.Persistence;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Finanzauto.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly FinanzautoDbContext _context;

    public ProductController(
        IProductRepository repository,
        FinanzautoDbContext context)
    {
        _repository = repository;
        _context = context;
    }

    // 🔥 CARGA MASIVA
    [HttpPost]
    public async Task<IActionResult> CreateBulk(CreateProductDto dto)
    {
        var category = await _context.Categories.FindAsync(dto.CategoryId);
        if (category == null)
            return BadRequest("Category not found");

        var products = new List<Product>();

        for (int i = 0; i < dto.Quantity; i++)
        {
            products.Add(new Product(
                $"Product-{Guid.NewGuid().ToString()[..8]}",
                Random.Shared.Next(100, 5000),
                category.Id
            ));
        }

        await _repository.BulkInsertAsync(products);

        return Ok(new { Created = products.Count });
    }

    // 📄 LISTADO + PAGINACIÓN + FILTROS
    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] ProductQueryDto query)
    {
        var (items, total) = await _repository.GetAsync(
            query.Page,
            query.PageSize,
            query.Search,
            query.CategoryId
        );

        var result = items.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Price = p.Price,
            CategoryName = p.Category.Name,
            CategoryImageUrl = p.Category.ImageUrl
        });

        return Ok(new
        {
            Total = total,
            Items = result
        });
    }

    // 🔍 DETALLE
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null) return NotFound();

        return Ok(new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            CategoryName = product.Category.Name,
            CategoryImageUrl = product.Category.ImageUrl
        });
    }

    // 🗑️ DELETE
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null) return NotFound();

        await _repository.DeleteAsync(product);
        return NoContent();
    }
}