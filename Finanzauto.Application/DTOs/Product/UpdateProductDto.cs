namespace Finanzauto.Application.Products.UpdateProduct
{
    public class UpdateProductDto
    {
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public Guid CategoryId { get; set; }
    }
}