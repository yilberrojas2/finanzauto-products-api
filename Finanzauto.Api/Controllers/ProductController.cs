using Finanzauto.Application.DTOs.Product;
using Finanzauto.Application.Products.CreateProductBulk;
using Finanzauto.Application.Interfaces.Repositories;
using Finanzauto.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Finanzauto.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ProductController : ControllerBase
{
    private readonly IProductRepository _repository;
    private readonly CreateProductBulkService _bulkService;

    public ProductController(
        IProductRepository repository,
        CreateProductBulkService bulkService)
    {
        _repository = repository;
        _bulkService = bulkService;
    }

    // POST /api/Product
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

    // POST /api/Product/bulk
    [HttpPost("bulk")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateBulk(CreateProductBulkDto dto)
    {
        try
        {
            var created = await _bulkService.ExecuteAsync(
                dto.CategoryId,
                dto.Quantity
            );

            return Ok(new { created });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET /api/Product
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

    // GET /api/Product/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
            return NotFound();

        return Ok(new ProductDto
        {
            Id = product.Id,
            Name = product.Name,
            Price = product.Price,
            CategoryName = product.Category.Name,
            CategoryImageUrl = product.Category.ImageUrl
        });
    }

    // DELETE /api/Product/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var product = await _repository.GetByIdAsync(id);
        if (product == null)
            return NotFound();

        await _repository.DeleteAsync(product);
        return NoContent();
    }
}