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

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDto dto)
    {
        var product = new Product(
            dto.Name,
            dto.Price,
            dto.CategoryId
        );

        await _repository.AddAsync(product);

        return CreatedAtAction(
            nameof(GetById),
            new { id = product.Id },
            product.Id
        );
    }

    // 🔥 CARGA MASIVA
    [HttpPost("bulk")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateBulk(CreateProductBulkDto dto)
    {
        if (dto.Quantity <= 0 || dto.Quantity > 100_000)
            return BadRequest("Quantity must be between 1 and 100000");

        var category = await _context.Categories.FindAsync(dto.CategoryId);
        if (category == null)
            return BadRequest("Category not found");

        var products = new List<Product>(dto.Quantity);

        for (int i = 0; i < dto.Quantity; i++)
        {
            var code = Guid.NewGuid().ToString("N")[..8];

            products.Add(new Product(
                $"Product-{code}",
                Random.Shared.Next(100, 5000),
                category.Id
            ));
        }

        await _repository.BulkInsertAsync(products);

        return Ok(new { created = products.Count });
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