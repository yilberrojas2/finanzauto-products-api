namespace Finanzauto.Application.DTOs.Product;

public class CreateProductDto
{
    public int Quantity { get; set; }
    public Guid CategoryId { get; set; }
}