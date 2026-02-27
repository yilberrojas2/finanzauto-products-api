namespace Finanzauto.Application.DTOs.Product;

public class CreateProductBulkDto
{
    public Guid CategoryId { get; set; }
    public int Quantity { get; set; }
}